import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_WIDGETS_CONFIG = [
  { type: 'Weather', title: 'Weather Forecast', initialData: { city: 'London' }, defaultLayout: { x: 0, y: 0, w: 4, h: 4 } },
  { type: 'Todo', title: 'My To-Do List', initialData: { tasks: [] }, defaultLayout: { x: 4, y: 0, w: 4, h: 6 } },
  { type: 'Notes', title: 'Quick Notes', initialData: { content: '' }, defaultLayout: { x: 8, y: 0, w: 4, h: 5 } }
];

const STORE_VERSION = '1.0.0';

export const useDashboardStore = create(
  persist(
    (set, get) => ({
      version: STORE_VERSION,
      widgets: [],
      layouts: { lg: [], md: [], sm: [], xs: [], xxs: [] },
      availableWidgetTypes: DEFAULT_WIDGETS_CONFIG.map(config => config.type),

      initializeDashboard: () => {
        const state = get();
        
        // Check version and reset if outdated
        if (state.version !== STORE_VERSION) {
          console.log('Store version mismatch, resetting...');
          set({ 
            version: STORE_VERSION,
            widgets: [],
            layouts: { lg: [], md: [], sm: [], xs: [], xxs: [] }
          });
        }
        
        if (state.widgets.length === 0) {
          console.log('Initializing dashboard with default widgets...');
          const initialWidgets = DEFAULT_WIDGETS_CONFIG.map(widgetConfig => ({
            id: uuidv4(),
            type: widgetConfig.type,
            title: widgetConfig.title,
            data: widgetConfig.initialData || {},
          }));

          const initialLayouts = {
            lg: initialWidgets.map((w, i) => ({ ...DEFAULT_WIDGETS_CONFIG[i].defaultLayout, i: w.id })),
            md: initialWidgets.map((w, i) => ({ ...DEFAULT_WIDGETS_CONFIG[i].defaultLayout, i: w.id, x: (i % 2) * 5, w: 5 })),
            sm: initialWidgets.map((w, i) => ({ i: w.id, x: 0, y: i * 4, w: 6, h: DEFAULT_WIDGETS_CONFIG[i].defaultLayout.h })),
            xs: initialWidgets.map((w, i) => ({ i: w.id, x: 0, y: i * 4, w: 4, h: DEFAULT_WIDGETS_CONFIG[i].defaultLayout.h })),
            xxs: initialWidgets.map((w, i) => ({ i: w.id, x: 0, y: i * 4, w: 2, h: DEFAULT_WIDGETS_CONFIG[i].defaultLayout.h }))
          };

          set({ widgets: initialWidgets, layouts: initialLayouts });
        }
      },
      addWidget: (type) => {
        const config = DEFAULT_WIDGETS_CONFIG.find(c => c.type === type);
        if (!config) return;
        const id = uuidv4();
        const newWidget = { id, type, title: config.title, data: config.initialData || {} };

        set((state) => ({
          widgets: [...state.widgets, newWidget],
          layouts: Object.fromEntries(
            Object.entries(state.layouts).map(([breakpoint, layout]) => {
              const existingMaxY = layout.reduce((maxY, item) => Math.max(maxY, item.y + item.h), 0);
              const newLayout = [...layout, { i: id, x: 0, y: existingMaxY, w: config.defaultLayout.w, h: config.defaultLayout.h }];
              return [breakpoint, newLayout];
            })
          ),
        }));
      },
      removeWidget: (id) => {
        set((state) => ({
          widgets: state.widgets.filter((w) => w.id !== id),
          layouts: Object.fromEntries(
            Object.entries(state.layouts).map(([breakpoint, layout]) => [
              breakpoint,
              layout.filter((item) => item.i !== id),
            ])
          ),
        }));
      },
      updateWidgetLayout: (allLayouts) => {
        set({ layouts: allLayouts });
      },
      updateWidgetData: (widgetId, newData) => {
        set((state) => ({
          widgets: state.widgets.map((widget) =>
            widget.id === widgetId ? { ...widget, data: { ...widget.data, ...newData } } : widget
          ),
        }));
      },
    }),
    {
      name: 'dashboard-storage',
    }
  )
);

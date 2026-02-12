import { useDashboardStore } from '../store/dashboardStore';
import { useThemeStore } from '../store/themeStore';
import { act } from 'react';

describe('dashboardStore', () => {
  beforeEach(() => {
    localStorage.clear();
    useDashboardStore.setState({ widgets: [], layouts: { lg: [], md: [], sm: [], xs: [], xxs: [] } });
  });

  it('initializes dashboard with default widgets', () => {
    act(() => {
      useDashboardStore.getState().initializeDashboard();
    });
    const state = useDashboardStore.getState();
    expect(state.widgets.length).toBe(3);
    expect(state.widgets[0].type).toBe('Weather');
  });

  it('adds a new widget', () => {
    act(() => {
      useDashboardStore.getState().initializeDashboard();
      useDashboardStore.getState().addWidget('Notes');
    });
    const state = useDashboardStore.getState();
    expect(state.widgets.length).toBe(4);
  });

  it('removes a widget', () => {
    act(() => {
      useDashboardStore.getState().initializeDashboard();
    });
    const widgetId = useDashboardStore.getState().widgets[0].id;
    act(() => {
      useDashboardStore.getState().removeWidget(widgetId);
    });
    const state = useDashboardStore.getState();
    expect(state.widgets.length).toBe(2);
    expect(state.widgets.find(w => w.id === widgetId)).toBeUndefined();
  });

  it('updates widget data', () => {
    act(() => {
      useDashboardStore.getState().initializeDashboard();
    });
    const widgetId = useDashboardStore.getState().widgets[0].id;
    act(() => {
      useDashboardStore.getState().updateWidgetData(widgetId, { city: 'Paris' });
    });
    const state = useDashboardStore.getState();
    const widget = state.widgets.find(w => w.id === widgetId);
    expect(widget.data.city).toBe('Paris');
  });

  it('updates widget layout', () => {
    const newLayouts = { lg: [{ i: 'test', x: 0, y: 0, w: 4, h: 4 }] };
    act(() => {
      useDashboardStore.getState().updateWidgetLayout(newLayouts);
    });
    const state = useDashboardStore.getState();
    expect(state.layouts.lg).toEqual(newLayouts.lg);
  });
});

describe('themeStore', () => {
  beforeEach(() => {
    localStorage.clear();
    useThemeStore.setState({ theme: 'light' });
  });

  it('initializes with light theme', () => {
    const state = useThemeStore.getState();
    expect(state.theme).toBe('light');
  });

  it('toggles theme from light to dark', () => {
    act(() => {
      useThemeStore.getState().toggleTheme();
    });
    const state = useThemeStore.getState();
    expect(state.theme).toBe('dark');
  });

  it('toggles theme from dark to light', () => {
    act(() => {
      useThemeStore.setState({ theme: 'dark' });
      useThemeStore.getState().toggleTheme();
    });
    const state = useThemeStore.getState();
    expect(state.theme).toBe('light');
  });
});

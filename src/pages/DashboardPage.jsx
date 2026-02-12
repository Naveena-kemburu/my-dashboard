import React, { useEffect } from 'react';
import DashboardGrid from '../components/DashboardGrid';
import WidgetWrapper from '../components/WidgetWrapper';
import ThemeSwitcher from '../components/ThemeSwitcher';
import ErrorBoundary from '../components/ErrorBoundary';
import { useDashboardStore } from '../store/dashboardStore';
import WeatherWidget from '../widgets/WeatherWidget';
import TodoWidget from '../widgets/TodoWidget';
import NotesWidget from '../widgets/NotesWidget';

const widgetComponents = {
  Weather: WeatherWidget,
  Todo: TodoWidget,
  Notes: NotesWidget,
};

function DashboardPage() {
  const widgets = useDashboardStore((state) => state.widgets);
  const layouts = useDashboardStore((state) => state.layouts);
  const availableWidgetTypes = useDashboardStore((state) => state.availableWidgetTypes);
  const initializeDashboard = useDashboardStore((state) => state.initializeDashboard);
  const removeWidget = useDashboardStore((state) => state.removeWidget);
  const updateWidgetLayout = useDashboardStore((state) => state.updateWidgetLayout);
  const addWidget = useDashboardStore((state) => state.addWidget);

  useEffect(() => {
    initializeDashboard();
  }, [initializeDashboard]);

  const onLayoutChange = (currentLayout, allLayouts) => {
    updateWidgetLayout(allLayouts);
  };

  const handleAddWidget = (type) => {
    addWidget(type);
  };

  const availableToAdd = availableWidgetTypes.filter(
    type => !widgets.some(w => w.type === type) || type === 'Notes' || type === 'Todo'
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      <header className="p-4 flex justify-between items-center bg-white dark:bg-gray-800 shadow-sm">
        <h1 className="text-2xl font-bold">My Personal Dashboard</h1>
        <div className="flex gap-4 items-center">
          {availableToAdd.length > 0 && (
            <select
              onChange={(e) => {
                if (e.target.value) {
                  handleAddWidget(e.target.value);
                  e.target.value = '';
                }
              }}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
              aria-label="Add widget"
            >
              <option value="">+ Add Widget</option>
              {availableToAdd.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          )}
          <ThemeSwitcher />
        </div>
      </header>
      <main className="p-4">
        {widgets.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold mb-4">Welcome to Your Dashboard!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Get started by adding your first widget using the dropdown above.
            </p>
          </div>
        ) : (
          <DashboardGrid layouts={layouts} onLayoutChange={onLayoutChange}>
            {widgets.map(widget => {
              const WidgetComponent = widgetComponents[widget.type];
              return (
                <div key={widget.id}>
                  <ErrorBoundary>
                    <WidgetWrapper id={widget.id} title={widget.title} onClose={removeWidget}>
                      {WidgetComponent ? (
                        <WidgetComponent widgetId={widget.id} data={widget.data} />
                      ) : (
                        <p>Unknown widget type: {widget.type}</p>
                      )}
                    </WidgetWrapper>
                  </ErrorBoundary>
                </div>
              );
            })}
          </DashboardGrid>
        )}
      </main>
    </div>
  );
}

export default DashboardPage;

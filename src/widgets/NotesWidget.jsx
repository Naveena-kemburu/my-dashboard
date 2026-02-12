import React, { useState, useEffect, useCallback } from 'react';
import { useDashboardStore } from '../store/dashboardStore';

function NotesWidget({ widgetId, data }) {
  const [content, setContent] = useState(data.content || '');
  const updateWidgetData = useDashboardStore((state) => state.updateWidgetData);

  const debouncedUpdate = useCallback(
    (() => {
      let timeoutId;
      return (value) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          updateWidgetData(widgetId, { content: value });
        }, 500);
      };
    })(),
    [widgetId, updateWidgetData]
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setContent(value);
    debouncedUpdate(value);
  };

  return (
    <div className="flex flex-col h-full">
      <textarea
        value={content}
        onChange={handleChange}
        placeholder="Start typing your notes here..."
        className="flex-1 p-3 border rounded-lg resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        aria-label="Notes content"
      />
      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        {content.length} characters
      </div>
    </div>
  );
}

export default NotesWidget;

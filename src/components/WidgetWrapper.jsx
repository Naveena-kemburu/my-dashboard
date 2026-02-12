import React from 'react';

function WidgetWrapper({ id, title, children, onClose }) {
  const handleClose = (e) => {
    e.stopPropagation(); // Prevent drag from triggering
    onClose(id);
  };

  return (
    <div className="widget-wrapper bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex flex-col h-full">
      <div className="widget-drag-handle flex justify-between items-center mb-2 cursor-move">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        {onClose && (
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 text-2xl leading-none cursor-pointer z-10"
            aria-label={`Close ${title} widget`}
          >
            &times;
          </button>
        )}
      </div>
      <div className="widget-content flex-grow overflow-auto">
        {children}
      </div>
    </div>
  );
}

export default WidgetWrapper;

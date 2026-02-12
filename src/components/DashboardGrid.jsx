import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

function DashboardGrid({ children, layouts, onLayoutChange }) {
  const defaultProps = {
    className: "layout",
    rowHeight: 60,
    compactType: "vertical",
    preventCollision: false,
    isDraggable: true,
    isResizable: true,
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    draggableHandle: ".widget-drag-handle",
  };

  return (
    <ResponsiveGridLayout
      {...defaultProps}
      layouts={layouts}
      onLayoutChange={onLayoutChange}
    >
      {children}
    </ResponsiveGridLayout>
  );
}

export default DashboardGrid;

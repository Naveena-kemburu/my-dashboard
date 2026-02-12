import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WidgetWrapper from '../WidgetWrapper';

describe('WidgetWrapper', () => {
  it('renders with title and children', () => {
    render(
      <WidgetWrapper id="test-1" title="Test Widget">
        <div>Test Content</div>
      </WidgetWrapper>
    );
    expect(screen.getByText('Test Widget')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(
      <WidgetWrapper id="test-1" title="Test Widget" onClose={onClose}>
        <div>Test Content</div>
      </WidgetWrapper>
    );
    const closeButton = screen.getByLabelText('Close Test Widget widget');
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledWith('test-1');
  });

  it('does not render close button when onClose is not provided', () => {
    render(
      <WidgetWrapper id="test-1" title="Test Widget">
        <div>Test Content</div>
      </WidgetWrapper>
    );
    expect(screen.queryByLabelText('Close Test Widget widget')).not.toBeInTheDocument();
  });
});

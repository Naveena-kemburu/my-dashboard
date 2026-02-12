import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoWidget from '../widgets/TodoWidget';
import NotesWidget from '../widgets/NotesWidget';
import WeatherWidget from '../widgets/WeatherWidget';
import { useDashboardStore } from '../store/dashboardStore';
import { fetchWeatherData } from '../lib/api';

describe('TodoWidget', () => {
  const mockUpdateWidgetData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useDashboardStore.setState({
      updateWidgetData: mockUpdateWidgetData
    });
  });

  it('renders empty state', () => {
    render(<TodoWidget widgetId="test-1" data={{ tasks: [] }} />);
    expect(screen.getByText(/No tasks yet/i)).toBeInTheDocument();
  });

  it('adds a new task', () => {
    render(<TodoWidget widgetId="test-1" data={{ tasks: [] }} />);
    const input = screen.getByLabelText('New task');
    const button = screen.getByLabelText('Add task');
    
    fireEvent.change(input, { target: { value: 'Test task' } });
    fireEvent.click(button);
    
    expect(mockUpdateWidgetData).toHaveBeenCalled();
  });

  it('shows error for empty task', () => {
    render(<TodoWidget widgetId="test-1" data={{ tasks: [] }} />);
    const button = screen.getByLabelText('Add task');
    
    fireEvent.click(button);
    
    expect(screen.getByText('Task cannot be empty')).toBeInTheDocument();
  });

  it('toggles task completion', () => {
    const tasks = [{ id: '1', text: 'Test task', completed: false }];
    render(<TodoWidget widgetId="test-1" data={{ tasks }} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(mockUpdateWidgetData).toHaveBeenCalled();
  });

  it('filters tasks', () => {
    const tasks = [
      { id: '1', text: 'Buy milk', completed: false },
      { id: '2', text: 'Buy bread', completed: false }
    ];
    render(<TodoWidget widgetId="test-1" data={{ tasks }} />);
    
    const filterInput = screen.getByLabelText('Filter tasks');
    fireEvent.change(filterInput, { target: { value: 'milk' } });
    
    expect(screen.getByText('Buy milk')).toBeInTheDocument();
    expect(screen.queryByText('Buy bread')).not.toBeInTheDocument();
  });
});

describe('NotesWidget', () => {
  const mockUpdateWidgetData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    useDashboardStore.setState({
      updateWidgetData: mockUpdateWidgetData
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders with initial content', () => {
    render(<NotesWidget widgetId="test-1" data={{ content: 'Test note' }} />);
    expect(screen.getByDisplayValue('Test note')).toBeInTheDocument();
  });

  it('updates content with debounce', () => {
    render(<NotesWidget widgetId="test-1" data={{ content: '' }} />);
    const textarea = screen.getByLabelText('Notes content');
    
    fireEvent.change(textarea, { target: { value: 'New note' } });
    
    expect(mockUpdateWidgetData).not.toHaveBeenCalled();
    
    jest.advanceTimersByTime(500);
    
    expect(mockUpdateWidgetData).toHaveBeenCalledWith('test-1', { content: 'New note' });
  });

  it('displays character count', () => {
    render(<NotesWidget widgetId="test-1" data={{ content: 'Hello' }} />);
    expect(screen.getByText('5 characters')).toBeInTheDocument();
  });
});

describe('WeatherWidget', () => {
  const mockUpdateWidgetData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useDashboardStore.setState({
      updateWidgetData: mockUpdateWidgetData
    });
  });

  it('displays loading state', () => {
    fetchWeatherData.mockImplementation(() => new Promise(() => {}));
    render(<WeatherWidget widgetId="test-1" data={{ city: 'London' }} />);
    expect(screen.getByText(/Loading weather data/i)).toBeInTheDocument();
  });

  it('displays weather data', async () => {
    fetchWeatherData.mockResolvedValue({
      city: 'London',
      temperature: 20,
      condition: 'Sunny',
      humidity: 70,
      windSpeed: 10
    });
    
    render(<WeatherWidget widgetId="test-1" data={{ city: 'London' }} />);
    
    await waitFor(() => {
      expect(screen.getByText('London')).toBeInTheDocument();
      expect(screen.getByText('20°C')).toBeInTheDocument();
      expect(screen.getByText('Sunny')).toBeInTheDocument();
    });
  });

  it('displays error state', async () => {
    fetchWeatherData.mockRejectedValue(new Error('API Error'));
    
    render(<WeatherWidget widgetId="test-1" data={{ city: 'London' }} />);
    
    await waitFor(() => {
      expect(screen.getByText('API Error')).toBeInTheDocument();
    });
  });

  it('updates city on form submit', async () => {
    fetchWeatherData.mockResolvedValue({
      city: 'Paris',
      temperature: 22,
      condition: 'Cloudy',
      humidity: 65,
      windSpeed: 8
    });
    
    render(<WeatherWidget widgetId="test-1" data={{ city: 'London' }} />);
    
    const input = screen.getByLabelText('City name');
    const button = screen.getByLabelText('Update weather');
    
    fireEvent.change(input, { target: { value: 'Paris' } });
    fireEvent.click(button);
    
    expect(mockUpdateWidgetData).toHaveBeenCalledWith('test-1', { city: 'Paris' });
  });
});


describe('WeatherWidget', () => {
  const mockUpdateWidgetData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useDashboardStore.setState({
      updateWidgetData: mockUpdateWidgetData
    });
  });

  it('displays loading state', () => {
    fetchWeatherData.mockImplementation(() => new Promise(() => {}));
    render(<WeatherWidget widgetId="test-1" data={{ city: 'London' }} />);
    expect(screen.getByText(/Loading weather data/i)).toBeInTheDocument();
  });

  it('displays weather data', async () => {
    fetchWeatherData.mockResolvedValue({
      city: 'London',
      temperature: 20,
      condition: 'Sunny',
      humidity: 70,
      windSpeed: 10
    });
    
    render(<WeatherWidget widgetId="test-1" data={{ city: 'London' }} />);
    
    await waitFor(() => {
      expect(screen.getByText('London')).toBeInTheDocument();
      expect(screen.getByText('20°C')).toBeInTheDocument();
      expect(screen.getByText('Sunny')).toBeInTheDocument();
    });
  });

  it('displays error state', async () => {
    fetchWeatherData.mockRejectedValue(new Error('API Error'));
    
    render(<WeatherWidget widgetId="test-1" data={{ city: 'London' }} />);
    
    await waitFor(() => {
      expect(screen.getByText('API Error')).toBeInTheDocument();
    });
  });

  it('updates city on form submit', async () => {
    fetchWeatherData.mockResolvedValue({
      city: 'Paris',
      temperature: 22,
      condition: 'Cloudy',
      humidity: 65,
      windSpeed: 8
    });
    
    render(<WeatherWidget widgetId="test-1" data={{ city: 'London' }} />);
    
    const input = screen.getByLabelText('City name');
    const button = screen.getByLabelText('Update weather');
    
    fireEvent.change(input, { target: { value: 'Paris' } });
    fireEvent.click(button);
    
    expect(mockUpdateWidgetData).toHaveBeenCalledWith('test-1', { city: 'Paris' });
  });
});

describe('NotesWidget', () => {
  const mockUpdateWidgetData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    useDashboardStore.setState({
      updateWidgetData: mockUpdateWidgetData
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders with initial content', () => {
    render(<NotesWidget widgetId="test-1" data={{ content: 'Test note' }} />);
    expect(screen.getByDisplayValue('Test note')).toBeInTheDocument();
  });

  it('updates content with debounce', () => {
    render(<NotesWidget widgetId="test-1" data={{ content: '' }} />);
    const textarea = screen.getByLabelText('Notes content');
    
    fireEvent.change(textarea, { target: { value: 'New note' } });
    
    expect(mockUpdateWidgetData).not.toHaveBeenCalled();
    
    jest.advanceTimersByTime(500);
    
    expect(mockUpdateWidgetData).toHaveBeenCalledWith('test-1', { content: 'New note' });
  });

  it('displays character count', () => {
    render(<NotesWidget widgetId="test-1" data={{ content: 'Hello' }} />);
    expect(screen.getByText('5 characters')).toBeInTheDocument();
  });
});

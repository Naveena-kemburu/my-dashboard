import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ThemeSwitcher from '../ThemeSwitcher';
import { useThemeStore } from '../../store/themeStore';

describe('ThemeSwitcher', () => {
  beforeEach(() => {
    useThemeStore.setState({ theme: 'light' });
  });

  it('renders with light theme initially', () => {
    render(<ThemeSwitcher />);
    expect(screen.getByText(/Dark/i)).toBeInTheDocument();
  });

  it('toggles theme when clicked', () => {
    render(<ThemeSwitcher />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(useThemeStore.getState().theme).toBe('dark');
  });

  it('displays correct icon for current theme', () => {
    const { rerender } = render(<ThemeSwitcher />);
    expect(screen.getByText(/Dark/i)).toBeInTheDocument();
    
    act(() => {
      useThemeStore.setState({ theme: 'dark' });
    });
    rerender(<ThemeSwitcher />);
    expect(screen.getByText(/Light/i)).toBeInTheDocument();
  });
});

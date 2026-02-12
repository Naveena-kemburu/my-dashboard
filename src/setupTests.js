import '@testing-library/jest-dom';

// Mock matchMedia for responsive tests in JSDOM
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock import.meta for Vite
global.import = global.import || {};
global.import.meta = global.import.meta || {};
global.import.meta.env = global.import.meta.env || {};
global.import.meta.env.VITE_WEATHER_API_KEY = 'test_key';
global.import.meta.env.VITE_MOCK_API_URL = 'http://localhost:3000';

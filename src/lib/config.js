export const getEnvVar = (key, defaultValue = '') => {
  // In test environment, use process.env
  if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test') {
    return process.env[key] || defaultValue;
  }
  // In Vite environment, use import.meta.env
  // This will be handled by Vite's build process
  return defaultValue;
};

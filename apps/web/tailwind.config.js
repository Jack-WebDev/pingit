// apps/web/tailwind.config.js or tailwind.config.ts
import sharedConfig from '../../packages/ui/tailwind.config.js';

const config = {
  presets: [sharedConfig],
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Adjust these paths to match your web app's files
    '../../packages/ui/components/**/*.{js,ts,jsx,tsx}', // Include UI components
  ],
  // ... any web-specific customizations
};

export default config;

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import path from 'path-browserify';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      path: 'path-browserify',
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
  },

  esbuild: {
    // jsxInject: `import React from 'react'`,
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',

    // Add the following option:
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.REACT_REFRESH': 'true',
    },
  },
});

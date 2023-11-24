import react from '@vitejs/plugin-react';

export default {
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setupTests.ts',
    css: true,
    coverage: {
      enabled: true,
      all: true,
      include: ['src/components/**/*'],
      exclude: ['**/*.d.ts'],
      provider: 'v8',
      reporter: ['text'],
      statements: 80,
    },
  },
};

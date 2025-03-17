export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
      '^(\\.{1,2}/.*)\\.js$': '$1', // Para resolver imports de ESM en TypeScript
  },
};

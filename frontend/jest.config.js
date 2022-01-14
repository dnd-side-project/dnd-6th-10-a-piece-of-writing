module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testMatch: ['**/*.(test|spec).(ts|tsx)'],
  transformIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.[t|j]sx?$': '@swc-node/jest',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
}

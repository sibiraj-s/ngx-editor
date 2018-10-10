module.exports = {
  extends: 'airbnb-base',
  parserOptions: {
    sourceType: 'script'
  },
  rules: {
    'no-console': 'off',
    'import/no-extraneous-dependencies': ['error', {devDependencies: true}],
    'comma-dangle': ['error', 'never']
  }
};

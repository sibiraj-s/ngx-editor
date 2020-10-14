module.exports = {
  extends: [
    'pegasus',
    'pegasus/node'
  ],
  overrides: [{
    files: 'scripts/**/*.js',
    rules: {
      'no-console': 'off'
    }
  }]
};

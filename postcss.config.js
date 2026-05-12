module.exports = {
  plugins: {
    "postcss-flexbugs-fixes": {},
    "postcss-import": {},
    "postcss-extend": {},
    "postcss-mixins": {},
    "postcss-preset-env": {
      stage: 3,
      features: {
        "custom-properties": false,
        "nesting-rules": false,
      },
    },
    "postcss-reporter": {},
  },
};

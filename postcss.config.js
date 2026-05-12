module.exports = {
  plugins: {
    "postcss-flexbugs-fixes": {},
    stylelint: {
      configFile: "stylelint.config.js",
    },
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

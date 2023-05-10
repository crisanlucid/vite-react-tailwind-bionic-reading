module.exports = {
  plugins: {
    tailwindcss: {},
    "postcss-flexbugs-fixes": {},
    stylelint: {
      configFile: "stylelint.config.js",
    },
    "postcss-import": {},
    "postcss-extend": {},
    "postcss-mixins": {},
    "postcss-nested": {},
    "postcss-preset-env": {
      autoprefixer: { flexbox: "no-2009" },
      stage: 3,
      features: {
        "custom-properties": false,
        "nesting-rules": false,
      },
    },
    autoprefixer: {},
    "postcss-reporter": {},
  },
};

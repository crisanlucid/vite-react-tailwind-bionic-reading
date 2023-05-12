/* eslint-env node */
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-config-css-modules',
    'stylelint-config-prettier',
  ],
  plugins: ['stylelint-scss'],
  ignoreFiles: ['./node_modules/**/*.css', './dist/**/*.css', './coverage/**/*.css'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'screen', 'variants', 'responsive'],
      },
    ],
    'no-duplicate-selectors': null,
    'no-empty-source': null,
    'rule-empty-line-before': null,
    'comment-empty-line-before': null,
    'selector-pseudo-element-no-unknown': null,
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null,
    'string-no-newline': null,
    // Limit the number of universal selectors in a selector,
    // to avoid very slow selectors
    'selector-max-universal': 1,
    'selector-class-pattern': '^[a-z][a-zA-Z0-9]+$',
  },
};

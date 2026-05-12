/* eslint-env node */
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-config-css-modules',
  ],
  ignoreFiles: ['./node_modules/**/*.css', './dist/**/*.css', './coverage/**/*.css'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['plugin', 'theme', 'source', 'utility', 'apply'],
      },
    ],
    'import-notation': 'string',
    'no-duplicate-selectors': null,
    'no-empty-source': null,
    'rule-empty-line-before': null,
    'comment-empty-line-before': null,
    'selector-pseudo-element-no-unknown': null,
    'no-descending-specificity': null,
    'font-family-name-quotes': null,
    // Limit the number of universal selectors in a selector,
    // to avoid very slow selectors
    'selector-max-universal': 1,
    'selector-class-pattern': '^[a-z][a-z0-9-]*$',
  },
};

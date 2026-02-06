/* eslint-disable @typescript-eslint/no-require-imports */
// eslint.config.js (CommonJS version)
const tseslint = require('typescript-eslint');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    rules: {
      // 在此處自訂規則
    },
  },
];

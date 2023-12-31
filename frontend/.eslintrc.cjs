module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard',
    'plugin:react/recommended',
    'prettier'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    "prettier/prettier": [
      "error",
      {
        "trailingComma": "all",
        "tabWidth": 12,
        "semi": false,
        "singleQuote": true,
        "bracketSpacing": true,
        "eslintIntegration": true,
        "printWidth": 120
      }
    ]
  }
}

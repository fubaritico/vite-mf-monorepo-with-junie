import eslint from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import importPlugin from 'eslint-plugin-import'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default tseslint.config(
  // Plugins first
  {
    plugins: {
      ['@typescript-eslint']: tseslint.plugin,
      ['react']: react,
      ['react-hooks']: reactHooks,
      ['react-refresh']: reactRefresh,
      ['jsxA11y']: jsxA11y,
      ['import']: importPlugin,
    },
  },

  // Files to be ignored
  {
    ignores: [
      './packages/*/eslint.config.js',
      './packages/*/server.js',
      './packages/*/vite.config.ts',
      './packages/*/dist',
      './packages/*/.__mf__temp',
      './apps/*/eslint.config.js',
      './apps/*/server.js',
      './apps/*/vite.config.ts',
      './apps/*/dist',
      './apps/*/@mf-types',
      './apps/*/.__mf__temp',
      'eslint.config.js',
      'pnpm-lock.yaml',
      'pnpm-workspace.yaml',
      'commitlint.config.js',
    ],
  },

  // extends
  // eslintCommentsPlugin.recommended,
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  eslintPluginPrettierRecommended,
  //jsdocPlugin.configs['flat/recommended-typescript-error'],

  // base/common config
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./packages/*/tsconfig.json', './apps/*/tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      'no-console': [
        'error',
        {
          allow: ['error', 'warn'],
        },
      ],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/require-default-props': 'off',
      'react/function-component-definition': [
        0,
        {
          namedComponents: 'arrow-function',
        },
      ],
      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-no-useless-fragment': [
        0,
        {
          allowExpressions: true,
        },
      ],
      'react/jsx-filename-extension': ['off'],
      'import/prefer-default-export': ['off'],
      'import/no-extraneous-dependencies': ['off'],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          pathGroups: [
            {
              pattern: 'list/**',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'detail/**',
              group: 'external',
              position: 'before',
            },
          ],
          alphabetize: {
            order: 'asc',
            orderImportKind: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'sort-imports': [
        'error',
        {
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        },
      ],
    },
  }
)

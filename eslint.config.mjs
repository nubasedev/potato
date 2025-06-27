import eslint from '@eslint/js'
import tsEslintParser from '@typescript-eslint/parser'
// import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tsEslint from 'typescript-eslint'
const globalConfig = [
  {
    name: 'global',
    files: ['src/**/*.ts', 'src/**/*.tsx', '**/*.mjs'],
    ignores: ['**/node_modules/', 'dist', '.git/', 'build'],
    ...eslintPluginReact.configs.flat.recommended,
    languageOptions: {
      ...eslintPluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.browser,
      },
      parser: tsEslintParser,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
      // '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
    },
  },
]
export default tsEslint.config(
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  // ...eslintPluginReact.configs.flat.recommended,
  // ...eslintPluginReactHooks.configs.recommended,
  // ...tsEslint.configs.strictTypeChecked,
  // ...tsEslint.configs.stylisticTypeChecked,
  // eslintConfigPrettier,
  // eslintPluginPrettierRecommended,
  ...globalConfig,
  {
    files: ['**/*.mjs', '**/*.js'],
    ...tsEslint.configs.disableTypeChecked,
  },
  // tsConfig,
)

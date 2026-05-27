import globals from 'globals'
import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // Evita que dejes más de una línea en blanco seguida
      "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],

      // Agrupa tus imports y elimina los espacios vacíos, pero SIN obligarte a orden alfabético estricto
      "sort-imports": ["error", {
        "ignoreCase": true,
        "ignoreDeclarationSort": true, // <--- Esto evita el error alfabético de las líneas
        "ignoreMemberSort": false,
        "memberSyntaxSortOrder": ["none", "all", "multiple", "single"],
        "allowSeparatedGroups": false
      }]
    },
  },
])
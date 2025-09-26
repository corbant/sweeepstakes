import js from '@eslint/js'
import globals from 'globals'
import reactHooks, { rules } from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

const reactHooksConfig = reactHooks.configs['recommended-latest']
reactHooksConfig.rules['react-hooks/exhaustive-deps'] = [
  'warn',
  {
    additionalHooks: '(useRecoilCallback|useRecoilTransaction_UNSTABLE)'
  }
]

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooksConfig,
      reactRefresh.configs.vite
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    }
  }
])

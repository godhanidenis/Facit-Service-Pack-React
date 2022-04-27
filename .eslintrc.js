module.exports = {
	env: {
		browser: true,
		es2021: true,
		jest: true,
	},
	extends: [
		'plugin:react/recommended',
		'airbnb',
		'plugin:eslint-comments/recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:prettier/recommended',
		'prettier',
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
		allowImportExportEverywhere: true,
	},
	plugins: ['import', 'prettier', 'eslint-comments', 'react', 'jsx-a11y', 'react-hooks'],
	rules: {
		'jsx-a11y/anchor-is-valid': 'off',
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto',
			},
		],
		'no-unused-vars': 0,
		'no-use-before-define': 'off',
		'no-case-declarations': 'off',
		'no-underscore-dangle': 'off',
		'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
		'no-param-reassign': 'off',
		'no-empty': 'warn',
		'import/no-extraneous-dependencies': 'warn',
		'react/jsx-props-no-spreading': 'off',
		'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],
		'jsx-a11y/label-has-associated-control': [
			'warn',
			{
				depth: 3,
			},
		],
		'react-hooks/exhaustive-deps': 'error',
		'react-hooks/rules-of-hooks': 'error',
		'react/function-component-definition': [
			2,
			{
				namedComponents: 'arrow-function',
				unnamedComponents: 'arrow-function',
			},
		],
		'react/no-arrow-function-lifecycle': 'off',
		'react/no-invalid-html-attribute': 'off',
		'react/no-unused-class-component-methods': 'off',
		'no-shadow': 'off',
	},
};

module.exports = {
	env: {
		browser: true,
		node: true,
		commonjs: true,
		es2021: true
	},
	extends: "eslint:recommended",
	parserOptions: {
		ecmaVersion: 12
	},
	rules: {
		indent: [2, 'tab'],
		"no-unused-vars": ["error", { varsIgnorePattern: "^_$" }],
		"no-trailing-spaces": "error",
		"max-len": ["error", { code: 80, ignoreComments: true }]
	}
}

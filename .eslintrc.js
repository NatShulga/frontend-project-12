module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    plugins: ['react'],
    settings: {
        react: {
            version: 'detect'
        },
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        // Базовые правила
        'no-console': 'warn',
        'no-unused-vars': 'warn',
        'no-undef': 'error'
    },
    ignorePatterns: [
        'node_modules/',
        'dist/',
        'build/'
    ]
}
};
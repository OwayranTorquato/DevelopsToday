module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended', // Para integrar o Prettier com ESLint
    ],
    parser: '@babel/eslint-parser', // Para lidar com JSX e ES6+
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    rules: {
        'prettier/prettier': 'error', // Faz com que os erros de formatação apareçam como erros
        'react/react-in-jsx-scope': 'off', // Não é mais necessário no Next.js
    },
};

module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    globals: {
        React: true,
        JSX: true,
        jsdom: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 13,
        sourceType: 'module',
    },
    plugins: [
        'react',
        'react-hooks',
        '@typescript-eslint',
    ],
    rules: {
        'react/react-in-jsx-scope': 'off',
        'react/jsx-filename-extension': [
            1,
            {
                extensions: [
                    '.js',
                    '.jsx',
                    '.tsx',
                    '.ts',
                ],
            },
        ],
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        semi: [
            'error',
            'never',
        ],
        'no-unreachable': [
            'error',
        ],
        'no-unexpected-multiline': [
            'error',
        ],
        'lines-between-class-members': [
            'error',
            'always',
            {
                exceptAfterSingleLine: true,
            },
        ],
        'no-param-reassign': [
            'error',
            {
                props: false,
            },
        ],
        indent: 'off',
        '@typescript-eslint/indent': [
            'error',
            4,
        ],
        'react/jsx-indent': [
            2,
            4,
        ],
        'react/jsx-indent-props': [
            2,
            4,
        ],
        'import/no-extraneous-dependencies': 'off',
        'max-len': [
            'error',
            {
                code: 140,
            },
        ],
        'no-plusplus': [
            'off',
        ],
        'react/jsx-one-expression-per-line': [
            'off',
        ],
        'object-curly-spacing': [
            'error',
            'always',
        ],
        'react/jsx-props-no-spreading': 'off',
        'react/require-default-props': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',
        'no-unused-vars': 'off',
        'react/no-unused-prop-types': [
            'error',
        ],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'key-spacing': [
            2,
            {
                singleLine: {
                    beforeColon: false,
                    afterColon: true,
                },
                multiLine: {
                    beforeColon: false,
                    afterColon: true,
                },
            },
        ],
        '@typescript-eslint/space-before-blocks': 'error',
        'space-infix-ops': 'error',
        'no-restricted-syntax': 'off',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': 'error',
        'react/jsx-sort-props': [
            1,
            {
                callbacksLast: true,
                shorthandFirst: true,
                noSortAlphabetically: true,
                multiline: 'last',
            },
        ],
        'react/destructuring-assignment': [
            0,
        ],
        'react/jsx-no-constructed-context-values': [
            0,
        ],
        'consistent-return': [
            0,
        ],
        'no-await-in-loop': [
            0,
        ],
        'no-continue': [
            0,
        ],
        'class-methods-use-this': [
            0,
        ],
        'import/prefer-default-export': [
            0,
        ],
        'react/function-component-definition': [
            2,
            {
                namedComponents: [
                    'arrow-function',
                    'function-declaration',
                ],
            },
        ],
        'react/jsx-wrap-multilines': [
            2,
            {
                declaration: 'parens-new-line',
                assignment: 'parens-new-line',
                return: 'parens-new-line',
                condition: 'parens-new-line',
                arrow: 'parens-new-line',
                logical: 'parens-new-line',
                prop: 'parens-new-line',
            },
        ],
        'react/no-unescaped-entities': [
            'off',
        ],
        'react/no-unstable-nested-components': [
            'off',
        ],
        'react/jsx-no-duplicate-props': [
            'error',
            {
                ignoreCase: false,
            },
        ],
        '@typescript-eslint/type-annotation-spacing': [
            'error',
            {
                after: true,
                before: false,
                overrides: {
                    arrow: {
                        before: true,
                        after: true,
                    },
                },
            },
        ],
        'object-curly-newline': [
            'error',
            {
                ObjectExpression: {
                    consistent: true,
                    minProperties: 3,
                },
                ObjectPattern: {
                    multiline: true,
                    minProperties: 3,
                },
                ImportDeclaration: {
                    multiline: true,
                    minProperties: 3,
                },
                ExportDeclaration: {
                    multiline: true,
                    minProperties: 3,
                },
            },
        ],
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'enum',
                format: [
                    'PascalCase',
                ],
            },
            {
                selector: 'enumMember',
                format: [
                    'PascalCase',
                ],
            },
            {
                selector: 'class',
                format: [
                    'PascalCase',
                ],
            },
            {
                selector: 'function',
                format: [
                    'camelCase',
                    'PascalCase',
                ],
            },
            {
                selector: 'parameter',
                format: [
                    'camelCase',
                    'PascalCase',
                ],
                leadingUnderscore: 'allow',
            },
            {
                selector: 'interface',
                format: [
                    'PascalCase',
                ],
            },
            {
                selector: 'typeLike',
                format: [
                    'PascalCase',
                ],
            },
        ],
    },
}

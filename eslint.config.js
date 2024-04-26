const { FlatCompat } = require('@eslint/eslintrc');
const nxEslintPlugin = require('@nx/eslint-plugin');
const js = require('@eslint/js');
const globals = require('globals')
const jsoncParser = require('jsonc-eslint-parser');
const tsParser = require('@typescript-eslint/parser');
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
});

module.exports = [
    { plugins: { '@nx': nxEslintPlugin } },
    {
        rules: {
            '@typescript-eslint/explicit-module-boundary-types': ['error'],
        },
        languageOptions: {
            parser: tsParser,
            globals: {
                ...globals.node,
            },
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        rules: {
            '@nx/enforce-module-boundaries': [
                'error',
                {
                    enforceBuildableLibDependency: true,
                    allow: [],
                    depConstraints: [{
                        sourceTag: '*',
                        onlyDependOnLibsWithTags: ['*'],
                    }, ],
                },
            ],
        },
    },
    {
        files: ['*.json'],
        languageOptions: {
            parser: jsoncParser,
        },
        rules: {},
    },
    ...compat.config({ extends: ['plugin:@nx/typescript'] }).map((config) => ({
        ...config,
        files: ['**/*.ts', '**/*.tsx'],
        rules: {},
    })),
    ...compat.config({ extends: ['plugin:@nx/javascript'] }).map((config) => ({
        ...config,
        files: ['**/*.js', '**/*.jsx'],
        rules: {},
    })),
];

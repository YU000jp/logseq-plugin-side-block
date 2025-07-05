
var PLUGIN_NAME = 'logseq-plugin-side-block';

module.exports = {
    branches: ['main'],
    plugins: [
        ['@semantic-release/commit-analyzer', {
            preset: 'conventionalcommits',
            releaseRules: [
                { type: 'ref', release: 'patch' },
                { type: 'chore', release: 'patch' },
            ],
        }],
        '@semantic-release/release-notes-generator',
        '@semantic-release/changelog',
        '@semantic-release/git',
        ['@semantic-release/exec', {
            prepareCmd:
                `zip -qq -r ${PLUGIN_NAME}-` + "${nextRelease.version}.zip dist icon.svg package.json README.md LICENSE",
        }],
        ['@semantic-release/github', {
            assets: `${PLUGIN_NAME}-*.zip`,
            fail: false,
            failComment: false,
            failTitle: false,
        }],
    ],
};

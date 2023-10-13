import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user';

/* user setting */
// https://logseq.github.io/plugins/types/SettingSchemaDesc.html
export const settingsTemplate = (): SettingSchemaDesc[] => [
    {
        key: "heading001",
        type: "heading",
        title: "no settings",
        default: "",
        description: "",
    },
];

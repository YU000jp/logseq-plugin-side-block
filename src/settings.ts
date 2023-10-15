import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user';
import { t } from 'logseq-l10n';

/* user setting */
// https://logseq.github.io/plugins/types/SettingSchemaDesc.html
export const settingsTemplate = (): SettingSchemaDesc[] => [
    {
        key: "booleanFunction",
        type: "boolean",
        title: t("On/Off"),
        default: true,
        description: "",
    },
];

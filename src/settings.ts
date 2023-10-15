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
    {
        key: "heading001",
        type: "heading",
        default: "",
        title: t("How to use"),
        description: `

        ${t("Add a specific tag to the parent block.")}
        ${t("From the second time onwards, Type a space and \"/.\", suggestions will be displayed.")}

        ${t("--Tag name--")}
        #.side : ${t("width")} ${t("unset")}
        #.side-s : ${t("width")} 100px
        #.side-m : ${t("width")} 200px
        #.side-l : ${t("width")} 300px
        #.side-ll : ${t("width")} 400px
        #.side-lll : ${t("width")} 500px
        
        ${t("Tags containing \".side\" are displayed only when editing.")}
        
        `,
    },
];

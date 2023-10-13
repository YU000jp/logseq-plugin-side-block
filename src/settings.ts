import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user';

/* user setting */
// https://logseq.github.io/plugins/types/SettingSchemaDesc.html
export const settingsTemplate = (): SettingSchemaDesc[] => [
    {
        key: "booleanFunction",
        type: "boolean",
        title: "On/Off",
        default: true,
        description: "",
    },
    {
        key: "heading001",
        type: "heading",
        default: "",
        title: "How to use",
        description: `

        Add a specific tag to the parent block.
        From the second time onwards, Type a space and "/.", suggestions will be displayed.

        #.side : width unset
        #.side-s : width 100px
        #.side-m : width 200px
        #.side-l : width 300px
        #.side-ll : width 400px
        #.side-lll : width 500px
        
        Tags containing ".side" are displayed only when editing.
        
        `,
    },
];

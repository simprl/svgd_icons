import { generateIcons } from "@svgd/icons-utils";
import * as Icons from '@ant-design/icons';

const {
    ["default"]: ignoreDefault,
    createFromIconfontCN,
    getTwoToneColor,
    setTwoToneColor,
    ...filteredIcons
} = Icons;

generateIcons({
    getIconsComponents : () => filteredIcons,
    getProps: () => ({
        twoToneColor: '#555',
    })
});

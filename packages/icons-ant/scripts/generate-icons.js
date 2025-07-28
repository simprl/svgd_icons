import { generateIcons } from "@svgd/icons-utils";
import * as Icons from '@ant-design/icons';

generateIcons({
    getIconsComponents : () => Icons,
    getProps: () => ({
        twoToneColor: '#555',
    })
});

import { generateIcons } from "@svgd/icons-utils";
import * as Icons from '@mui/icons-material';

const {
    ["default"]: ignoreDefault,
    ...filteredIcons
} = Icons;

generateIcons({
    getIconsComponents : () => filteredIcons,
});

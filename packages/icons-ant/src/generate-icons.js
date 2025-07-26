import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as Icons from '@ant-design/icons';

(async () => {
    const outDir = path.resolve(process.cwd(), 'svg');
    if (fs.existsSync(outDir)) {
        fs.rmSync(outDir, { recursive: true, force: true });
    }
    fs.mkdirSync(outDir);

    const iconEntries = Object.entries(Icons);
    const limit = process.env.TEST_MODE ? 10 : Infinity;
    let num = 0;
    for (const [iconName, IconComponent] of iconEntries) {
        if (num >= limit) break;
        let rawSvg;
        try {
            rawSvg = renderToStaticMarkup(
                React.createElement(IconComponent, {
                    twoToneColor: '#555',
                    xmlns: "http://www.w3.org/2000/svg",
                    xmlnsXlink: "http://www.w3.org/1999/xlink"
                })
            ).replace(/<style.*?<\/style>/, '');
            if (rawSvg.startsWith('<span')) {
                rawSvg = rawSvg.replace(/^<span[^>]*>(.*)<\/span>$/s, '$1');
            }
        } catch (e) {
            console.log("Skipping:", iconName);
            continue;
        }
        fs.writeFileSync(path.join(outDir, `${iconName}.svg`), rawSvg);
        num++;
    }

    console.log(`✔ ${num} svg files were created`);
})();

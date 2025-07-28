import fs from 'fs'
import path from 'path'

export function syncVersion({ depName, cwd = process.cwd() }) {
    const pkgPath = path.resolve(cwd, 'package.json')
    const pkg     = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))

    const depRange = pkg.dependencies?.[depName] || pkg.devDependencies?.[depName]
    if (!depRange) throw new Error(`Cannot find "${depName}" in dependencies`)

    const depVersion = depRange.replace(/^[^\d]*/, '')
    const [pMaj, pMin, pPatch] = pkg.version.split('.').map(Number)
    const [dMaj, dMin, dPatch] = depVersion.split('.').map(Number)

    let newVer
    if (dMaj * 10000 + dMin > pMaj * 10000 + pMin) {
        newVer = `${dMaj}.${dMin}.${dPatch}`
    } else {
        const nextPatch = (dMaj === pMaj && dMin === pMin)
            ? Math.max(dPatch, pPatch) + 1
            : Math.max(dPatch, pPatch)
        newVer = `${pMaj}.${pMin}.${nextPatch}`
    }

    pkg.version = newVer
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
    return newVer
}

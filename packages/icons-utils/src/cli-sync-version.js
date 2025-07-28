#!/usr/bin/env node
import { syncVersion } from './sync-version.js'

const [depName] = process.argv.slice(2)
if (!depName) {
    console.error('Usage: sync-version <dependency-name>')
    process.exit(1)
}

try {
    const newVer = syncVersion({ depName, cwd: process.cwd() })
    console.log(`✅ version bumped to ${newVer}`)
} catch (err) {
    console.error(err.message)
    process.exit(1)
}

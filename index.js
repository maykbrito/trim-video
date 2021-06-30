import { ask } from './src/input.js'
import { createParts, appendFilesToListTxt } from './src/helpers.js'
import { trimFiles } from './src/trim.js'
import { concatFiles } from './src/concat.js'
import { removeFiles } from './src/removeFiles.js'

await ask()
await createParts()
await appendFilesToListTxt()
await trimFiles()
await concatFiles()
await removeFiles()

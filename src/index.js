import { ask } from './robots/input.js'
import { trim } from './robots/trim.js'
import { concat } from './robots/concat.js'
import { cleaner } from './robots/cleaner.js'

import state from './state.js'

let content = await ask(state)
await trim(content)

if (content.concat) {
  await concat()
  await cleaner()
}

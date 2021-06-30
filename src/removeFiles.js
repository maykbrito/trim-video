import state from './state.js'
import { execSync } from 'child_process'

export async function removeFiles() {
  //create bash array
  const files = `
  files=(${state.outputFiles.map(file => file.replace('file ')).join(' ')})`

  const command = `
  ${files}
  for f in "\${files[@]}" ; do
    trash "$f"
  done
  `

  console.log(command)

  execSync(command, (error, stdout, stderr) => {
    if (error) {
      Promise.reject('Error while trying remove files')
    }

    console.log('REMOVED: ', stderr)
    Promise.resolve()
  })
}

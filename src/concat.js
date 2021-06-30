import state from './state.js'
import { execSync } from 'child_process'

export async function concatFiles() {
  const ffmpegConcat = `ffmpeg -f concat -safe 0 -i ${state.txtFile} -c copy -copyts final.mp4`

  console.log('CONCAT ===================\n\n')
  execSync(ffmpegConcat, (error, stdout, stderr) => {
    if (error) {
      Promise.reject('Error while trying concat video')
    }
    console.log(stderr)
    Promise.resolve()
  })
  console.log('\n===========================\n')
}

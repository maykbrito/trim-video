import { execAsync as exec } from '../utils.js'

export async function cleaner() {
  const cmd = `find . -type f -iname "part*.mp4" | xargs rm`
  await exec(cmd)
  await exec('rm mylist.txt')
}

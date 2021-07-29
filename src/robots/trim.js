import { execAsync as exec, toSeconds } from '../utils.js'

async function trimFile(content, index) {
  try {
    console.log(`> Trimming ${index}\n`)
    await exec(
      `ffmpeg -ss ${content.from} \
      -i "${content.input}" \
      -t ${toSeconds(content.from, content.to)} \
      -c copy -avoid_negative_ts 1 \
      ${content.filename}.mp4`
    )
    console.log(`> ${content.filename} trimmed`)
  } catch (error) {
    throw new Error(error)
  }
}

export async function trim(content) {
  await Promise.all(
    content.intervals.map(async ([from, to], index) => {
      const part = {
        input: content.input,
        from,
        to,
        filename: `part-${index}`
      }

      console.log(part)

      await trimFile(part, index)

      if (content.concat) {
        content.parts = content.parts
          ? [...content.parts, part.filename]
          : [part.filename]
      }
    })
  )
}

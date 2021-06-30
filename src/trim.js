import state from './state.js'
import { execSync } from "child_process"
import path from 'path';

import { formatedTimeToSeconds } from './helpers.js'


async function trimFile({ index, start, end, outputFileName }) {
  const run = `ffmpeg -ss ${start} -i ${state.input} -t ${formatedTimeToSeconds({start, end})} -c copy -avoid_negative_ts 1 ${outputFileName}`;

  console.log(`\n\nTRIMMING ${index + 1} =========================\n\n`);

  execSync(run, (error, stdout, stderr) => {
    if (error) {
      Promise.reject("Error while trying to trim video")
    }
    console.error(`stderr: ${stderr}`);
    Promise.resolve()
  });
}


export async function trimFiles()
 {
  state.cuts.map(async (cut, index) => {
    const outputFileName = path.basename(state.outputFiles[index])

    await trimFile({ index, ...cut, outputFileName });
  })
};
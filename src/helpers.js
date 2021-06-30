import state from './state.js'
import { appendFile, open } from 'fs/promises'
import path from 'path'

export async function createParts() {
  const __dirname = path.resolve()

  state.cuts.map((cut, index) => {
    state.outputFiles.push(__dirname + `/part${index}.mp4`)
  })
}

async function clearFile() {
  let filehandle = null
  try {
    filehandle = await open(state.txtFile, 'r+')
    await filehandle.truncate(0)
  } finally {
    filehandle?.close()
  }
}

async function addTextLine(line) {
  await appendFile(state.txtFile, `file '${line}'\n`)
  console.log(`${line} adicionado ao ${state.txtFile}`)
  return
}

export async function appendFilesToListTxt() {
  await clearFile()

  for (let i = 0; i < state.outputFiles.length; i++) {
    await addTextLine(state.outputFiles[i])
  }
}

// { start: "00:01:15.800", end: "00:04:19.000" },
export function formatedTimeToSeconds({ start, end }) {
  const [startHour, startMinutes, startSeconds] = start.split(':')
  let [startSec, startMiliseconds] = startSeconds.split('.')

  const [endHour, endMinutes, endSeconds] = end.split(':')
  let [endSec, endMiliseconds] = endSeconds.split('.')

  const hoursToMs = hours => Number(hours) * 60 * 60 * 1000
  const minutesToMs = minutes => Number(minutes) * 60 * 1000
  const secToMs = seconds => Number(seconds) * 1000

  const startToMs =
    hoursToMs(startHour) +
    minutesToMs(startMinutes) +
    secToMs(startSec) +
    Number(startMiliseconds)

  const endToMs =
    hoursToMs(endHour) +
    minutesToMs(endMinutes) +
    secToMs(endSec) +
    Number(endMiliseconds)

  const range = endToMs - startToMs

  const rangeToSec = Math.floor(range / 1000)
  const ms = range % 1000

  console.log('===================================')
  console.log(
    `start (${start}) - end (${end}): toSeconds: ${rangeToSec}, ms: ${ms}`
  )
  return `${rangeToSec}.${ms}` // 183.200
}

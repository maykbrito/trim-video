import state from './state.js'
import inquirer from 'inquirer'

const questions = {
  initial: [
    {
      type: 'confirm',
      name: 'ask',
      message: 'Ask questions? (NO for read from state.js)',
      default: true
    }
  ],

  videoFile: [
    {
      type: 'input',
      name: 'fileName',
      message: 'Video to cut (absolute path)'
    }
  ],

  timesToCut: [
    {
      type: 'input',
      name: 'startTimeToCut',
      message: 'Cut at (start): 00:00:00.000'
    },
    {
      type: 'input',
      name: 'endTimeToCut',
      message: 'Cut to (end): 00:00:15.000'
    },
    {
      type: 'confirm',
      name: 'askAgain',
      message: 'Want to cut more parts? (enter for NO)',
      default: false
    }
  ]
}

async function askTimeToCut() {
  const answers = await inquirer.prompt(questions.timesToCut)

  state.cuts.push({
    start: answers.startTimeToCut,
    end: answers.endTimeToCut
  })

  if (answers.askAgain) {
    await askTimeToCut()
  }
}

export async function ask() {
  const { ask } = await inquirer.prompt(questions.initial)

  if (ask) {
    const { fileName } = await inquirer.prompt(questions.videoFile)

    state.input = fileName
    state.cuts = []

    await askTimeToCut()
  }
}

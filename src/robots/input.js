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
      message: 'Initial interval: 00:00:00.000'
    },
    {
      type: 'input',
      name: 'endTimeToCut',
      message: 'Final interval: 00:00:15.000'
    },
    {
      type: 'confirm',
      name: 'askAgain',
      message: 'Want to cut more parts? (enter for NO)',
      default: false
    }
  ],

  concatenateFiles: [
    {
      type: 'confirm',
      name: 'concat',
      message: 'Concatenate files? (NO for NO)',
      default: true
    }
  ]
}

async function askTimeToCut(content) {
  const answers = await inquirer.prompt(questions.timesToCut)

  content.intervals.push([answers.startTimeToCut, answers.endTimeToCut])

  if (answers.askAgain) {
    await askTimeToCut(content)
  }

  return content
}

export async function ask(content) {
  const { ask } = await inquirer.prompt(questions.initial)

  if (ask) {
    const { fileName } = await inquirer.prompt(questions.videoFile)

    content.input = fileName
    content.intervals = []

    content = await askTimeToCut(content)

    const { concat } = await inquirer.prompt(questions.concatenateFiles)
    content.concat = concat
  }

  return content
}

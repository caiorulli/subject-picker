const database = require('./db')

const makeInteractors = (db = database) => {
  const buildChoiceTable = async (id) => {
    const choices = await db.getChoices(id)
    const subjects = await db.getSubjects()

    return subjects.map((subject) => {
      let hasChosen
      if (choices.some((choice) => choice.ID_ELETIVA === subject.ID)) hasChosen = true
      else hasChosen = false

      const weekDay = [undefined, undefined, undefined, 'Terça', 'Quarta', undefined, 'Sexta', undefined, undefined, 'Terça e sexta']
      return Object.assign(subject, { hasChosen, weekDay: weekDay[subject.DIA_SEMANA] })
    })
  }

  const updateChoices = async (id, choices) => {
    if (choices && choices.forEach && validateChoices(id, choices)) {
      await db.deleteChoices(id)
      choices.forEach(async (choice) => db.insertChoice(id, choice))
    } else {
      throw new Error('Invalid choice payload')
    }
  }

  const validateChoices = async (id, choiceIds) => {
    const student = await db.getStudent(id)
    const choices = await db.getSubjectsFromChoices(choiceIds)
    if (!chSumMatches(choices, student)) return false
    else if (!fridayAvailabilityMatches(choices, student)) return false
    return true
  }

  return {
    buildChoiceTable,
    updateChoices,
    validateChoices
  }
}

const chSumMatches = (choices, student) => {
  const sum = (a, b) => a + b
  const choiceChSum = choices.map(choice => choice.CH).reduce(sum)
  const availableCh = student.SEMESTRE_PREVISTO === 7
    ? [student.CH_EM_2018_01, student.CH_EM_2018_01 + 72]
    : [student.CH_EM_2018_01]
  return availableCh.includes(choiceChSum)
}

const fridayAvailabilityMatches = (choices, student) => {
  const fridayAvailable = student.SEXTA_DISPONIVEL === 1
  const hasChosenFridaySubject = choices.map(choice => choice.DIA_SEMANA).includes(6)
  if (hasChosenFridaySubject) {
    if (fridayAvailable) return true
    else return false
  }
  return true
}

module.exports = makeInteractors

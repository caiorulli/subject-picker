const database = require('./db')

const makeInteractors = (db = database) => {
  const buildChoiceTable = async (id) => {
    const choices = await db.getChoices(id)
    const subjects = await db.getSubjects()
    const student = (await db.getStudent(id))[0]

    return {
      student,
      subjects: subjects.map((subject) => {
        let hasChosen
        if (choices.some((choice) => choice.ID_ELETIVA === subject.ID)) hasChosen = 'checked'
        else hasChosen = ''

        const weekDay = [undefined, undefined, undefined, 'Terça', 'Quarta', undefined, 'Sexta', undefined, undefined, 'Terça e sexta']
        return Object.assign(subject, { hasChosen, weekDay: weekDay[subject.DIA_SEMANA] })
      })
    }
  }

  const updateChoices = async (id, choices) => {
    if (choices && choices.forEach && await validateChoices(id, choices)) {
      await db.deleteChoices(id)
      await choices.forEach(async (choice) =>
        db.insertChoice(id, choice)
        .catch(error => { throw error }))
    } else {
      throw new Error('Invalid choice payload')
    }
  }

  const validateChoices = async (id, choiceIds) => {
    const student = (await db.getStudent(id))[0]
    const choices = await db.getSubjectsFromChoices(choiceIds).catch(error => console.log(error))
    if (!chSumMatches(choices, student)) return false
    if (!fridayAvailabilityMatches(choices, student)) return false
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
  const fridayAvailable = student.SEXTA_DISPONIVEL
  const hasChosenFridaySubject = choices.map(choice => choice.DIA_SEMANA).includes(6)
  if (hasChosenFridaySubject) {
    if (fridayAvailable) return true
    else return false
  }
  return true
}

module.exports = makeInteractors

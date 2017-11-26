const database = require('./db')

const actions = (db = database) => ({
  buildChoiceTable: async (id) => {
    const choices = await db.getChoices(id)
    const subjects = await db.getSubjects()

    return subjects.map((subject) => {
      let hasChosen
      if (choices.some((choice) => choice.ID_ELETIVA === subject.ID)) hasChosen = true
      else hasChosen = false

      const weekDay = [undefined, undefined, undefined, 'Terça', 'Quarta', undefined, 'Sexta', undefined, undefined, 'Terça e sexta']
      return {...subject, hasChosen, weekDay: weekDay[subject.DIA_SEMANA]}
    })
  },

  updateChoices: async (id, choices) => {
    if (choices && choices.forEach) {
      await db.deleteChoices(id)
      choices.forEach(async (choice) => db.insertChoice(id, choice))
    } else {
      throw new Error('No choice payload')
    }
  }
})

module.exports = actions

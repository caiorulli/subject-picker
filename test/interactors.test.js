const assert = require('assert')
const makeInteractors = require('../src/interactors')

const mockGetSubjects = async () => Promise.resolve([
  { ID: 24, DIA_SEMANA: 3, CH: 72 },
  { ID: 25, DIA_SEMANA: 4, CH: 144 },
  { ID: 26, DIA_SEMANA: 6, CH: 72 }
])

describe('Interactors', () => {
  describe('Build choice table', () => {
    it('Happy path', async () => {
      const mockDb = {
        getChoices: async () => Promise.resolve([
          { ID_ELETIVA: 24 },
          { ID_ELETIVA: 26 }
        ]),
        getSubjects: mockGetSubjects
      }
      const interactors = makeInteractors(mockDb)

      const choiceTable = await interactors.buildChoiceTable()

      assert.deepEqual(choiceTable, [
        { ID: 24, DIA_SEMANA: 3, CH: 72, hasChosen: true, weekDay: 'Terça' },
        { ID: 25, DIA_SEMANA: 4, CH: 144, hasChosen: false, weekDay: 'Quarta' },
        { ID: 26, DIA_SEMANA: 6, CH: 72, hasChosen: true, weekDay: 'Sexta' }
      ])
    })
  })

  describe('Update choices', () => {
    it('Happy path')
  })

  describe('Validate choices', () => {
    it('Returns false if sum of subjects time is different than available time', async () => {
      const mockDb = {
        getStudent: async () => Promise.resolve({
          RA: 11510005,
          SEMESTRE_PREVISTO: 5,
          CH_EM_2018_01: 144,
          SEXTA_DISPONIVEL: 0
        }),
        getSubjectsFromChoices: async () => Promise.resolve([
          { ID: 24, DIA_SEMANA: 3, CH: 72 },
          { ID: 25, DIA_SEMANA: 4, CH: 144 }
        ])
      }
      const interactors = makeInteractors(mockDb)

      const valid = await interactors.validateChoices(11510005, [24, 25])

      assert.equal(valid, false)
    })

    it('Returns false if student has chosen friday subject without friday avaliability', async () => {
      const mockDb = {
        getStudent: async () => Promise.resolve({
          RA: 11510005,
          SEMESTRE_PREVISTO: 5,
          CH_EM_2018_01: 144,
          SEXTA_DISPONIVEL: 0
        }),
        getSubjectsFromChoices: async () => Promise.resolve([
          { ID: 24, DIA_SEMANA: 3, CH: 72 },
          { ID: 25, DIA_SEMANA: 6, CH: 72 }
        ])
      }
      const interactors = makeInteractors(mockDb)

      const valid = await interactors.validateChoices(11510005, [24, 25])

      assert.equal(valid, false)
    })

    it('Returns true otherwise', async () => {
      const mockDb = {
        getStudent: async () => Promise.resolve({
          RA: 11510005,
          SEMESTRE_PREVISTO: 5,
          CH_EM_2018_01: 144,
          SEXTA_DISPONIVEL: 1
        }),
        getSubjectsFromChoices: async () => Promise.resolve([
          { ID: 24, DIA_SEMANA: 3, CH: 72 },
          { ID: 26, DIA_SEMANA: 4, CH: 72 }
        ])
      }
      const interactors = makeInteractors(mockDb)

      const valid = await interactors.validateChoices(11510005, [24, 26])

      assert.equal(valid, true)
    })
    
    it('Considers 7th semester exception in ch sum', async () => {
      const mockDb = {
        getStudent: async () => Promise.resolve({
          RA: 11510005,
          SEMESTRE_PREVISTO: 7,
          CH_EM_2018_01: 144,
          SEXTA_DISPONIVEL: 1
        }),
        getSubjectsFromChoices: async () => Promise.resolve([
          { ID: 24, DIA_SEMANA: 3, CH: 72 },
          { ID: 25, DIA_SEMANA: 4, CH: 72 },
          { ID: 26, DIA_SEMANA: 6, CH: 72 }
        ])
      }
      const interactors = makeInteractors(mockDb)

      const valid = await interactors.validateChoices(11510005, [24, 25, 26])

      assert.equal(valid, true)
    })
  })
})

import factory from '@adonisjs/lucid/factories'
import Card from '#models/card'

export const CardFactory = factory
  .define(Card, async ({ faker }) => {
    return {
      name: faker.word.adverb(),
    }
  })
  .build()

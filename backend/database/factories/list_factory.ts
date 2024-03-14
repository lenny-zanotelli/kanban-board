import factory from '@adonisjs/lucid/factories'
import List from '#models/list'
import { CardFactory } from './card_factory.js'

export const ListFactory = factory
  .define(List, async ({ faker }) => {
    return {
      title: faker.word.adverb(),
    }
  })
  .relation('cards', () => CardFactory)
  .build()

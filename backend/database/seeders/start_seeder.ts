import Card from '#models/card'
import List from '#models/list'
import Tag from '#models/tag'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await List.createMany([
      {
        name: 'Backlog',
        position: 1,
      },
      {
        name: 'Ready',
        position: 2,
      },
      {
        name: 'In Progress',
        position: 3,
      },
      {
        name: 'Done',
        position: 4,
      },
    ])

    await Card.createMany([
      {
        title: 'Carte 1',
        color: '#fff696',
        listId: 2,
      },
      {
        title: 'Carte 2',
        color: '#c1e7ff',
        listId: 1,
      },
      {
        title: 'Carte 3',
        color: '#A4CB80',
        listId: 1,
      },
    ])

    await Tag.createMany([
      {
        name: 'Tag 1',
        color: '#c1e7ff',
        cardId: 1,
      },
      {
        name: 'Tag 2',
        color: '#A4CB80',
        cardId: 1,
      },
      {
        name: 'Tag 3',
        color: '#c1e7ff',
        cardId: 1,
      },
      {
        name: 'Tag 4',
        color: '#A4CB80',
        cardId: 2,
      },
      {
        name: 'Tag 5',
        color: '#c1e7ff',
        cardId: 3,
      },
    ])
  }
}

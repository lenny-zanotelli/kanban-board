import List from '#models/list'
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
  }
}

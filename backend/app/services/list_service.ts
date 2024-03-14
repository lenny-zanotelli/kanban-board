// import db from '@adonisjs/lucid/services/db'

import List from '#models/list'

export default class ListService {
  async all() {
    // const query = db.query()
    const lists = await List.query().preload('cards').orderBy('position', 'asc')

    return lists
  }
  async find(id: number) {
    const list = await List.findOrFail(id)
    if (!list) {
      throw new Error('List doesnt exist')
    }
    return list
  }
}

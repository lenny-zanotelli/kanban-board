import List from '#models/list'

export default class ListService {
  async all() {
    return await List.all()
  }

  async show(id: number) {
    return await List.findOrFail(id)
  }

  async create(data: Partial<List>) {
    const newList = await List.create({ ...data })
    return await newList.save()
  }

  async update(id: number, data: Partial<List>) {
    return await List.query()
      .where('id', id)
      .update({ ...data })
  }

  async delete(id: number) {
    const listToDelete = await List.findOrFail(id)
    return await listToDelete.delete()
  }
}

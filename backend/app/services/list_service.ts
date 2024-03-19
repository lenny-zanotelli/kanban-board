import List from '#models/list'

export default class ListService {
  async all() {
    return await List.all()
  }

  async show(id: number) {
    return await List.find(id)
  }

  async create(data: Partial<List>) {
    const newList = await List.create({ ...data })
    return await newList.save()
  }
}

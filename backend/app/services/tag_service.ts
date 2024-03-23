import Tag from '#models/tag'

export default class TagService {
  async all() {
    return await Tag.all()
  }

  async show(id: number) {
    return await Tag.findOrFail(id)
  }

  async create(data: Partial<Tag>) {
    const newTag = await Tag.create({ ...data })
    return await newTag.save()
  }

  async update(id: number, data: Partial<Tag>) {
    return await Tag.query()
      .where('id', id)
      .update({ ...data })
  }

  async delete(id: number) {
    const tagToDelete = await Tag.findOrFail(id)
    return await tagToDelete.delete()
  }
}

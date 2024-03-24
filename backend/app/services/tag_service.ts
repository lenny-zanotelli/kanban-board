import Card from '#models/card'
import Tag from '#models/tag'

type CreateTagInput = {
  name: string
  color?: string
}

export default class TagService {
  async all() {
    return await Tag.all()
  }

  async associateToCard(cardId: number, tagId: number) {
    let card = await Card.findOrFail(cardId)
    let tag = await Tag.findOrFail(tagId)
    return await card.related('tags').save(tag)
  }

  async create(data: CreateTagInput) {
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

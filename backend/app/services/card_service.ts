import Card from '#models/card'

export default class CardService {
  async all() {
    return await Card.all()
  }

  async show(id: number) {
    return await Card.findOrFail(id)
  }

  async create(data: Partial<Card>) {
    const newCard = await Card.create({ ...data })
    return await newCard.save()
  }

  async update(id: number, data: Partial<Card>) {
    return await Card.query()
      .where('id', id)
      .update({ ...data })
  }

  async delete(id: number) {
    const cardToDelete = await Card.findOrFail(id)
    return await cardToDelete.delete()
  }
}

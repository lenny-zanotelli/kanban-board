import Card from '#models/card'

export default class CardService {
  async getCardsInList(listId: number) {
    return await Card.query()
      .where('list_id', listId)
      .preload('list', (listQuery) => {
        listQuery.where('id', listId)
      })
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

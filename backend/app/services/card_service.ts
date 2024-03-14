import { CardFactory } from '#database/factories/card_factory'

export default class CardService {
  async card() {
    const card = await CardFactory.createMany(5)
    return card
  }
}

import type { HttpContext } from '@adonisjs/core/http'
import CardService from '#services/card_service'
import { inject } from '@adonisjs/core'
import { createCardValidator, updateCardValidator } from '#validators/card'

@inject()
export default class CardsController {
  constructor(protected cardService: CardService) {}

  /**
   * Returns all cards in a list.
   * Each card must carry the tags associated with it.
   */
  async cardsInAList({ params }: HttpContext) {
    const listId = params.id
    return this.cardService.getCardsInList(listId)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createCardValidator)
    return await this.cardService.create(payload)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return this.cardService.show(params.id)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const cardId = params.id
    const payload = await request.validateUsing(updateCardValidator)
    return this.cardService.update(cardId, payload)
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const cardId = params.id
    return this.cardService.delete(cardId)
  }
}

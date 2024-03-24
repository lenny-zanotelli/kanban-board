import TagService from '#services/tag_service'
import { createTagValidator, updateTagValidator } from '#validators/tag'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class TagsController {
  constructor(protected tagService: TagService) {}
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return this.tagService.all()
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createTagValidator)
    return this.tagService.create(payload)
  }

  /**
   * Associates a Tag with the targeted Card
   */
  async associateTagToCard({ params, request }: HttpContext) {
    const cardId = params.id
    const tagId = request.body().tag_id
    return this.tagService.associateToCard(cardId, tagId)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const tagId = params.id
    const payload = await request.validateUsing(updateTagValidator)
    return this.tagService.update(tagId, payload)
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const tagId = params.id
    return this.tagService.delete(tagId)
  }
}

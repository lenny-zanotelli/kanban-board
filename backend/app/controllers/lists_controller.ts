import ListService from '#services/list_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ListsController {
  constructor(protected listService: ListService) {}

  /**
   * Display a list of resource
   */
  async index() {
    return this.listService.all()
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const body = request.body()
    return await this.listService.create(body)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return this.listService.show(params.id)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const listId = params.id
    const body = request.body()
    return this.listService.update(listId, body)
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const listId = params.id
    return this.listService.delete(listId)
  }
}

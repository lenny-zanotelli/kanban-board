import type { HttpContext } from '@adonisjs/core/http'

import ListService from '#services/list_service'
import { inject } from '@adonisjs/core'

@inject()
export default class ListsController {
  constructor(protected list: ListService) {}
  /**
   * Return list of all posts or paginate through
   * them
   */

  index() {
    return this.list.all()
  }
  /**
   * Display a single list by id.
   */

  show({ params }: HttpContext) {
    return this.list.find(params.id)
  }
}

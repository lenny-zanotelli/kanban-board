import UserService from '#services/user_service'
import { inject } from '@adonisjs/core'

@inject()
export default class UsersController {
  constructor(protected userService: UserService) {}
  async index() {
    return this.userService.all()
  }
  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}
}

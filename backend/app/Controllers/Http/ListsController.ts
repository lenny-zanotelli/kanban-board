// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class ListsController {
  public async index() {
    return await User.all()
  }

}

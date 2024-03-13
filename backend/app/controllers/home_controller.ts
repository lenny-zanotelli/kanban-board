// import type { HttpContext } from '@adonisjs/core/http'

import EchoService from '#services/echo_service'
import { inject } from '@adonisjs/core'

@inject()
export default class HomeController {
  constructor(protected echo: EchoService) {}
  handle() {
    return this.echo.respond()
  }
}

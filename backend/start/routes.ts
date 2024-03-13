/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async ({ request, response }) => {
  console.log(request.url())
  console.log(request.body())

  response.send('hello world')
  response.send({ hello: 'world' })
})

router.get('home', '#controllers/home_controller.handle')

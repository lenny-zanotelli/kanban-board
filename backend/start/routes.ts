/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
const UsersController = () => import('#controllers/users_controller')
const ListsController = () => import('#controllers/lists_controller')
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('users', [UsersController, 'index'])
router.resource('lists', ListsController).apiOnly()

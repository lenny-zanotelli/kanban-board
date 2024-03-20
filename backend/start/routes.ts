/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
const ListsController = () => import('#controllers/lists_controller')
const CardsController = () => import('#controllers/cards_controller')
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.resource('lists', ListsController).apiOnly()
router.resource('cards', CardsController).apiOnly()

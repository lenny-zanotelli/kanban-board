/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'

router.resource('lists', '#controllers/lists_controller').apiOnly()
router.resource('cards', '#controllers/cards_controller').apiOnly()
router.resource('tags', '#controllers/tags_controller').apiOnly()

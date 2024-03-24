/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
const CardsController = () => import('#controllers/cards_controller')
const TagsController = () => import('#controllers/tags_controller')
import router from '@adonisjs/core/services/router'

router.resource('lists', '#controllers/lists_controller').apiOnly()
router.get('lists/:id/cards', [CardsController, 'cardsInAList'])
router.resource('cards', '#controllers/cards_controller').apiOnly()
router.resource('tags', '#controllers/tags_controller').apiOnly()
router.post('cards/:id/tags', [TagsController, 'associateTagToCard'])

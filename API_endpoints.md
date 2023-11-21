# Kanban Board

## API Endpoints

### Lists

| Method | Route        | Description                                  |
| ------ | ------------ | -------------------------------------------- |
| GET    | `/lists`     | returns all lists with their cards and tags. |
| GET    | `/lists/:id` | returns one list                             |
| POST   | `/lists`     | creates a new list                           |
| PUT    | `/lists/:id` | modifies a list or 404                       |
| DELETE | `/lists/:id` | delete a list or 404                         |

### Cards

| Method | Route              | Description                                                                    |
| ------ | ------------------ | ------------------------------------------------------------------------------ |
| GET    | `/lists/:id/cards` | returns all cards in a list. Each card must carry the tags associated with it. |
| GET    | `/cards/:id`       | returns the details of the requested card, with the tags associated with it.   |
| POST   | `/cards`           | creates a new card                                                             |
| PUT    | `/cards/:id`       | modifies a card or 404                                                         |
| DELETE | `/cards/:id`       | delete a card or 404                                                           |

### Tags

| Method | Route                          | Description                                     |
| ------ | ------------------------------ | ----------------------------------------------- |
| GET    | `/tags`                        | returns all tags                                |
| POST   | `/tags`                        | creates a new tag                               |
| PATCH  | `/tags/:id`                    | modifies the targeted tag or 404                |
| DELETE | `/tags/:id`                    | delete a tag or 404                             |
| POST   | `/cards/:id/tags`              | associate a tag with targeted card              |
| DELETE | `/cards/:card_id/tags/:tag_id` | remove the assoication between the and the card |

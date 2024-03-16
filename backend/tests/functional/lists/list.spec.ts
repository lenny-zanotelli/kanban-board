import { test } from '@japa/runner'

test.group('Lists list', () => {
  test('Get all lists', async ({ client }) => {
    const response = await client.get('/lists')

      response.assertStatus(200)
      response.assertBody({
        data: [
          {
            id: 1,
            title: 'First List'
          },
          {
            id: 2,
            title: 'Second List'
          }
        ]
      })
  })
})

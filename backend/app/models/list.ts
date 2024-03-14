import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Card from './card.js'

export default class List extends BaseModel {
  @hasMany(() => Card)
  declare cards: HasMany<typeof Card>

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare position: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import List from './list.js'
import Tag from './tag.js'

export default class Card extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare listId: number

  @column()
  declare title: string

  @column()
  declare position: number

  @column()
  declare color: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => List)
  declare list: BelongsTo<typeof List>

  @hasMany(() => Tag)
  declare tags: HasMany<typeof Tag>
}

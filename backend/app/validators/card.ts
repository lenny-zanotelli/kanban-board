import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when creating
 * a new card.
 */
export const createCardValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3).maxLength(30),
    position: vine.number({ strict: true }).positive().withoutDecimals(),
    color: vine.string().hexCode(),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing card.
 */
export const updateCardValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3).maxLength(30),
    position: vine.number({ strict: true }).positive().withoutDecimals(),
    color: vine.string().hexCode().optional(),
  })
)

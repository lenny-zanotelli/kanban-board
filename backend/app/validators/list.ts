import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when creating
 * a new list.
 */
export const createListValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(15),
    position: vine.number({ strict: true }).positive().withoutDecimals(),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing list.
 */
export const updateListValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(15),
    position: vine.number({ strict: true }).positive().withoutDecimals(),
  })
)

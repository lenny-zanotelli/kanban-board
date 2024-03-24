import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when creating
 * a new tag.
 */
export const createTagValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(10),
    color: vine.string().hexCode().optional(),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing tag.
 */
export const updateTagValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(10).optional(),
    color: vine.string().hexCode().optional(),
  })
)

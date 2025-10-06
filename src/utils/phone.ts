// Phone normalization helpers

/**
 * Normalize KR phone to E.164 style with +82.
 * - Strips non-digits
 * - If starts with 0, replace leading 0 with country code 82
 * - Ensures leading '+'
 * Examples:
 *  - '01012345678' -> '+821012345678'
 *  - '+82-10-1234-5678' -> '+821012345678'
 */
export function normalizeKrPhoneToE164(input: string | undefined | null): string | undefined {
  if (!input) return undefined
  const digits = String(input).replace(/[^0-9+]/g, '')
  if (digits.startsWith('+')) {
    // Already with country code; just remove non-digits except leading plus
    return '+' + digits.replace(/[^0-9]/g, '')
  }
  // Remove non-digits
  const onlyDigits = digits.replace(/\D/g, '')
  if (onlyDigits.startsWith('0')) {
    return `+82${onlyDigits.slice(1)}`
  }
  // If already without 0 and without +, assume domestic number without leading 0 (e.g., 1012345678)
  // Prepend +82
  return `+82${onlyDigits}`
}

/**
 * Convert E.164 +82 number to local KR format starting with 0.
 * Examples:
 *  - '+821012345678' -> '01012345678'
 *  - '+82-10-1234-5678' -> '01012345678'
 *  - '01012345678' -> '01012345678'
 */
export function toLocalKrPhone(input: string | undefined | null): string | undefined {
  if (!input) return undefined
  const cleaned = String(input).replace(/[^0-9+]/g, '')
  if (cleaned.startsWith('+82')) {
    const digits = cleaned.replace(/[^0-9]/g, '')
    // Remove country code '82' (2 digits)
    const rest = digits.slice(2)
    return rest.startsWith('0') ? rest : `0${rest}`
  }
  if (cleaned.startsWith('+')) {
    // Other country code: return digits without plus
    return cleaned.replace(/[^0-9]/g, '')
  }
  return cleaned.replace(/\D/g, '')
}

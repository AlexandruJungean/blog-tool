/**
 * Application Colors — Single Source of Truth
 *
 * THREE brand colors (shared with the mobile app):
 *   darkPurple:  #0F0A32   — deep indigo-purple, for hero panels & deepest UI
 *   mainPurple:  #7631EE   — vibrant brand purple, for CTAs & accents
 *   lightPurple: #BC95FB   — soft lavender, for tints & hover states
 *
 * Every shade below is mathematically derived from these three.
 * The 10-shade palette is just an implementation detail for Tailwind utility
 * classes — the brand uses only the three colors above.
 */

export const BASE_COLORS = {
  darkPurple: '#0F0A32',
  mainPurple: '#7631EE',
  lightPurple: '#BC95FB',
} as const

/**
 * Primary palette — every value derived from the three BASE_COLORS.
 *
 *  50–300  : lightPurple tinted toward white (backgrounds, borders)
 *  400     : lightPurple (exact)
 *  500     : mainPurple (exact) — vibrant brand color, primary CTA
 *  600–800 : linear blend from mainPurple → darkPurple
 *  900     : darkPurple (exact) — deepest UI, hero backgrounds
 */
export const PRIMARY = {
  50:  '#F7F1FF',  // 8% lightPurple + 92% white
  100: '#F1E7FE',  // 15% lightPurple + 85% white
  200: '#E3CFFD',  // 35% lightPurple + 65% white
  300: '#CFB1FC',  // 65% lightPurple + 35% white
  400: '#BC95FB',  // lightPurple
  500: '#7631EE',  // mainPurple
  600: '#5C27BF',  // 75% mainPurple + 25% darkPurple
  700: '#431E90',  // 50% mainPurple + 50% darkPurple
  800: '#291461',  // 25% mainPurple + 75% darkPurple
  900: '#0F0A32',  // darkPurple
} as const

/**
 * Semantic aliases for common use-cases.
 */
export const SEMANTIC = {
  /** Dark brand color = darkPurple */
  dark: BASE_COLORS.darkPurple,
  /** Main vibrant brand color = mainPurple */
  main: BASE_COLORS.mainPurple,
  /** Light brand color = lightPurple */
  light: BASE_COLORS.lightPurple,
  /** Theme color for PWA / browser chrome — uses the vibrant main color */
  themeColor: BASE_COLORS.mainPurple,
  /** Page background */
  background: '#FFFFFF',
  /** Default text */
  foreground: '#1F2937',
} as const

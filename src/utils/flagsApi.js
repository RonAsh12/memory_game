import { shuffleArray } from './shuffle'

const COUNTRY_CODES_API_URL = 'https://flagcdn.com/en/codes.json'
const REGIONAL_INDICATOR_OFFSET = 127397

function codeToFlagEmoji(countryCode) {
  return countryCode
    .toUpperCase()
    .replace(/./g, (letter) => String.fromCodePoint(letter.charCodeAt(0) + REGIONAL_INDICATOR_OFFSET))
}

export async function fetchFlagValues(pairCount) {
  const response = await fetch(COUNTRY_CODES_API_URL)
  if (!response.ok) {
    throw new Error(`Flags API responded with status ${response.status}`)
  }

  const namesByCountryCode = await response.json()
  const countryCodes = Object.keys(namesByCountryCode).filter((code) => code.length === 2)

  if (countryCodes.length < pairCount) {
    throw new Error('Flags API did not return enough countries for the requested board size')
  }

  return shuffleArray(countryCodes).slice(0, pairCount).map(codeToFlagEmoji)
}

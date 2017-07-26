import {i18n, formatInternational} from 'phoneformat.js';
import autobind from 'autobind-decorator';

const countryCodes = i18n.phonenumbers.metadata.countryCodeToRegionCodeMap;
const regionCodes = {};
for (const code in countryCodes) {
  if (countryCodes.hasOwnProperty(code)) {
    countryCodes[code].forEach(country => (regionCodes[country.toUpperCase()] = code));
  }
}

export function format(phone) {
  return formatInternational('', `+${phone}`);
}

export function getRegionCode(countryCode) {
  if (!countryCode) {
    return null;
  }
  return regionCodes[countryCode.toUpperCase()] ? `+${regionCodes[countryCode.toUpperCase()]}` : null;
}

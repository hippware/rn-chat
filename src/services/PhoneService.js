import {i18n, formatInternational} from 'phoneformat.js';

const countryCodes = i18n.phonenumbers.metadata.countryCodeToRegionCodeMap;
let regionCodes = {};
for (let code in countryCodes){
    if (countryCodes.hasOwnProperty(code)){
        countryCodes[code].forEach(country=>regionCodes[country.toUpperCase()] = code);
    }
}
class PhoneService {
    formatInternational(phone){
        return formatInternational('', '+'+phone);
    }

    getRegionCode(countryCode){
        if (!countryCode){
            return null;
        }
        return regionCodes[countryCode.toUpperCase()] ? "+"+regionCodes[countryCode.toUpperCase()] : null;
    }

}

export default new PhoneService();
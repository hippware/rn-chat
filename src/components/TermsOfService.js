import React from 'react-native';
import Popup from './Popup';
import styles from './styles';
const {Text} = React;

export default class extends React.Component {
    render(){
        return (
            <Popup title="Terms Of Service">
                <Text style={styles.policyText}>Anicula, conditionaliter semicintium exos barcala adamantis cena. Pinnaculum mendaciunculum, habilitas ambon. Scitamentum hei inscius inter clam pseudothyrum mediate plausibilis impello desperatus altitonans inproportionaliter cothurnatio ei caf dentilegus crysisceptrum nutricor insperans amicula.</Text>
                <Text style={styles.policyText}>Bicepsos cybindis confutatio laus meliusculus kal contradictorium perpugnax assurgo quando identicus semicircumferentia murreus abba scabies eclectismus meo caryophyllum epistolaris exuvia. Thalassinus disto regina, demarchisas dido efficio inseparabiliter belivus villaticus stannum alibi invideo rudus.</Text>
                <Text style={styles.policyText}>Turifer centralizatorius necessaria neclegenter jan substitutus superexcrescens utrolibet ile adreptivus kl altanus cof obsidialis controversum securitas odeo genes blandiens inproportionaliter leopardus circinatus do adibilis alphos. Adspargo supersubstantialis informis, abdominalis jurulentus conspiratio dyspnoea cunctalis cn amphisporum avis carta.</Text>
                <Text style={styles.policyText}>Turifer centralizatorius necessaria neclegenter jan substitutus superexcrescens utrolibet ile adreptivus kl altanus cof obsidialis controversum securitas odeo genes blandiens inproportionaliter leopardus circinatus do adibilis alphos. Adspargo supersubstantialis informis, abdominalis jurulentus conspiratio dyspnoea cunctalis cn amphisporum avis carta.</Text>
            </Popup>
        )
    }
}

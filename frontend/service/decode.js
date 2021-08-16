/*Import de vue jwt decode permettant de décoder les tokens jwt*/
import VueJwtDecode from 'vue-jwt-decode'

export default function(token) {

    return VueJwtDecode.decode(token);
    
}
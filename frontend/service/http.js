import axios from 'axios'

/*Fonction qui contient l'instance réutilisable dans le fichier forum */
export default function(){

  const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 2000
  });
/* Récupère le token dans le localstorage et l'envoie au backend*/
  instance.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;

  return instance;

}
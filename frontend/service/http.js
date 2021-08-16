/* Import d'axios permettant de créer des requêtes HTTP et réaliser les opération CRUD*/
import axios from 'axios'


export default function(){

  const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 2000
  });
/* Récupère le token dans le localstorage et l'envoie au backend*/
  instance.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;

  return instance;

}
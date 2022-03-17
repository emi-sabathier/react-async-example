import './App.css';
import React, {useState} from 'react';
import {useEffect} from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState({}); // on va recevoir de l'API une promesse contenant un objet avec les datas

  // async: c'est une fonction asynchrone, qui n'empêche pas tout le code de l'app de s'éxecuter
  const fetchData = async () => {
    try {
      /* await: await indique qu'on renvoie une promesse. On "attend" le résultat de l'API github
      Si l'api est down, ou autre, on passe dans le catch
      */
      const response = await axios.get('https://api.github.com/search/users?q=emi-sabathier');
      setData(response.data);
      console.log('Voilà les datas renvoyées: ', response)
    } catch (error) {
      /* Une erreur sera renvoyée ici s'il y en a une
      Remplace https://api.github.com/search/users?q=emi-sabathier par https://api.github.com/search/urlquiexistepas dans le try
       */
      console.log("Détails de l'erreur venant de l'API: ", error)
    }
  }

  /* useEffect se lance après le premier rendu (<div>...</div>)
    Quand on fait appel à une API, on met la fonction qui appelle l'api dans un useEffect (ou componentDidMount() quand on est en react class)
   */
  useEffect(()=>{
      fetchData();
  },[])

  return (
    <div className="App">
      <p>ouvre la console</p>
      <p>Username: {data.items[0].login}</p>
      <p>Url: {data.items[0].url}</p>
    </div>
  );
}

export default App;

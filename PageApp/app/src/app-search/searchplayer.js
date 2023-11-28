import React, { useState } from "react";
import styles from './searchplayer.module.css'

function Searchplayer() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleFetchButtonClick = () => {
    const valor_pesquisa = parseInt(searchTerm, 10)

    if (isNaN(valor_pesquisa)) {
      fetch(`http://localhost:8000/playername/${searchTerm}`)
        .then(response => response.json())
        .then(data => {
          searchByName(data);
        })
        .catch(error => {
          console.error(error);
        });

    } else {
        fetch(`http://localhost:8000/player/${valor_pesquisa}`)
        .then(response => response.json())
        .then(data => {
          searchByID(data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const searchByName = (players) => {
      const container = document.getElementById('displayplayers');
      var elementToRemove = document.getElementById("pesquisado");
      if (elementToRemove !== null){
          var parentElement = document.getElementById("displayplayers");
          parentElement.removeChild(elementToRemove);
      }
      var elementToRemove = document.getElementById("pesquisadolista");
      if (elementToRemove !== null){
          var parentElement = document.getElementById("displayplayers");
          parentElement.removeChild(elementToRemove);
      }

      const lista = document.createElement('ul')
      lista.id = 'pesquisadolista'
      lista.className = styles.pesquisadolista


      for (let i = 0; i < players.length; i++){

          const litem = document.createElement('li')
          litem.classList.add('box');

          const strong2 = document.createElement('strong');
          strong2.textContent = ' ID: ';
          litem.appendChild(strong2);
          const value2 = document.createTextNode(players[i].idplayer + ' ');
          litem.appendChild(value2);

          const strong = document.createElement('strong');
          strong.textContent = 'Name: ';
          litem.appendChild(strong);
          const value = document.createTextNode(players[i].name);
          litem.appendChild(value);

          lista.appendChild(litem);
      }
      container.appendChild(lista)

  };


  const searchByID = (player) => {
      const container = document.getElementById('displayplayers');

      var elementToRemove = document.getElementById("pesquisado");
      if (elementToRemove !== null){
          var parentElement = document.getElementById("displayplayers");
          parentElement.removeChild(elementToRemove);
      }
      var elementToRemove = document.getElementById("pesquisadolista");
      if (elementToRemove !== null){
          var parentElement = document.getElementById("displayplayers");
          parentElement.removeChild(elementToRemove);
      }



      const caixa = document.createElement('div')
      caixa.id = 'pesquisado'
      caixa.className = styles.pesquisado
      for (const key in player) {
        const box = document.createElement('div');
        box.classList.add('box');
        const strong = document.createElement('strong');
        strong.textContent = key + ': ';
        box.appendChild(strong);
        const value = document.createTextNode(player[key]);
        box.appendChild(value);
        caixa.appendChild(box);
      }
      container.appendChild(caixa)

  };

  return (
    <div>
      <div className={styles.searchbox}>
          <div className={styles.searchtitle}>
              <h1>Search for a Player</h1>
          </div>
          <div className={styles.searchoptions} >
              <div className={styles.searchoptionsinput}>
                  <input
                    type="search"
                    id="searchInput"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
              </div>
              <div className={styles.searchoptionsbutton}>
              <button id="fetchButton" onClick={handleFetchButtonClick}>
                Search
              </button>
              </div>
          </div>
      </div>
      <div id="displayplayers" className={styles.displayplayers}>
      </div>
    </div>
  );
}

export default Searchplayer;

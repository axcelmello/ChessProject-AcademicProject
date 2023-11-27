import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import CadastroPlayer from './app-cad/cadastroplayer'
import Searchplayer from "./app-search/searchplayer";
import Games from "./app-games/games";

const root = ReactDOM.createRoot(document.getElementById('core'));
root.render(
  <React.StrictMode>
      <Router>
            <Routes>
                <Route path="/" element= {< Searchplayer />}/>
                <Route path="/cadastroplayer" element= {< CadastroPlayer />}/>
                <Route path="/lastgames" element={< Games />}/>
            </Routes>
      </Router>
  </React.StrictMode>
);

reportWebVitals();

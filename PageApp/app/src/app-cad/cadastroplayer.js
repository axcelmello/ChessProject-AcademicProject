import React, { useState } from "react";
import styles from './cadastroplayer.module.css'

function CadastroPlayer () {

        const submitForm = () => {

        }

        return (
            <div>
                <h1>FORMULÁRIO CADASTRO NOVO PLAYER</h1>

                <h2>Create a Player</h2>

                <form id="playerForm">
                    <label htmlFor="idplayer">ID Player:</label>
                    <input type="text" id="idplayer" name="idplayer" />

                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name"/>

                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" />

                    <label htmlFor="country">Country:</label>
                    <input type="text" id="country" name="country" />

                    <label htmlFor="idtitle">ID Title:</label>
                    <input type="text" id="idtitle" name="idtitle" />

                    <label htmlFor="idstatus">ID Status:</label>
                    <input type="text" id="idstatus" name="idstatus" />

                    <label htmlFor="rating">Rating:</label>
                    <input type="text" id="rating" name="rating" />

                    <button type="button" onClick={submitForm()}>Cadastrar Jogador</button>
                </form>

                </div>
        );
    }
export default CadastroPlayer;
/*

 */
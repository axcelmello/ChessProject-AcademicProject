import React, {useState} from "react";
import styles from './cadastroplayer.module.css'

function CadastroPlayer() {

    const [formData, setFormData] = useState({
        idplayer: '',
        name: '',
        username: '',
        country: '',
        idtitle: '',
        idstatus: '',
        rating: '',
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const submitForm = (event) => {
        event.preventDefault();
        // Handle form submission with formData
        console.log('Form submitted:', formData);
        // Optionally reset form data

        const data = [];
        data.push(formData);

        fetch('http://localhost:8000/newplayer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (


        <div>

            <h1>FORMULÁRIO CADASTRO NOVO PLAYER</h1>

            <h2>Create a Player</h2>

            <form id="playerForm" onSubmit={submitForm}>
                {Object.entries(formData).map(([key, value]) => (
                    <div key={key}>
                        <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                        <input type="text" id={key} name={key} value={value} onChange={handleChange}/>
                    </div>
                ))}
                <button type="submit">Cadastrar Jogador</button>
            </form>

        </div>
    );
}

export default CadastroPlayer;
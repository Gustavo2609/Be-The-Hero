import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import logoimg from '../../assets/logo.svg';
import api from '../../services/api';

import './style.css'

export default function NewIncident(){

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const history = useHistory();
    const ongId = localStorage.getItem('ongId');

    async function handlenewincident(e){
        e.preventDefault();

        const data = {
            title, 
            description,
            value
        };
try{
await api.post('incidents', data ,{
    headers: {
        Authorization: ongId,
    }
})

history.push('/profile');
}catch(err){
    alert('Erro ao cadastrar caso, tente novamente mais tarde');
}
    }

    return(
<div className="new-incidents">
    <div className="content">
        <section>
            
            <img src={logoimg} alt="Be the hero"/>

            <h1> Cadastro novo caso</h1>
            <p>Descreva o caso detalhadamente para encontrar o herói para resolver isso</p>

                 <Link className="back-link" to="/profile">
                      <FiArrowLeft size={16} color="#E02041" />
                      Voltar para Home
                  </Link>

                </section>
                <form onSubmit={handlenewincident}>

                <input 

                autoComplete="none" 
                placeholder="Titulo do caso"
                value={title}
                onChange={e => setTitle(e.target.value)}
                />

                <textarea 

                 autoComplete="none"
                 placeholder="Descrição"
                 value={description}
                 onChange ={e => setDescription(e.target.value)}

                 />
               
                <input 

                 autoComplete="none"
                 placeholder="Valor em reais"
                 value={value}
                 onChange={e => setValue(e.target.value)}
                 
                 />
                

        

            <button className="button" type="submit">Cadastrar</button>

        </form>
    </div>
</div>
);
}
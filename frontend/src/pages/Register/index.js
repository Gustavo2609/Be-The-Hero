import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft} from 'react-icons/fi';
import './style.css';
import logoimg from '../../assets/logo.svg';
import api from '../../services/api';

export default function Register(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const History = useHistory();

    async function hendleRegister(e){
    e.preventDefault();

    const data = {
        name,
        email,
        whatsapp,
        city,
        uf
    }
    try{

        const response = await api.post('ongs', data);
        alert(`Seu id de acesso ${response.data.id}`);
        History.push('/');

} catch(err){

    alert('Erro do cadastro tente novamente');

  }
}
    return (
<div className="register_cont">
    <div className="content">
        <section>
            
            <img src={logoimg} alt="Be the hero"/>

            <h1> Cadastro </h1>
            <p> Make your login right now</p>

                 <Link className="back-link" to="/">
                      <FiArrowLeft size={16} color="#E02041" />
                      Não tenho cadastro
                  </Link>

                </section>
                <form onSubmit={hendleRegister}>

                <input
                 autoComplete="none"
                  placeholder="Nome da ong"
                  value={name}
                  onChange={e => setName(e.target.value) }//area function
                 />

                <input
                 autoComplete="none"
                  placeholder="E-mail" 
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                 />

                <input 
                autoComplete="none" 
                placeholder="Whatsapp"
                value={whatsapp}
                onChange={e => setWhatsapp(e.target.value)}
                />
                
                <div className="input-group">


                   <input 
                   autoComplete="none" 
                   placeholder="Cidade"
                   value={city}
                   onChange={e => setCity(e.target.value)}
                   /> 

                   <input  
                   maxLength="2" 
                   autoComplete="none" 
                   placeholder="Uf" 
                   style={{ width: 80 }}
                   value={uf}
                   onChange={e => setUf(e.target.value)}
                   /> 

            </div>

            <button className="button" type="submit">Cadastrar</button>

        </form>
    </div>
</div>
    );
}
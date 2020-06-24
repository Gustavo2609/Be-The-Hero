import React, {useState, useEffect} from 'react';
import { Link, useHistory} from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import LogoImg from '../../assets/logo.svg';
import api from '../../services/api';
import './style.css';

export default function Profile(){
    const [incidents, setIncidents] = useState([]);
        const history = useHistory();
        const ongId = localStorage.getItem('ongId');
        const ongName = localStorage.getItem('ongName');
    useEffect(() => {
            api.get('profile', {
                headers: {
                    Authorization: ongId,
                }
            }).then(response => {
                setIncidents(response.data);
            })
            }, [ongId]);//fluxos de componentes 
async function handleIncident(id){
    try{
        await api.delete(`incidents/${id}`, {
            headers: {
                Authorization: ongId,
            }
        });
        setIncidents(incidents.filter(incident => incident.id !== id));
    }catch(err){
        alert('Erro ao deletar caso, tente novament.')
    }
}

function handleLogout(){
    localStorage.clear();
    history.push('/');
}
    return(

    <div className="profile-content">

        <header>

    <img src={LogoImg} alt="Be the hero"/>

    <span>Bem vinda, {ongName} </span>

    <Link className="button" to="incidents/new"> Cadastrar novo caso</Link>

           <button onClick={handleLogout} type="button"> 

      <FiPower size={18} color="#E02041"/>

        </button>

        </header>
        <h1> Casos cadastrados </h1>

        <ul>
       
        {incidents.map(incident => (
//ajuda o react a encontrar um valor unico para diferenciar os elementos
               <li key={incident.id}>

               <strong> Caso:</strong>
                <p> {incident.title} </p>

               <strong> Descrição</strong>
                <p> {incident.description} </p>

               <strong> Valor:</strong>
                <p> {Intl.NumberFormat('pt-BR', { style: 'currency', currency:'BRL'}).format(incident.value)} </p>

               <button onClick={

                   () => handleIncident(incident.id)
                   
                   } type="button">
                   
                   <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
           </li>  
      ))}
        </ul>
    </div>
    );
}
import React, {useState, useEffect} from 'react';
import { Feather } from '@expo/vector-icons';
import { View, FlatList, Image, Text, TouchableOpacity} from 'react-native';
//dentro do mobile tem densidade de pixels diferentes
import logoImg from '../../assets/logo.png';
import style from './style';

import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

export default function Incidents(){
    const [incidents, setIncidents ] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigaton = useNavigation();
    
    function navigationToDetail(incident){
        navigaton.navigate('Details', { incident });
    }

    async function loadoincidents(){
        if(loading) {
            return;
        }
        if(total > 0 && incidents.length === total){
                return;
        }
        setLoading(true);
        const res = await api.get('incidents', {
            params:  { page } 
        });
        
        setIncidents([...incidents, ...res.data]);
        setTotal(res.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }
    
    useEffect(() =>{
        loadoincidents(); 
}, []);
    return(
        <View style={style.container}>
            <View style={style.header}>

                <Image source={logoImg} />
                <Text style={style.headerText}>
    Total de <Text style={style.headerTextBold}> {total} casos </Text>
                </Text>                   
        </View>

            <Text style={style.title}>Bem vindo</Text>
            <Text style={style.description}>Escolha um dos casos abaixo e salve o dia</Text>
        
        <FlatList style={style.incidentList}
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={ true }
        onEndReached={loadoincidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
    <View style={style.incident}> 
            <Text style={style.incidentProperty}> ONG: </Text>
            <Text style={style.incidentValue}>{incident.name} </Text>

            <Text style={style.incidentProperty}> CASO: </Text>
 
            <Text style={style.incidentValue}>{incident.title} </Text>

            <Text style={style.incidentProperty}> Valor: </Text>
            <Text style={style.incidentValue}>{Intl.NumberFormat('pt-BR', {
                style: 'currency',
            currency: 'BRL'
        }).format(incident.value)}
    </Text>
            <TouchableOpacity  style={style.detailsButton} 
            onPress={() => navigationToDetail(incident)}                
            >
            <Text style={style.detailsButtonText}>Ver mais detalhes </Text>
            <Feather  name="arrow-right" size={16} color="#E02041"/>
             </TouchableOpacity>
        </View>

        )}
        />
    </View>
    );
}
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute} from '@react-navigation/native';
import  * as MaillComposer  from "expo-mail-composer";
import { View, Text, TouchableOpacity, Image, Linking} from 'react-native';
import style from './style'; 
import logoImg from '../../assets/logo.png';

//deep link todo aplicativo no celular tem um deep link

export default function Details(){
    //se procupar com a orderm lógica de alocação de dados
    const navigation = useNavigation();
    const route = useRoute();
    const incident = route.params.incident;
    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso: ${incident.title} com o valor de ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)} `; 
  

    

    function navigationBack (){
        navigation.goBack();
  
    }
    function sendEmail(){
        MaillComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        })
    }
    function sendZap(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }
    return(
        <View style={style.container}>

        <View style={style.header}>
            <Image source={logoImg} />
            <TouchableOpacity onPress={navigationBack}>
            <Feather name="arrow-left" size={28} color="#E02041"/>
            </TouchableOpacity>
        </View>        

            <View style={style.incident} >
            <Text style={[style.incidentProperty,{marginTop: 0}]}> ONG: </Text>
            <Text style={style.incidentValue}>{incident.name} de {incident.city}/{incident.uf} </Text>

            <Text style={style.incidentProperty}> CASO: </Text>
 
            <Text style={style.incidentValue}>{incident.title} </Text>

            <Text style={style.incidentProperty}> Valor: </Text>
            <Text style={style.incidentValue}>{Intl.NumberFormat('pt-BR', {
                style: 'currency',
            currency: 'BRL'
        }).format(incident.value)}
    </Text>
            </View>
            <View style={style.contactBox}>
                <Text style={style.heroTitle}>Salve o dia</Text>
                <Text style={style.heroTitle}>Seja o herói desse caso.</Text>

                <Text style={style.heroDescription}> Entre em contato: </Text>

                <View style={style.actions}>
                    <TouchableOpacity style={style.action} onPress={sendZap}>
                        <Text style={style.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.action} onPress={sendEmail}>
                        <Text style={style.actionText}>Email</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
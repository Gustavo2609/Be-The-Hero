import React from 'react';
//onbigatorio estar no arquivo
//nunca manipular o state direto 
//todos os componente sempre com letra maiuscula
//desistruração     
export default function Header({ children }){
    return (
        <header>
            <h1> {children} </h1>
        </header>
    );
}
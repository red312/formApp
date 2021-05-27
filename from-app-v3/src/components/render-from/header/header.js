import React, { Component } from 'react';
import styled from 'styled-components';
import HeaderImg from './public/header.png';

const HeaderBlock = styled.img`
    width: 100%;
    /* position: fixed; */
    top: 0px;
    left: 0px;
    right: 0px;
`;



export default class Header extends Component{
    render(){
        return(
            <>
                <HeaderBlock src={HeaderImg}/>
            </>
        );
    }
}
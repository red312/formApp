import React, { Component } from 'react';
import styled from 'styled-components';
import FooterBlockImg from './public/footer.png';

const FooterBlock = styled.img`
    /* position: fixed; */
    bottom: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
`;


export default class Footer extends Component{
    render(){
        return(
            <>
                <FooterBlock src={FooterBlockImg}/>
            </>
        );
    }
}
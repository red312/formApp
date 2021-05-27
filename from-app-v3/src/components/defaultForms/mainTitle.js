import React from 'react';
import styled from 'styled-components';

const Field = styled.div`
    display: flex;
    width: 100%;
    height: 30px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 26px;
    line-height: 30px;
    color: #353535;
    justify-content: center;
`;


export default function MainTitle({field}){
    return(
        <Field>
            {field.name}
        </Field>
    );
}
import React from 'react';
import styled from 'styled-components';

const Field = styled.div`
    display: flex;
    width: 300px;
    height: 23px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;
    color: #353535;
    justify-content: start;
`;


export default function SubTitle({field}){
    return(
        <Field position={field.content[0]}>
            {field.name}
        </Field>
    );
}
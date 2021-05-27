import React from 'react';
import styled from 'styled-components';

const Field = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    width: 148px;
    height: 24px;
    left: 0px;
    top: 199px;
    margin-top: 24px;
`;


export default function ClassicCheckBox({field, changeFieldValue, blockline, line, blockId}){
    const changeValue = () => {
        changeFieldValue(line, blockId, blockline, field.id, !field.value);
    };
    return(
        <>
            <Field onClick={changeValue}>
                <input type='checkbox'/>
                {field.name}
            </Field>
        </>
    );
}

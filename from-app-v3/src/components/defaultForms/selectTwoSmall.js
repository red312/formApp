import React from 'react';
import styled from 'styled-components';

const Field = styled.div`
    display: flex;
    cursor: pointer;
    margin-top: 24px;
    width: 100%;
    max-width: 332px;
    height: 52px;
`;

const Option = styled.div`
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-feature-settings: 'cpsp' on;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 15px 24px;
    position: static;
    width: 50%;
    background: ${props => props.checked ? '#FCAF17' : '#F7F7F7'};
    color: ${props => props.checked ? '#353535' : '#868686'};
    border-radius: 4px;
`;
export default function SelectTwoSmall({field, changeFieldValue, blockline, line, blockId}){
    const changeValue = (option) => {
        changeFieldValue(line, blockId, blockline, field.id, option);
    };
    return(
        <Field>
            {field.content.map((option, index) => {
                return(
                    <React.Fragment key={index}>
                        <Option checked={option === field.value} onClick={() => changeValue(option)}>
                            {option}
                        </Option>
                    </React.Fragment>
                );
            })}
        </Field>
    );
}

import React from 'react';
import styled from 'styled-components';



const Field = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 15px;
    padding-right: 10px;
    width: 100%;
    max-width: 332px;
    height: 52px;
    border: 1px solid #FCAF17;
    box-sizing: border-box;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 24px;
`;


const MainText = styled.div`
    width: 100%;
    height: 20px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #353535;
`;
const SecText = styled.div`
    width: 100%;
    height: 16px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    color: #868686;
`;

const Img = styled.svg`
    width: 30px;
    height: 26.17px;
    fill: ${props => props.checked ? '#FCAF17' : null};
    color: ${props => props.checked ? '#FCAF17' : '#D2D2D2'};
`;

const Text = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 15px;
`;

export default function CheckBoxArrow({field, changeFieldValue, blockline, line, blockId}){
    const changeValue = () => {
        changeFieldValue(line, blockId, blockline, field.id, !field.value);
    };
    return(
        <>
            <Field onClick={changeValue}>
                <Img width="30" height="27" viewBox="0 0 30 27" fill="none" xmlns="http://www.w3.org/2000/svg" checked={field.value}>
                    <path d="M11.1258 20.3425L10.7996 20.7214L11.1258 20.3425L0.813101 11.4633C0.813095 11.4633 0.813089 11.4633 0.813084 11.4633C0.395868 11.104 0.395417 10.4587 0.813065 10.099C0.813078 10.099 0.81309 10.099 0.813102 10.099L11.1258 1.22071L11.1258 1.22069C11.7116 0.71633 12.625 1.13269 12.625 1.90284V6.57919V7.07351L13.1193 7.07915C17.8151 7.13275 21.93 7.63169 24.8598 9.16784C26.3135 9.93005 27.4651 10.9425 28.2567 12.2781C29.049 13.6147 29.5 15.3074 29.5 17.4596C29.5 20.8536 27.2887 24.271 24.8237 26.0585L25.1172 26.4633L24.8237 26.0585C24.6114 26.2125 24.3534 26.1984 24.1572 26.0705C23.9664 25.9461 23.8789 25.7484 23.9492 25.5246L23.4721 25.3749L23.9492 25.5246C25.2915 21.2447 25.0499 18.2989 23.0406 16.4538C22.0607 15.5539 20.7087 14.968 19.0589 14.5961C17.4071 14.2237 15.4196 14.0576 13.1322 14.0247L12.625 14.0175V14.5247V19.6603C12.625 20.4312 11.7114 20.8466 11.1258 20.3425Z" stroke="currentColor"/>
                </Img>

                <Text>
                    <MainText>{field.content[0]}</MainText>
                    <SecText>{field.content[1]}</SecText>
                </Text>
            </Field>
        </>
    );
}

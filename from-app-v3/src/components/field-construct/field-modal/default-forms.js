import React from 'react';
import CheckBoxArrow from '../../defaultForms/checkBoxArrow';
import InputWithName from '../../defaultForms/inputWithName';
import InputWithoutName from '../../defaultForms/inputWithoutName';
import MainTitle from '../../defaultForms/mainTitle';
import SelectTwoSmall from '../../defaultForms/selectTwoSmall';
import SubTitle from '../../defaultForms/subTitle';
import ClassicCheckBox from '../../defaultForms/classicCheckBox';



export default function DefaultForms({field, changeFieldValue, blockId, blockline, line}){
    let content;
    switch(field.style){
    case('INPUT'):
        switch(field.subStyle){
        case('NAME'):
            content = <div>
                <InputWithName field={{...field}} changeFieldValue={changeFieldValue}
                    blockId={blockId} blockline={blockline}
                    line={line}/>
            </div>;
            break;
        case('NONAME'):
            content = <div>
                <InputWithoutName field={{...field}} changeFieldValue={changeFieldValue}
                    blockId={blockId} blockline={blockline}
                    line={line}/>
            </div>;
            break;
        default:
            break;
        }
        break;
    case('SELECT'):
        switch(field.subStyle){
        case('TWOSMALL'):
            content= <div>
                <SelectTwoSmall field={{...field}} changeFieldValue={changeFieldValue}
                    blockId={blockId} blockline={blockline}
                    line={line}/>
            </div>;
            break;
        default:
            break;
        }
        break;
    case('TITLE'):
        switch(field.subStyle){
        case('MAIN'):
            content = <div>
                <MainTitle field={{...field}}/>
            </div>;
            break;
        case('SUB'):
            content = <div>
                <SubTitle field={field}/>
            </div>;
            break;
        default:
            break;
        }
        break;
    case('CHECKBOX'):
        switch(field.subStyle){
        case('ARROW'):
            content = <div>
                <CheckBoxArrow field={{...field}} changeFieldValue={changeFieldValue}
                    blockId={blockId} blockline={blockline}
                    line={line}/>
            </div>;
            break;
        case('CLASSIC'):
            content = <div>
                <ClassicCheckBox field={{...field}} changeFieldValue={changeFieldValue}
                    blockId={blockId} blockline={blockline}
                    line={line}/>
            </div>;
            break;
        default:
            break;
        }
        break;
    default:
        break;
    }
    return(
        <>
            {content}
        </>
    );
}

import React, {useEffect, useState, Fragment} from 'react';
import {Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormService from '../../service/FormService';
import FieldRender from './field-render';
import RuleRender from './rule-render';
import Header from './header/header';
import Footer from './footer/footer';
import styled from 'styled-components';

const FormBlock = styled.div`
    margin-top: 144px;
    width: 100%;
    min-height: 500px;
    display:flex;
    /* justify-content: space-around; */
    align-items: center;
    flex-direction: column;
    /* padding: 40px; */
`;

const useStyles = makeStyles(() => ({
    grid: {
        width: '807px',
        marginBottom: '24px',
        // display: 'flex',
    }
}));

export default function RenderForm() {
    const classes = useStyles();
    const [blocks, setBlocks] = useState([]);
    const [allBlocks, setAllBlocks] = useState([]);
    const formService = new FormService();
    const updateForm = (form) => {
        setAllBlocks([...form.blocks]);
        setBlocks([...form.lines]);
    };
    useEffect(() => {
        formService
            .getForm(localStorage.getItem('formId'))
            .then(updateForm)
            .catch(error => alert(error));
    }, []);
    const changeFieldValue = (line, blockId, blockline, fieldId, value) => {
        setAllBlocks(prevBlocks => {
            const index = prevBlocks.findIndex(item => item.id === blockId);
            let fieldIndex, lineIndex;
            prevBlocks[index].lines.forEach((line, index) => {
                line.fields.forEach((item, fIndex) => {
                    if (item.id === fieldId){
                        lineIndex = index;
                        fieldIndex = fIndex;
                    }
                });
            });
            prevBlocks[index].lines[lineIndex].fields[fieldIndex].value = value;
            return [...prevBlocks];
        });
        setBlocks(prevBlocks => {
            const renderedline = prevBlocks.findIndex(item => item.line === line);
            const blockIndex = prevBlocks[renderedline].blocks.findIndex(item => item.id === blockId);
            if (blockIndex === -1){
                return [...prevBlocks];
            }
            const lineIndex = prevBlocks[renderedline].blocks[blockIndex].lines.findIndex(item => item.line === blockline);
            const fieldIndex= prevBlocks[renderedline].blocks[blockIndex].lines[lineIndex].fields.findIndex(item => item.id === fieldId);
            prevBlocks[renderedline].blocks[blockIndex].lines[lineIndex].fields[fieldIndex].value = value;
            return [...prevBlocks];
        });
    };
    return (
        <Fragment>
            <Header/>
            <FormBlock>
                {blocks.map(line => {
                    return(
                        <Grid spacing={8} key={line.line} container className={classes.grid}>
                            {line.blocks.map(block => {
                                const content = block.blockType === 'fields' ? <FieldRender line={line.line} block={block} changeFieldValue={changeFieldValue}/> : <RuleRender blocks={allBlocks} rule={block} line={line.line}
                                    changeFieldValue={changeFieldValue}/>;
                                return(
                                    <Grid item xs key={block.id}>
                                        {content}
                                    </Grid>
                                );
                            })}
                        </Grid>
                    );
                })}
            </FormBlock>
            <Footer/>
        </Fragment>
    );
}

import React, { useState, useEffect } from 'react';
import BlocksConstruct from '../field-construct/blocks-construct';
import styled from 'styled-components';
import RuleConstruct from '../rule-construct/rule-construct';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import FormConstruct from '../form-construct/form-construct';
import RenderForm from '../render-from/render-form';
import { Button } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FormService from '../../service/FormService';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    button: {
        color: '#FCAF17',
        // marginLeft: '47%',
    },
}));

const MainDiv = styled.div`
  display: flex;
`;

const TopBlock = styled.div`
    border-bottom: 1px solid black;
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
`;
const BlockConstructDiv = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const RulesDiv = styled.div`
  width: 50%;
  border-left: 1px solid black;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default function App() {
    const classes = useStyles();
    const [blocks, setBlocks] = useState([]);
    const [rules, setRules] = useState([]);
    const [forms, setForms] = useState([]);
    const [formId, setFormId] = useState('');
    const updateBlocks = (newBlocks) => {
        setBlocks(newBlocks);
    };
    const updateRules = (newRules) => {
        setRules(newRules);
    };
    const formService = new FormService();
    const updateFormList = (forms) => {
        const formsInfo = forms.map(item => {
            return {id: item.id, name: item.name};
        });
        setForms(formsInfo);
    };
    const updateForms = () => {
        formService
            .getAllForms()
            .then(updateFormList);
    };
    useEffect(() => {
        updateForms();
    }, []);
    const updateForm = (form) => {
        setBlocks(form.blocks);
        setRules(prevRules => {
            let rules = [];
            form.lines.forEach(line => {
                const blocks = line.blocks.map(block => {
                    if (block.blockType === 'rule')
                        return block;
                });
                rules = [...rules, ...blocks];
            });
            rules = rules.filter(rule => rule !== undefined);
            if (rules.length === 0)
                return [...prevRules];
            else {
                prevRules = rules;
                return [...prevRules];
            }
        });
    };
    const selectForm = (event) => {
        setFormId(event.target.value);
        formService
            .getForm(event.target.value)
            .then(updateForm);
    };
    const renderFunc = () => {
        localStorage.clear();
        localStorage.setItem('formId', formId);
    };
    return (
        <Router>
            <Route path="/" exact>
                <TopBlock>
                    <Link to='/moveBlocks'>Сформировать форму</Link>
                    <select onChange={selectForm}>
                        {forms.map(form => {
                            return(
                                <option key={form.id} value={form.id}>{form.name}</option>
                            );
                        })}
                    </select>
                    <Button
                        variant="outlined"
                        color="default"
                        className={classes.button}
                        onClick={renderFunc}
                        startIcon={<CloudUploadIcon />}
                    >
          Рендер
                    </Button>
                </TopBlock>
                <MainDiv>
                    <BlockConstructDiv>
                        <BlocksConstruct getBlocks={blocks} updateBlocks={updateBlocks} />
                    </BlockConstructDiv>
                    <RulesDiv>
                        <RuleConstruct getRules={rules} blocks={blocks} updateRules={updateRules} />
                    </RulesDiv>
                </MainDiv>
            </Route>
            <Route path="/moveBlocks">
                <Link to='/render'>Отрисовать полученную форму</Link>
                <FormConstruct getBlocks={blocks} getRules={rules}/>
            </Route>
            <Route path="/render">
                <Link to='/'>Создать блоки</Link>
                <Link to='/moveBlocks'>Переделать форму</Link>
                <RenderForm/>
            </Route>
        </Router>
    );
}

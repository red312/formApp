import React, { Fragment, useState, useEffect } from 'react';
import nextId from 'react-id-generator';
import BlockModal from './block-modal';
import styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';
import {TextField, Button} from '@material-ui/core';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    delete: {
        fontSize: 40,
        color: '#FCAF17'
    },
    button: {
        color: '#FCAF17'
    },
    input: {
        palette: {
            primary: '#FCAF17'
        }
    }
}));

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#FCAF17',
            secondary: '#FCAF17'
        },
    },
});
const Block = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    padding: 10px;
    margin-top: 20px;
    width: 400px;
    height: 30px;
    border: 1px solid black;
`;

const BlockName = styled.div`
    cursor: pointer;
    width: 100%;
`;

const Form = styled.form`
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 20px;
    margin-top: 20px;
    padding-bottom: 20px;
    width: 100%;
    height: 70px;
    border-bottom: 1px solid black;
`;

const Blocks = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 20px;
    margin-top: 30px;
    min-height: 100px;
`;

export default function BlocksConstruct({updateBlocks, getBlocks}) {
    const classes = useStyles();
    const [blocks, setBlocks] = useState([]);
    const [name, setName] = useState('');
    const [index, setIndex] = useState(null);
    const [isOpen, setOpen] = useState(false);
    useEffect(() => {
        setBlocks(getBlocks);
    }, [getBlocks]);
    const createBlock = (event) => {
        event.preventDefault();
        setBlocks(prevBlocks => {
            prevBlocks.push({id: nextId(), name: name, lines: [], blockType: 'fields'});
            return [...prevBlocks];
        });
        setName('');
        updateBlocks(blocks);
    };
    const openBlockModal = (index) => {
        setIndex(index);
        setOpen(true);
    };
    const changeBlock = (newBlock) => {
        setBlocks(prevBlocks => {
            prevBlocks.splice(index, 1, newBlock);
            return [...prevBlocks];
        });
        updateBlocks(blocks);
        setOpen(false);
        setIndex(null);
    };
    let modal;
    if (index !== null) {
        modal = <BlockModal isOpen={isOpen}
            changeBlock={changeBlock} block={blocks[index]} index={index}/>;
    }
    return (
        <Fragment>
            <Form onSubmit={createBlock}>
                <ThemeProvider theme={theme}>
                    <TextField variant='outlined' className={classes.input} label={'Имя блока'} onChange={(event) => setName(event.target.value)} value={name}/>
                </ThemeProvider>
                <Button variant="outlined"
                    className={classes.button} onClick={createBlock}>Создать блок</Button>

            </Form>
            <Blocks>
                {blocks.map((block, index) => {
                    return(
                        <Fragment key={block.id} >
                            <Block>
                                <BlockName onClick={() => openBlockModal(index)}>{block.name}</BlockName>
                                <DeleteIcon className={classes.delete} onClick={() => setBlocks(prevBlocks => {
                                    prevBlocks.splice(index, 1);
                                    return [...prevBlocks];
                                })}>Удалить</DeleteIcon>
                            </Block>
                        </Fragment>
                    );
                })}
            </Blocks>
            {modal}
        </Fragment>
    );
}

import React, { Fragment } from 'react';
import DefaultForms from '../field-construct/field-modal/default-forms';
import {Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
    smallGrid: {
        width: '100%'
    }
}));

export default function FieldRender({block, changeFieldValue, line}) {
    const classes = useStyles();
    return (
        <Fragment>
            {block.lines.map(blockline => {
                return(
                    <Grid spacing={2} container className={classes.smallGrid} key={blockline.line}>
                        {blockline.fields.map(field => {
                            return(

                                <Grid item xs key={field.id}>
                                    <DefaultForms field={field}
                                        changeFieldValue={changeFieldValue}
                                        blockId={block.id} blockline={blockline.line} line={line}/>
                                </Grid>

                            );
                        })}
                    </Grid>
                );
            })}
        </Fragment>
    );
}

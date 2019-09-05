import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  
export default function OverlayChooser({ processors, value, onChange }) {
    const classes = useStyles();
    const processorOptions = processors.map((processor) => {
        return (
            <option key={processor.name} value={processor.name}>
                {processor.name}
            </option>
        );
    });

    return (
        <FormControl className={classes.formControl}>
            <InputLabel>Processor</InputLabel>
            <Select
                native
                value={value}
                onChange={onChange}
                >
            <option value="" />
            {processorOptions}
            </Select>
      </FormControl>
    );
};
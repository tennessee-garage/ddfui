import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { default as MaterialSlider } from '@material-ui/core/Slider';

const BaseSlider = withStyles({
    root: {
      color: '#52af77',
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus,&:hover,&$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(MaterialSlider);

const Slider = (props) => {
    const onChange = (obj, value) => props.onChange(value);
    return <BaseSlider {...props} onChange={onChange} />;
}

export default Slider;
import React from 'react';
import "./ProgressIndicator.scss";
import { Grid,TailSpin } from 'react-loader-spinner';

const ProgressIndicator = ({type}) => {
    return (<>
        {
            type===2
            ? <TailSpin 
                wrapperClass="Progress-Indicator"
                color='var(--Color1)'
                ariaLabel='loading'
            />
            : <Grid 
                wrapperClass="Progress-Indicator"
                color='var(--Color1)'
                ariaLabel='loading'
            />
        }
    </>)
}

export default ProgressIndicator

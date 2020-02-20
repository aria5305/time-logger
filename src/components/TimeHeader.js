import React, { Component }  from 'react';
import styles from './TimeHeader.module.css'

const TimeHeader = props => {
    
return (
    <div>
        <h1 className={styles.time}>
                {props.hours}:{props.minutes}
        </h1>
        <h2>{props.actualDate}</h2>
    </div>
)

}
export default React.memo(TimeHeader);

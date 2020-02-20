import React from 'react'; 
import styles from '../components/InputFieldControl.module.css'


const InputFieldControl = props => {
    return (
     
            <button className={styles.btn} onClick={props.clicked}>
                Add time yourself
            </button>
    
    )
}


export default InputFieldControl
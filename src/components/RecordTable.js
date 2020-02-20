import React from 'react' ;
import styles from './RecordTable.module.css'
import RecordLine from './RecordLine.js'

const RecordTable = (props) => {

return (
    <div className={styles.recordContainer}>
        <div>Date</div>
        <div>Starting Time</div>
        <div>Ending Time</div>
        <div>Total studying Time</div>


        <RecordLine details={props.details}></RecordLine>

     

    </div>
)
}

export default RecordTable
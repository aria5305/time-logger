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
        {/* {props.days.map( (date) => {
              props.startTime.map( (starting) => {
        return(

            <div>
                <div>
                    {date}
                </div>

                <div>
                {starting}
            </div>
          


        )})
        } */}

      
        
{/* 
        {props.endTime.map( (ending) => {
            return(
                <div>
                    {ending}
                </div>
            )})
        }

        {props.diff.map( (difference) => {
            return(
                <div>
                    {difference}
                </div>
            )})
        }        */}
   


    </div>
)
}

export default RecordTable
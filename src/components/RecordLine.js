import React,{Component, Fragment} from 'react'
import Aux from './Auxillary.js'

const RecordLine = props => {

    
    return (
     
        props.details.map((entry) => {
            return (
             
                <Aux>
                <div>{entry.day}</div>
                <div>{entry.startTime}</div>
                <div>{entry.endTime}</div>
                <div>{entry.totalTime}</div>
                </Aux>
            )
        })
    )
}
export default RecordLine;


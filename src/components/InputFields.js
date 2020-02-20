import React from 'react'



const InputFields = props => {
   
        let today = null;
      
        const getDate = () => {
            
            today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            const yyyy = today.getFullYear();

            today = yyyy+ '-' + mm + '-' + dd;
            return today

        }

        getDate();

    return (
        <div>
       
            <label>Date: </label><input type="date" defaultValue={today} id='date'></input>
            <label>Start time: </label><input type="time" name='time' id='startingTime' required></input>
            <label>End time: </label><input type="time" id='endingTime' onBlur ={props.blurred} required></input>
            <label>Total time: </label><input type="text" id='totalTime'></input>
            <br></br>
            <input id="submit" type="submit" onClick={props.clicked}/>
         
         
        </div>
    )
}

export default InputFields
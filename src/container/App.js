import React, { Component } from 'react';
import styles from './App.module.css';
import TimeHeader from '../components/TimeHeader.js';
import RecordTable from '../components/RecordTable.js';
import storage from'../components/storage.js';
import InputFieldControl from '../components/InputFieldControl.js'
import InputField from '../components/InputFields.js'


class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
        actualDate:'',
        hours:'',
        minutes:'',
        seconds:'',
        showSignOff: false,
        showSignIn:true,
        showInputField:false,
        showInputFieldControl:true,
        details:[]
    }
  }


  getTime() {
 
      const UTCOffset = '13';// NZT to UTC difference
      const currentDate = new Date();

      const actualDate = currentDate.toDateString(); 

      let hours = currentDate.getUTCHours() + parseInt(UTCOffset);
  
      if( hours >= 24 ) hours -= 24;
      if( hours < 0   ) hours += 12;
  
      hours = hours + ''; 
      if (hours.length === 1) {hours = '0' + hours}; 
  
  
      let minutes = currentDate.getUTCMinutes();
  
      minutes = minutes + '';
      if (minutes.length === 1) minutes = '0' + minutes; 
  

      this.setState({
          actualDate:actualDate,
          hours:hours,
          minutes:minutes,
      })

    

  
  }

 
   

  toggleHandler = () => {
      const SignIn = this.state.showSignIn;
      const SignOut = this.state.showSignOff;
      this.setState({ 
        showSignIn: !SignIn,
        showSignOff: !SignOut
      });

      
    }


  componentWillMount() {
      this.getTime();
      
      let storageLocal = JSON.parse(window.localStorage.getItem('data'));
      
      if(storageLocal === null ){
        storageLocal = 
        [{key:0, startTime: '19:38', endTime:'19:39',totalTime:'00:01',day:'Fri Feb 20 2020'}
        ]
      }
      

      if(storageLocal !== null){
        if(storageLocal !== [] && storage.length === 0){
            for( let i = 0; i < storageLocal.length; i++){
                storage.push(storageLocal[i]);
              
              }
            }}
  

      
      let newArray = this.state.details.slice();
      newArray = storage;     
      this.setState( 
            {details:newArray}
      )
  }




  componentDidMount() {
     setInterval( () => {
          this.getTime();
      },10000)

     

    }
  
  recordStartingTime = () => {


      const time = {
          date:this.state.actualDate,
          hour:this.state.hours,
          minute: this.state.minutes,
      }

      
      storage.push({
        key: this.state.details.length,
          startTime:time.hour + ':' + time.minute,
          endTime:'',
          totalTime:'',
          day:this.state.actualDate})
    
        let newArray = this.state.details.slice();
        newArray = storage;     
        this.setState( 
              {details:newArray}
        )
    
      }

  


  recordEndingTime = () => {
      
      const time = {
        hour:this.state.hours,
        minute: this.state.minutes,
      }
  
      
        this.setState( 
          
          (prevState) => ({
          details:prevState.details.map(
            el => el.key === this.state.details[this.state.details.length - 1].key ? 
            {...el, endTime:time.hour + ':' + time.minute}  : el)
          
          }), () => {
            
          const a = this.state.details[this.state.details.length -1].startTime.split(':');
          const b =  this.state.details[this.state.details.length -1].endTime.split(':');

          let diff  = this.calculateDifference(a,b)
          storage[storage.length -1].endTime = time.hour + ':' + time.minute;
          storage[storage.length -1].totalTime = diff; 


    //Storing start, end, total time and date to local storage
    localStorage.setItem('data', JSON.stringify(storage));

    this.setState( 
          
      (prevState) => ({
      details:prevState.details.map(
        el => el.key === this.state.details[this.state.details.length - 1].key ? 
        {...el, totalTime:diff}  : el)
      
      }))
          }); 
          

  
    }



    toggleInputHandler = () => {
      const doesShow = this.state.showInputField;
      this.setState({ showInputField: !doesShow });
    };


    calculateDifference = (a,b) => {
  
      const Startingseconds = (+a[0]) * 60 * 60 + (+a[1]) * 60;
      const endingSeconds = (+b[0]) * 60 * 60 + (+b[1]) * 60;  
    
    
      let diff = endingSeconds - Startingseconds; 
    
      
        
    
      let diffHours = Math.floor(diff / 3600); 
      diff %= 3600; 
      let diffMinutes = Math.floor(diff / 60); 
    
    
    
          diffHours = diffHours.toString();
          diffMinutes = diffMinutes.toString();
    
            if(diffHours.length < 2) diffHours = '0'+ diffHours; 
            if(diffMinutes.length < 2) diffMinutes = '0'+ diffMinutes; 
        
    
            diff = diffHours + ':' + diffMinutes;
            return diff;
    }
    
    showDifference = () => {
          const startTime = document.querySelector('#startingTime').value;
          const endTime = document.querySelector('#endingTime').value;
    
        
          if( startTime !== null && endTime!==null){
          
          const a = startTime.split(':');
          const b = endTime.split(':');
    
          let diff =  this.calculateDifference(a,b);
          const totalTime = document.querySelector("#totalTime");
          totalTime.value  = diff; 
          }else{
            return;
          }

          console.log(this.state.details);
    }
    

    submitTime = () => {
      const date = document.querySelector('#date').value;
      const startTime = document.querySelector('#startingTime').value;
      const endTime = document.querySelector('#endingTime').value;
      const totalTime = document.querySelector('#totalTime').value;


      let dateFormat = new Date(date);
      dateFormat = dateFormat.toDateString();
 
      if(startTime === '') return;
      if(endTime === '') return;
      
      storage.push({});
      storage[storage.length -1].day = dateFormat;
      storage[storage.length - 1].startTime = startTime
      storage[storage.length -1].endTime = endTime;
      storage[storage.length -1].totalTime = totalTime;
      storage[storage.length -1].key = storage.length -1;

      localStorage.setItem('data', JSON.stringify(storage));

      let newArray = this.state.details.slice();
      newArray = storage;     
      this.setState( 
            {details:newArray}
      )


  
    }


    startBtnHandler = () => {
      this.toggleHandler();
      this.recordStartingTime();
    }

    endBtnHandler = () => {
      this.toggleHandler();
      this.recordEndingTime();
    }
    


  render(){  
    let inputField = null; 

    if(this.state.showInputField) {
      inputField = (
        <InputField clicked={this.submitTime}
        blurred={this.showDifference}/>
     
      )}



  
  return (
    
        <div className={styles.App}>

           <TimeHeader 
           hours={this.state.hours}
           actualDate={this.state.actualDate}
           minutes ={this.state.minutes}/>


            <div className={styles.buttonContainer}>

              {/* signin button */}
              {!(this.state.showSignIn)? null : 
               <button className={styles.btn} onClick={this.startBtnHandler}>
               Sign In</button>
              }
               
              {/* signOut button */}
              {this.state.showSignOff ? (
         <button className={styles.btn__off} onClick={this.endBtnHandler}>
           
          Sign Out</button>
        ) : null}

            {/* addCustom time */}
            {this.state.showInputFieldControl ? (
            <InputFieldControl
              showInputField={this.state.showInputField}
              clicked={this.toggleInputHandler}
              />):null}
            
               
            </div>
            {inputField}
  
            <RecordTable details={this.state.details}></RecordTable>

        </div>

  
    
  );
  }
}

export default App;

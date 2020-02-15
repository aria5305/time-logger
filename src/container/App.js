import React, { Component } from 'react';
import logo from '../asset/logo.svg'
import styles from './App.module.css';
import TimeHeader from '../components/TimeHeader.js';
import RecordTable from '../components/RecordTable.js';

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
        details:[
          {key:0, startTime: '19:38:00', endTime:'19:39:00',totalTime:'00:01:00',day:'Fri 14/02 2020'}
        ]
        // startTime :[],
        // endTime:[],
        // totalTime:[],
        // days:[]
    }
  }

  updateDetails = ''; 

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
  
      
  
      let seconds = currentDate.getUTCSeconds(); 
      seconds = seconds + '';
      if(seconds.length === 1) seconds = '0' + seconds;
  
      // console.log(actualDate,hours,minutes,seconds);

     
      this.setState({
          actualDate:actualDate,
          hours:hours,
          minutes:minutes,
          seconds:seconds
      })

      

     

  
  }

  toggleHandler = () => {
      const SignIn = this.state.showSignIn;
      const SignOut = this.state.showSignOff;
      this.setState({ 
        showSignIn: !SignIn,
        showSignOff: !SignOut
      });

      console.log(this.state.showSignIn, this.state.showSignOff)
    }




  


  



  componentWillMount() {
      this.getTime();
  }



  componentDidMount() {
     setInterval( () => {
          this.getTime();
      },1000)

     

    }
  
    recordStartingTime = () => {


      const time = {
          date:this.state.actualDate,
          hour:this.state.hours,
          minute: this.state.minutes,
          second:this.state.seconds
      }


      this.state.details.push({
        key: this.state.details.length,
        startTime:time.hour + ':' + time.minute + ':' + time.second,
        endTime:'',
        totalTime:'',
        day:this.state.actualDate})

    }

  


    recordEndingTime = () => {
      
      const time = {
        hour:this.state.hours,
        minute: this.state.minutes,
        second:this.state.seconds
      }
  
      
        this.setState( 
          
          (prevState) => ({
          details:prevState.details.map(
            el => el.key === this.state.details[this.state.details.length - 1].key ? 
            {...el, endTime:time.hour + ':' + time.minute + ':' + time.second}  : el)
          
          }), () => {
            
          const a = this.state.details[this.state.details.length -1].startTime.split(':');
          const b =  this.state.details[this.state.details.length -1].endTime.split(':');

          console.log(a,b)
         
          
          const Startingseconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
          const endingSeconds = (+b[0]) * 60 * 60 + (+b[1]) * 60 + (+b[2]);  

          console.log(Startingseconds, endingSeconds)

          let diff = endingSeconds - Startingseconds; 
            // console.log(diff);
          
            

    let diffHours = Math.floor(diff / 3600); 
    diff %= 3600; 
    let diffMinutes = Math.floor(diff / 60); 
    let diffSeconds = diff % 60; 


    diffHours = diffHours.toString();
    diffMinutes = diffMinutes.toString();
    diffSeconds = diffSeconds.toString(); 

    if(diffHours.length < 2) diffHours = '0'+ diffHours; 
    if(diffMinutes.length < 2) diffMinutes = '0'+ diffMinutes; 
    if(diffSeconds.length < 2) diffSeconds = '0'+ diffSeconds; 
   
    diff = diffHours + ':' + diffMinutes + ':' + diffSeconds; 

    console.log(diff);

    this.setState( 
          
      (prevState) => ({
      details:prevState.details.map(
        el => el.key === this.state.details[this.state.details.length - 1].key ? 
        {...el, totalTime:diff}  : el)
      
      }))
          }); 
          

  
    }



  


    


  render(){  

    

  
  return (
    
        <div className={styles.App}>
           <TimeHeader 
           hours={this.state.hours}
           actualDate={this.state.actualDate}
           minutes ={this.state.minutes}
           seconds ={this.state.seconds} />


            <div className={styles.buttonContainer}>

              {!(this.state.showSignIn)? null : 
               <button className={styles.btn} onClick={ () => {
                 this.toggleHandler();
                 this.recordStartingTime();
                }}>Sign In</button>
              }
               

                {this.state.showSignOff ? (
         <button className={styles.btn__off} onClick={ ()=>{
           this.toggleHandler();
           this.recordEndingTime();
           console.log(this.state);
          }}>Sign Out</button>
        ) : null}
               
            </div>
  

            <RecordTable details={this.state.details}></RecordTable>

        </div>

  
    
  );
  }
}

export default App;

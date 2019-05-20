import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

import Header  from './Common/Header'
import Footer  from './Common/Footer'
import Sidebar  from './Common/Sidebar'

 

import logo from '.././assets/logo.png';




class ReviewAnswers extends Component {
     constructor(){
        super()
     	this.state = {
     		userData:JSON.parse(localStorage.getItem("userData")),
		    data: [],
        quiz_id:'',
        quiz_title:'',
        quiz_description:'',
        quiz_file:'',
        quizs_taken:[],
        quizs_taken_id:'',
        quiz_answers:[],
        quiz_data:[],
		    thumbImageBase:'https://s3.us-east-2.amazonaws.com/holdingcallassets/thumb_image/',
        quizBase:'https://s3.us-east-2.amazonaws.com/holdingcallassets/quiz/',
        quizs_taken:[],
        descriptions:[],
        questions:[]
    

		  }
     }
   


componentDidMount() {
       var url_string = window.location.href
      var url = new URL(url_string);
      var quizs_taken_id = atob(url.searchParams.get("quizs_taken_id"));
      var quiz_id = atob(url.searchParams.get("quiz_id"));
      var file = atob(url.searchParams.get("file"));
 

    axios.post('http://18.222.166.163:3000/quiz?id='+quiz_id)
      .then(res => {
             if(res.data.errorCode=='200'){
              var quizs=(res.data.quiz);
                     const data = quizs[0];
                      this.setState({quiz_file: data.file});
                      this.setState({quiz_title: data.title});
                      this.setState({quiz_description: data.description});
                      this.setState({quiz_id: data.id});

                      
              }
      });

        axios.post('http://18.222.166.163:3000/review-answers?quizs_taken_id='+quizs_taken_id+'&file='+file)
        .then(res => {
               if(res.data.errorCode=='200'){
                
                  this.setState({quizs_taken_id: quizs_taken_id});
                   this.setState({quizs_taken: res.data.quizs_taken});
                   this.setState({quiz_answers: res.data.quiz_answers});
                   this.setState({quiz_data: res.data.quiz_data});
                   this.setState({descriptions: res.data.quiz_data.quiz.descriptions[0]});
                   this.setState({questions: res.data.quiz_data.quiz.items[0]});
 

                 }
        });

  }


 handleSubmit= event =>{
  event.preventDefault();
   var self = this;
  var formData = new FormData(document.querySelector('form'));
      formData.append('quizs_taken_id', this.state.quizs_taken_id);
      axios({
            method: 'post',
            url: 'http://18.222.166.163:3000/update-quiz-result',
            data: formData,
           })
          .then(function (response) {
             // self.props.history.push('/my-quizs', { some: 'state' })
              console.log(response);
          })
          .catch(function (response) {
              //handle error
              console.log(response);
          }
    )
 }


  getGivenAnswerByQuestionId(QuestionId){
    var answer='';
         this.state.quiz_answers.map(answers => { 
           if((answers.question_id).replace(/ /g,'')==(QuestionId).replace(/ /g,'')){
            answer= answers.answer;
            
           }
         })
     return answer  ;
  }

    getobtainMarkByQuestionId(QuestionId){
    var obtain_mark='0';
         this.state.quiz_answers.map(answers => { 
           if((answers.question_id).replace(/ /g,'')==(QuestionId).replace(/ /g,'')){
            obtain_mark= answers.obtain_mark;
            if(obtain_mark==''){obtain_mark=0;}
           }
         })
     return obtain_mark  ;
  }



  isChecked(a,b){
   var checked="";
      if(a==b){
        checked="checked";
      }
   return checked;
  }

   isAnswerCorrect(a,b){
   var checked=true;
      if(a==b){
        checked=false;
      }
   return checked;
  }

  handleBack = event =>{
  	  //window.location='/all-submitted-quizs/?quiz='+btoa(this.state.quiz_id);
                      this.props.history.push('/all-submitted-quizs/?quiz='+btoa(this.state.quiz_id) , { some: 'state' })

    }


handleEnterMark(maxMarks,questionId, e){
if(parseInt(e.target.value) > parseInt(maxMarks)){
  e.target.value=0;
return false;
}

if(parseInt(e.target.value) <1){
  e.target.value=0;
return false;
}
e.target.value=e.target.value;
if(e.target.value ==''){
    e.target.value=0;
return false;
}



 var formData = new FormData();
      formData.append('quizs_taken_id', this.state.quizs_taken_id);
      formData.append('questionId', questionId);
      formData.append('obtain_mark', e.target.value);
      axios({
            method: 'post',
            url: 'http://18.222.166.163:3000/update-quiz-result',
            data: formData,
           })
          .then(function (response) {
             // self.props.history.push('/my-quizs', { some: 'state' })
             console.log(response.data.errorCode);
              if(response.data.errorCode==200){
              alert('Marks updated');

              }
          })
          .catch(function (response) {
              //handle error
              console.log(response);
          }
    )






}

insertValue(questionId,obtainMark){
if(questionId !='' && questionId !=null){
 console.log('response');
	console.log(document.getElementById(questionId));
	console.log('response');
	if (typeof document.getElementById(questionId) !== 'undefined' && document.getElementById(questionId) !==null && document.getElementById(questionId) !=''){
 	         setTimeout(function(){ document.getElementById(questionId).value = obtainMark  }, 2000);
	     }
 }
}

  renderDescriptions(){
          if (typeof this.state.descriptions.description !== 'undefined'){
            
              return this.state.descriptions.description.map(description => {
                       return (
                         <div className="quiz-description-blocks">
                            <h2>{description.heading} </h2>
                            <p>{description.content} </p>
                         </div>
                       );
                   })
          }
    }



  renderChoices(){

  }
  
  renderQuestions(){
     
      if (typeof this.state.questions.item !== 'undefined'){
           return this.state.questions.item.map(questions => {
                    var questionId=(questions.questionId[0]).replace(/ /g,'');
                    var maxMarks=questions.marks[0];
                    var givenAnswer= this.getGivenAnswerByQuestionId(questionId);
                    var correctIcon="";
                    var obtainMark=this.getobtainMarkByQuestionId(questionId);
                    
                    var obtainMarkField="";
                    var correctAnswer='';

                    console.log(givenAnswer);

                       var type=(questions.$);
                       var queDes='';
                       if (typeof type !== 'undefined'){
                          if(type.type=='image'){  queDes=<img src={questions.resourceUrl[0]}/>   }
                          if(type.type=='video'){   
                                  queDes=    <video width="320" height="240" controls> <source src={questions.resourceUrl[0]} type="video/mp4" /> <source src={questions.resourceUrl[0]} type="video/ogg" /> </video>
                          }
                       }
                       var answers='';
                       var choice1='';
                          var choice2='';
                          var choice3='';
                          var choice4='';
                          
                       if(questions.questionType[0]  == 'Objective') {
                                  if(questions.choice[0]  !== 'undefined') {
                                      var value='';
                                      var text='';
                                      var correct="";
                                      if (typeof questions.choice[0].$ !== 'undefined'){ let ch= questions.choice[0] ; correct='yes'; text=ch._ ; correctAnswer=text;}
                                      else{ correct=''; text=questions.choice[0] }
                                      var checked= this.isChecked(givenAnswer,text);
                                      choice1=<div className="choice-div">
                                                <input   type="radio" checked= {checked}  value={correct} /> 
                                                <span className="choice-text"> {text}</span>
                                              </div>
                                  }
                                  if(questions.choice[1] !== 'undefined') {
                                      var value='';
                                      var text='';
                                      var correct="";
                                      if (typeof questions.choice[1].$ !== 'undefined'){ let ch= questions.choice[1] ; correct='yes'; text=ch._ ; correctAnswer=text;}
                                      else{ correct=''; text=questions.choice[1] }
                                      var checked= this.isChecked(givenAnswer,text);
                                      choice2=<div className="choice-div">
                                                <input   type="radio" checked= {checked}  value={correct} /> 
                                                <span className="choice-text"> {text}</span>
                                              </div>
                                  }
                                  if(questions.choice[2] !== 'undefined') {
                                      var value='';
                                      var text='';
                                      var correct="";
                                      if (typeof questions.choice[2].$ !== 'undefined'){ let ch= questions.choice[2] ; correct='yes'; text=ch._  ; correctAnswer=text;  }
                                      else{ correct=''; text=questions.choice[2] }
                                     var checked= this.isChecked(givenAnswer,text);
                                      choice3=<div className="choice-div">
                                                <input   type="radio" checked= {checked}  value={correct} /> 
                                                <span className="choice-text"> {text}</span>
                                              </div>
                                  }

                                  if(questions.choice[3]  !== 'undefined') {
                                      var value='';
                                      var text='';
                                      var correct="";
                                      
                                      if (typeof questions.choice[3].$ !== 'undefined'){ let ch= questions.choice[3] ; correct='yes'; text=ch._ ; correctAnswer=text; }
                                      else{ correct=''; text=questions.choice[3] }
                                      var checked= this.isChecked(givenAnswer,text);
                                      choice4=<div className="choice-div">
                                                <input  type="radio" checked= {checked} value={correct} /> 
                                                <span className="choice-text"> {text}</span>
                                              </div>
                                  }

                         if(this.isAnswerCorrect(givenAnswer,correctAnswer)){
                            obtainMark=maxMarks;
                            correctIcon=<button className="btn btn-xs btn-success">Correct</button>
                         }else{
                          obtainMark=0;
                           correctIcon=<button className="btn btn-xs btn-danger">false</button>
                         }
                          
                          obtainMarkField=<input type="text" className="form-control" readonly="readonly" value= {obtainMark}  name= {questionId}/>
                          

                          
                       }
                      if((questions.questionType[0]).replace(/ /g,'')  == 'Subjective') {

                        answers= <textarea   value={givenAnswer}   className="form-control"></textarea>
                        obtainMarkField=<input type="number" className="form-control" id= {questionId}   max={maxMarks} onChange={(e) => this.handleEnterMark(maxMarks,questionId, e)}   name= {questionId}/>
                        this.insertValue(questionId,obtainMark);
                       }

                      


                       return (
                         <div className="quiz-questions row">
                                <div className="col-md-5">
                                  <h4 className="qui_id">{questionId} </h4>
                                  <h2>{questions.question[0]}</h2>
                                  {queDes}
                                </div>
                               <div className="col-md-5">
                                     <div className="answers-div">
                                        {answers}
                                        {choice1}
                                        {choice2}
                                        {choice3}
                                        {choice4}
                                      </div>  
                               </div>
                               <div className="col-md-2">
                                 <div className="maeks-Desc">
                                  {correctIcon}
                                  <h4>Max Mark: {maxMarks}</h4> 
                                  {obtainMarkField}
                                 </div>

                               </div>
                         </div>
                       );
                   })
      }

  }



     

     handleGo(url, e){
      this.props.history.push(url, { some: 'state' })
     }


 render(){
  var descriptions=(this.state.descriptions);
        return (
              <div>
              <Header/>
              <br/><br/>
              <div className="page-container">
              <Sidebar/>

		           <div className="page-content-wrapper">
          					<div className="page-content">
                            <div className="portlet box green"> 
                                 <div className="portlet-title"><div className="caption"><i className="fa fa-cogs"></i>{this.state.quiz_title}</div>  <button className="btn btn-success pull-right white"  onClick={this.handleBack} >Back</button></div>
                                 <div className="portlet-body flip-scroll">
                                 <form  method="post" onSubmit={this.handleSubmit}>
                                 {this.renderDescriptions() }
                                 
                                 {this.renderQuestions() }  

                                
                             </form>
                                 </div>



                             </div>

          					</div>
					     </div>



         
            
             </div>
             <Footer/>
             </div>
        	)

 }

}

export default ReviewAnswers
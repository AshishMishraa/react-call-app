import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import baseUrl from '../CommonFunctions';

import Header  from './Common/Header'
import Footer  from './Common/Footer'
import Sidebar  from './Common/Sidebar'

 

import logo from '.././assets/logo.png';




class AllSubmittedQuizs extends Component {
     constructor(){
        super()
     	this.state = {
     		userData:JSON.parse(localStorage.getItem("userData")),
		    data: [],
        id:'',
        file:'',
		    thumbImageBase:'https://s3.us-east-2.amazonaws.com/holdingcallassets/thumb_image/',
        quizBase:'https://s3.us-east-2.amazonaws.com/holdingcallassets/quiz/',
        quizs_taken:[],
    

		  }
     }
   


componentDidMount() {
   console.log(this.state);
      var url_string = window.location.href
      var url = new URL(url_string);
      var quiz_id = atob(url.searchParams.get("quiz"));
      console.log(url);

      



    axios.post(baseUrl('quiz?id='+quiz_id,'api'))
      .then(res => {
             if(res.data.errorCode=='200'){
              var quizs=(res.data.quiz);
                     const data = quizs[0];


                      this.setState({title: data.title});
                      this.setState({description: data.description});
                      this.setState({id: data.id});
                      this.setState({file: data.file});

                     this.setState({ data });
              }
      });
      
      axios.post(baseUrl('all-submitted-quizs?quiz_id='+quiz_id,'api'))
        .then(res => {
               if(res.data.errorCode=='200'){
                  this.setState({quizs_taken: res.data.quizs_taken});
                 }
        });
  }



     handleGo(url, e){
      this.props.history.push(url, { some: 'state' })
     }
     

 render(){
        return (
              <div>
              <Header/>
              <br/><br/>
              <div className="page-container">
              <Sidebar/>

		           <div className="page-content-wrapper">
          					<div className="page-content">
                         <button className="btn btn-success pull-right white"  onClick={(e) => this.handleGo('../my-quizs', e)}  >Back</button>
                            <div className="portlet box green"> 
                                         <div className="portlet-body flip-scroll">
                                                      <div className="row quiz-row row-heading">
                                                                <div className="col-md-2 col-sm-2 col-xs-3">
                                                                    <b>Student Name</b> 
                                                                </div>
                                                                <div className="col-md-2 col-sm-2 col-xs-3">
                                                                   <b>Date</b> 
                                                                </div>
                                                                <div className="col-md-2 col-sm-2 col-xs-2">
                                                                   <b>Obtain Marks</b>  
                                                                </div>
                                                                <div className="col-md-2 col-sm-2 col-xs-2">
                                                                    <b>Max Marks</b> 
                                                                </div>
                                                                <div className="col-md-3 col-sm-3 col-xs-2">
                                                                      
                                                                </div>
                                                             </div>
                                                      {this.state.quizs_taken.map(post =>
                                                             <div className="row quiz-row">
                                                                <div className="col-md-2 col-sm-2 col-xs-3">
                                                                     {post.name} 
                                                                </div>
                                                                <div className="col-md-2 col-sm-2 col-xs-3">
                                                                    {post.date} 
                                                                </div>
                                                                <div className="col-md-2 col-sm-2 col-xs-2">
                                                                     {post.obtain_marks} 
                                                                </div>



                                                                <div className="col-md-2 col-sm-2 col-xs-2">
                                                                    {post.max_marks} 
                                                                </div>

                                                                <div className="col-md-2 col-sm-2 col-xs-2">
                                                                  {post.is_reviewed=='1' &&( <button  className="btn btn-xs btn-danger"> Reviewed</button>  )} 
                                                              </div>

                                                                <div className="col-md-2 col-sm-2 col-xs-2">
                                                                      <button onClick={(e) => this.handleGo('/review-answers/?quizs_taken_id='+btoa(post.id)+'&file='+btoa(this.state.file)+'&quiz_id='+btoa(this.state.id) , e)}  className="btn btn-success btn-xs">  Answers</button>
                                                                </div>

                                                             </div>
                                                      )}
                                   
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

export default AllSubmittedQuizs
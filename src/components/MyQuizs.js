import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';

import Header  from './Common/Header'
import Footer  from './Common/Footer'
import Sidebar  from './Common/Sidebar'
import baseUrl from '../CommonFunctions';

 

import logo from '.././assets/logo.png';




class MyQuizs extends Component {
     constructor(){
        super()
     	this.state = {
     		userData:JSON.parse(localStorage.getItem("userData")),
		    data: [],
		    thumbImageBase:'https://s3.us-east-2.amazonaws.com/holdingcallassets/thumb_image/'
		  }
     }
   
     handleGoEdit(url, e){
  	  this.props.history.push(url, { some: 'state' })
     }
     goDashboard = event =>{
        this.props.history.push('/dashboard', { some: 'state' })
      }
componentDidMount() {
   
    axios.post(baseUrl('quizs-teacher?user_id='+this.state.userData.id,'api'))
      .then(res => {

if(res.data.errorCode=='200'){
        const data = res.data.quizs.map(obj => obj);
         this.setState({ data }); }


      });
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
					    <div className="portlet box green">
					                    <div className="portlet-title">
					                        <div className="caption">
					                            <i className="fa fa-cogs"></i>My Quizs</div>
                                                <button className="btn btn-success pull-right white"  onClick={this.goDashboard} >Back</button>
                                                <button onClick={(e) => this.handleGoEdit('/new-quiz' , e)} className="btn btn-success pull-right white"    >Add New</button>

					                    </div>
					                       <div className="portlet-body flip-scroll">
					                           
					                                {this.state.data.map(post =>
					                                       <div className="row quiz-row">
					                                          <div className="col-md-1 col-sm-2 col-xs-3">
					                                               <img className="thumb-img" src={this.state.thumbImageBase+post.thumb_img} />
					                                          </div>
                                                              <div className="col-md-3 col-sm-3">
                                                                  <h4>{post.title} </h4> {post.description}
                                                              </div>
                                                          
 


                                                               <div className="col-md-3 col-sm-3">
                                                                  <a onClick={(e) => this.handleGoEdit('/all-submitted-quizs/?quiz='+btoa(post.id) , e)}   className="btn btn-success btn-xs margin-r-5 margin-5">View Submitted Quizs </a> 
                                                                  <a  href="javascript:void(0)" onClick={(e) => this.handleGoEdit('/update-quizs/?quiz='+btoa(post.id) , e)}     className="btn btn-success btn-xs margin-r-5 margin-5"> Update </a> 
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

export default MyQuizs
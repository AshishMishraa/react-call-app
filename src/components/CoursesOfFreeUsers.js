import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';
import Header  from './Common/Header'
import Footer  from './Common/Footer'
import Sidebar  from './Common/Sidebar'
import baseUrl from '../CommonFunctions';

 

import logo from '.././assets/logo.png';




class CoursesOfFreeUsers extends Component {
     constructor(){
        super()
     	this.state = {
     		userData:JSON.parse(localStorage.getItem("userData")),
		    data: [],
 		  }
     }
   
     handleGoEdit(url, e){
  	  this.props.history.push(url, { some: 'state' })
     }

     

componentDidMount() {
   console.log(this.state);
    axios.get(baseUrl('get-free-courses','api'))
      .then(res => {
         if(res.data.errorCode=='200'){
          const data = res.data.data.map(obj => obj);
          this.setState({ data }); }
      });
  }
  
  goDashboard = event =>{
    this.props.history.push('/dashboard', { some: 'state' })
  }
  updateStatus(status,id,e){
    axios.get(baseUrl('update-free-course-status?id='+id+'&status='+status,'api'))
    .then(res => {
       if(res.data.errorCode=='200'){
         axios.get(baseUrl('get-free-courses','api'))
         .then(res => {
           if(res.data.errorCode=='200'){
            const data = res.data.data.map(obj => obj);
            this.setState({ data }); }
        });
       }
    });
  }


 render(){
    var i=1;
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
					                            <i className="fa fa-cogs"></i>Courses Of Free Users</div>
                                                <button className="btn btn-success pull-right white"  onClick={this.goDashboard} >Back</button>
                                                <button onClick={(e) => this.handleGoEdit('/new-courses-of-free-users' , e)} className="btn btn-success pull-right white"    >Add New</button>

					                    </div>
					                       <div className="portlet-body flip-scroll">
                                                            <div className="row quiz-row heading">
                                                                                <div className="col-md-1"> <b> S. No.</b></div>
                                                                                <div className="col-md-1"> <b> Thumb Img</b></div>
                                                                                <div className="col-md-3"> <b> Title</b></div>
                                                                                <div className="col-md-3"> <b> Type</b></div>
                                                                                <div className="col-md-3"><b> Action</b></div>
                                                            </div>
					                                {this.state.data.map(post =>
					                                       <div className="row quiz-row">
                                                               <div className="col-md-1"> {i++} </div>
                                                               <div className="col-md-1"> <img className="thumb_img"  src={baseUrl(post.thumb_img,'thumb')} />   </div>
                                                               <div className="col-md-3"> {post.title}   </div>
                                                               <div className="col-md-3"> {post.type}   </div>
                                                               <div className="col-md-3 ">
                                                                              
                                                                             {post.is_delete=='0' &&( <button  onClick={(e) => this.updateStatus('1' ,post.id, e)} className="btn btn-xs btn-danger"> Deactivate</button>  )} 
                                                                             {post.is_delete=='1' &&( <button  onClick={(e) => this.updateStatus('0' ,post.id, e)} className="btn btn-xs btn-success"> Activate</button>  )}  
                                                                             
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

export default CoursesOfFreeUsers
import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';

import Header  from './Common/Header'
import Footer  from './Common/Footer'
import Sidebar  from './Common/Sidebar'

import baseUrl from '../CommonFunctions';


import logo from '.././assets/logo.png';




class StateAssociationsAdmin extends Component {
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
     

     handleLogin(id, e){
        axios.get(baseUrl('get-user-by-id?id='+id,'api'))
        .then(res => {
               if(res.data.errorCode=='200'){
                localStorage.setItem("userData", JSON.stringify(res.data.data));
                localStorage.setItem("active_user", 'state-admin');
                localStorage.setItem("isStateAssociationAdmin", 'true');
                localStorage.setItem("stateAssociationAdminData", JSON.stringify(res.data.data));
                window.location=baseUrl('dashboard');   
                 }
        });
     }
     goDashboard = event =>{
      this.props.history.push('/dashboard', { some: 'state' })
    }
  
    updateStatus(status,id,e){
      axios.get(baseUrl('update-user-status?id='+id+'&status='+status,'api'))
      .then(res => {
         if(res.data.errorCode=='200'){
            
          axios.get(baseUrl('state-associations-admins','api'))
          .then(res => {
             if(res.data.errorCode=='200'){
              const data = res.data.data.map(obj => obj);
              this.setState({ data }); }
          });
         }
      });
    }
componentDidMount() {
   console.log(this.state);
    axios.get(baseUrl('state-associations-admins','api'))
      .then(res => {

         if(res.data.errorCode=='200'){
         const data = res.data.data.map(obj => obj);
         this.setState({ data }); }


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
					                            <i className="fa fa-cogs"></i>State Associations</div>
                                                <button className="btn btn-success pull-right white"  onClick={this.goDashboard} >Back</button>
                                                <button onClick={(e) => this.handleGoEdit('/new-state-associations-admin' , e)} className="btn btn-success pull-right white"    >Add New</button>
					                    </div>
					                       <div className="portlet-body flip-scroll">
                                          <div className="row quiz-row heading">
                                                               <div className="col-md-1"> <b> S. No.</b></div>
                                                               <div className="col-md-3"> <b> Name</b></div>
                                                               <div className="col-md-3"><b> Email </b></div>
                                                               <div className="col-md-2"><b> State Association Name </b></div>
                                                               <div className="col-md-3"><b> Action</b></div>
                                          </div>
                                           {this.state.data.map(post =>
					                                       <div className="row quiz-row">
                                                                <div className="col-md-1"> {i++} </div>
                                                                <div className="col-md-3 "> {post.name} </div>
                                                                <div className="col-md-3 "> {post.email} </div>
                                                                <div className="col-md-2"> {post.state_association_name}   </div>
                                                                <div className="col-md-3"> 
                                                                <button  onClick={(e) => this.handleLogin(post.id , e)}  className="btn btn-primary btn-xs margin-r-5">Login</button> 
                                                                <button    onClick={(e) => this.handleGoEdit('/update-state-associations-admin/?id='+btoa(post.id) , e)}     className="btn btn-success btn-xs margin-r-5 "> Update </button> 
                                                                {post.is_delete=='0' &&( <button  onClick={(e) => this.updateStatus('1' ,post.id, e)} className="btn btn-xs margin-r-5 btn-danger"> Deactivate</button>  )} 
                                                                             {post.is_delete=='1' &&( <button  onClick={(e) => this.updateStatus('0' ,post.id, e)} className="btn btn-xs margin-r-5 btn-success"> Activate</button>  )}  
                                                                            
                                                                
                                                                
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

export default StateAssociationsAdmin
import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';

import Header  from './Common/Header'
import Footer  from './Common/Footer'
import Sidebar  from './Common/Sidebar'
import baseUrl from '../CommonFunctions';

 

import logo from '.././assets/logo.png';




class LocalAssociationsAdmin extends Component {
     constructor(){
        super()
     	this.state = {
     		userData:JSON.parse(localStorage.getItem("userData")),
          data: [],
          nodata:''
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
            localStorage.setItem("active_user", 'local-admin');
            localStorage.setItem("isLocalAssociationAdmin", 'true');
            localStorage.setItem("LocalAssociationAdminData", JSON.stringify(res.data.data));
            window.location=baseUrl('dashboard');   
             }
    });
 }
 updateStatus(status,id,e){
   axios.get(baseUrl('update-user-status?id='+id+'&status='+status,'api'))
   .then(res => {
      if(res.data.errorCode=='200'){
         
         axios.get(baseUrl('local-associations-admins?state_association_id='+this.state.userData.state_association_id,'api'))
         .then(res => {
          if(res.data.errorCode=='200'){
           const data = res.data.data.map(obj => obj);
           this.setState({ data }); }
       });
      }
   });
 }
 goDashboard = event =>{
    this.props.history.push('/dashboard', { some: 'state' })
  }
componentDidMount() {
    this.setState({state_association_id:this.state.userData.state_association_id});

    

    axios.get(baseUrl('local-associations-admins?state_association_id='+this.state.userData.state_association_id,'api'))
      .then(res => {

if(res.data.errorCode=='200'){
        const data = res.data.data.map(obj => obj);
         this.setState({ data });
  }else{
   this.setState({nodata:res.data.errorMsg});

   
  }


      });
  }

  


 render(){var i=1;
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
					                            <i className="fa fa-cogs"></i>Local Associations Admins</div>
                                                <button className="btn btn-success pull-right white"  onClick={this.goDashboard} >Back</button>
                                                <button onClick={(e) => this.handleGoEdit('/new-local-associations-admin' , e)} className="btn btn-success pull-right white"    >Add New</button>
					                    </div>
					                       <div className="portlet-body flip-scroll">
                                           <div className="row quiz-row heading">
                                                               <div className="col-md-1"> <b> S. No.</b></div>
                                                               <div className="col-md-2"><b> Name </b></div>
                                                               <div className="col-md-3"><b> Email </b></div>
                                                               <div className="col-md-2"><b> State Association Name </b></div>
                                                               <div className="col-md-2"><b> Local Association Name </b></div>
                                                               <div className="col-md-2"><b> Action</b></div>
                                          </div>
                                           {this.state.data.map(post =>
					                                       <div className="row quiz-row">
                                                               <div className="col-md-1"> {i++} </div>
                                                               <div className="col-md-2 "> {post.name} </div>
                                                               <div className="col-md-3 "> {post.email} </div>
                                                               <div className="col-md-2"> {post.state_association_name}   </div>
                                                               <div className="col-md-2 "> {post.local_association_name} </div>
                                                               <div className="col-md-2"> 
                                                               <button  onClick={(e) => this.handleLogin(post.id , e)}  className="btn btn-primary btn-xs  margin-r-5">Login</button>
                                                               <button    onClick={(e) => this.handleGoEdit('/update-local-associations-admin/?id='+btoa(post.id) , e)}     className="btn btn-success btn-xs margin-r-5 "> Update </button>
                                                               {post.is_delete=='0' &&( <button  onClick={(e) => this.updateStatus('1' ,post.id, e)} className="btn btn-xs margin-r-5 btn-danger"> Deactivate</button>  )} 
                                                                             {post.is_delete=='1' &&( <button  onClick={(e) => this.updateStatus('0' ,post.id, e)} className="btn btn-xs margin-r-5 btn-success"> Activate</button>  )}  
                                                                            

                                                                   
                                                                  
                                                               </div>
                                                             
					                                       </div>
                                               )}
                                               {this.state.nodata !='' && (
                                                <div className="row ">
                                                <br/>
                                                <center><span className="alert alert-danger">{this.state.nodata}</span></center>
                                                <br/>
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

export default LocalAssociationsAdmin
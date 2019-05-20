import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

import Header  from './Common/Header'
import Footer  from './Common/Footer'
import Sidebar  from './Common/Sidebar'

 
import logo from '.././assets/logo.png';
import baseUrl from '../CommonFunctions';




class NewStateAssociationsAdmin extends Component {
     constructor(){
        super()
     	this.state = {
            state_associations:[],
            name:'',
            name_error:'',
            email:'',
            email_error:'',
            password:'',
            password_error:'',
            state_association_id:'',
            state_association_id_error:''
		  }
     }
   

     
    componentDidMount() {
        console.log(this.state);
        axios.get(baseUrl('state-associations','api'))
          .then(res => {
             if(res.data.errorCode=='200'){
              const state_associations = res.data.data.map(obj => obj);
              this.setState({ state_associations:state_associations }); }
          });


    }
    handleChangeEmail = event =>{
        this.setState({email: event.target.value});
    }
    handleChangeName = event =>{
        this.setState({name: event.target.value});
    }
    handleChangeStateAssociationId = event =>{
        this.setState({state_association_id: event.target.value});
    }
    handleChangePassword = event =>{
        this.setState({password: event.target.value});
    }

    handleBack = event =>{
                      this.props.history.push('/state-associations-admin', { some: 'state' })
    }

    validate(){
        var returnVal=true;
        this.setState({ name_error: '' });
        this.setState({ password_error: '' });
        this.setState({ state_association_id_error: '' });
        this.setState({ email_error: '' });

        if(this.state.name==''){
            this.setState({ name_error: 'Please enter  name' });
            returnVal= false;
        } 
        if(this.state.password==''){
            this.setState({ password_error: 'Please enter password' });
            returnVal= false;
        } 
        if(this.state.email==''){
            this.setState({ email_error: 'Please enter email' });
            returnVal= false;
        } 
        if(this.state.state_association_id==''){
            this.setState({ state_association_id_error: 'Please select state association' });
            returnVal= false;
        } 
        return returnVal;
    }
  



 handleSubmit= event =>{
  event.preventDefault();
   var self = this;
   var formData = new FormData(document.querySelector('form'));
   
  if(this.validate()){
     axios({
          method: 'post',
          url: baseUrl('new-state-associations-admin','api'),
          data: formData,
          config: { headers: {'Content-Type': 'multipart/form-data' }}
          })
          .then(function (response) {
              if(response.data.errorCode=='200'){
                self.props.history.push('/state-associations-admin', { some: 'state' })
              }else{
                  alert(response.data.errorMsg);
              }
              
          })
          .catch(function (response) {
              //handle error
              console.log(response);
          }
    )





    }else{
       if(this.state.title ==''){
          this.setState({titleError: 'Please enter title'});
       }


        if(this.state.description ==''){
            this.setState({descriptionError: 'Please enter description '});
         }
    }
  


  
  console.log(this.state);
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
                                                    <i className="fa fa-gift"></i>New State Associations Admin</div>
                                            </div>
                                            <div className="portlet-body form">
                                                
                                                <form   className="form-horizontal"  enctype="multipart/form-data"  method="post" onSubmit={this.handleSubmit}>
                                                    <div className="form-body">
                                                        


                                                        <div className="form-group">
                                                            <label className="col-md-3 control-label">Name</label>
                                                            <div className="col-md-4">
                                                            <div className="input-group">
                                                                <input type="text"  name="name"  className="form-control" placeholder="Name" value={this.state.name}  onChange={this.handleChangeName} />
                                                            </div>
                                                            <span className="error">{this.state.name_error}</span>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="col-md-3 control-label"> Email</label>
                                                            <div className="col-md-4">
                                                            <div className="input-group">
                                                                <input type="email"  name="email"  className="form-control" placeholder="Email"  onChange={this.handleChangeEmail}  value={this.state.email} />
                                                            </div>
                                                            <span className="error">{this.state.email_error}</span>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="col-md-3 control-label"> Association Name</label>
                                                            <div className="col-md-4">
                                                            <div className="input-group">
                                                               <select name="state_association_id"  onChange={this.handleChangeStateAssociationId}  className="form-control">
                                                               <option value="">Select Association Name</option>
                                                               {this.state.state_associations.map(post =>
                                                                <option value={post.id}>{post.state_association_name} </option>
                                                                )}
                                                               </select>

                                                            </div>
                                                            <span className="error">{this.state.state_association_id_error}</span>
                                                            </div>
                                                        </div>

                                                        <div className="form-group">
                                                            <label className="col-md-3 control-label"> Password</label>
                                                            <div className="col-md-4">
                                                            <div className="input-group">
                                                                <input type="text"  name="password"  className="form-control" placeholder="password"  onChange={this.handleChangePassword}  value={this.state.password} />
                                                            </div>
                                                            <span className="error">{this.state.password_error}</span>
                                                            </div>
                                                        </div>

                                                         
                                                    </div>
                                                    <div className="form-actions">
                                                        <div className="row">
                                                            <div className="col-md-offset-3 col-md-9">
                                                                <button type="submit" className="btn green">Submit</button>
                                                                <button type="button" className="btn grey-salsa btn-outline"  onClick={this.handleBack}  >Back</button>
                                                            </div>
                                                        </div>
                                                    </div>
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

export default NewStateAssociationsAdmin
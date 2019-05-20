import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

import Header  from './Common/Header'
import Footer  from './Common/Footer'
import Sidebar  from './Common/Sidebar'
import baseUrl from '../CommonFunctions';

 
import logo from '.././assets/logo.png';




class NewLocalAssociationsAdmin extends Component {
     constructor(){
        super()
     	this.state = {
            state_association_id:'', 
            loacal_associations:[],
            name:'',
            name_error:'',
            email:'',
            email_error:'',
            password:'',
            password_error:'',
            local_association_id:'',
            local_association_id_error:'',
            userData:JSON.parse(localStorage.getItem("userData")),

		  }
     }
   


    componentDidMount() {
        this.setState({state_association_id:this.state.userData.state_association_id});

        
        
        axios.get(baseUrl('local-associations?state_association_id='+this.state.userData.state_association_id,'api'))
          .then(res => {
             if(res.data.errorCode=='200'){
              const loacal_associations = res.data.data.map(obj => obj);
              this.setState({ loacal_associations:loacal_associations }); }
          });


    }
    handleChangeEmail = event =>{
        this.setState({email: event.target.value});
    }
    handleChangeName = event =>{
        this.setState({name: event.target.value});
    }
    handleChangeLocalAssociationId = event =>{
        this.setState({local_association_id: event.target.value});
    }
    handleChangePassword = event =>{
        this.setState({password: event.target.value});
    }

    handleBack = event =>{
                      this.props.history.push('/local-associations-admin', { some: 'state' })
    }

    validate(){
        var returnVal=true;
        this.setState({ name_error: '' });
        this.setState({ password_error: '' });
        this.setState({ local_association_id_error: '' });
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
        if(this.state.local_association_id==''){
            this.setState({ local_association_id_error: 'Please select state association' });
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
          url: baseUrl('new-local-associations-admin','api'),
          data: formData,
          config: { headers: {'Content-Type': 'multipart/form-data' }}
          })
          .then(function (response) {
              if(response.data.errorCode=='200'){
                self.props.history.push('/local-associations-admin', { some: 'state' })
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
                                                    <i className="fa fa-gift"></i>New Local Associations Admin</div>
                                            </div>
                                            <div className="portlet-body form">
                                                
                                                <form   className="form-horizontal"  enctype="multipart/form-data"  method="post" onSubmit={this.handleSubmit}>
                                                    <div className="form-body">
                                                        
                                                    <input type="hidden" name="state_association_id" value={this.state.state_association_id}/>

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
                                                            <label className="col-md-3 control-label"> Local Association Name</label>
                                                            <div className="col-md-4">
                                                            <div className="input-group">
                                                               <select name="local_association_id"  onChange={this.handleChangeLocalAssociationId}  className="form-control">
                                                               <option value="">Select Local Association Name</option>
                                                               {this.state.loacal_associations.map(post =>
                                                                <option value={post.id}>{post.local_association_name} </option>
                                                                )}
                                                               </select>

                                                            </div>
                                                            <span className="error">{this.state.local_association_id_error}</span>
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

export default NewLocalAssociationsAdmin
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




class UpdateStateAssociations extends Component {
     constructor(){
        super()
     	this.state = {
            state_association_name:'',
            state_association_name_error:'',
            country:'',
            country_error:'',
            ld:'',
		  }
     }
   


    componentDidMount() {
        console.log(this.state);
        var url_string = window.location.href
        var url = new URL(url_string);
        var id = atob(url.searchParams.get("id"));
   
        
      axios.get(baseUrl('get-state-association?id='+id,'api'))
        .then(res => {
               if(res.data.errorCode=='200'){
                var data=(res.data.data);
                        this.setState({state_association_name: data.state_association_name});
                        this.setState({country: data.country});
                        this.setState({id: data.id});
 
                 }
        });
    }
    handleChangeStateAssociationName = event =>{
        this.setState({state_association_name: event.target.value});
    }
    selectCountry (val) {
        this.setState({ country: val });
      }
    handleBack = event =>{
                      this.props.history.push('/state-associations', { some: 'state' })
    }

    validate(){
        var returnVal=true;
        if(this.state.state_association_name==''){
            this.setState({ state_association_name_error: 'Please enter state association name' });
            returnVal= false;
        }else{
            this.setState({ state_association_name_error: '' });
        }
        if(this.state.country==''){
            this.setState({ country_error: 'Please select a country' });
            returnVal= false;
        }else{
            this.setState({ country_error: '' });
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
          url: baseUrl('update-state-associations','api'),
          data: formData,
          config: { headers: {'Content-Type': 'multipart/form-data' }}
          })
          .then(function (response) {
              self.props.history.push('/state-associations', { some: 'state' })
              console.log(response);
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
                                                    <i className="fa fa-gift"></i>Update State Associations </div>
                                            </div>
                                            <div className="portlet-body form">
                                                
                                                <form   className="form-horizontal"  enctype="multipart/form-data"  method="post" onSubmit={this.handleSubmit}>
                                                    <div className="form-body">
                                                        
                                                      
                                                    <input type="hidden"  name="id"   value={this.state.id} />

                                                        <div className="form-group">
                                                            <label className="col-md-3 control-label">State Association Name</label>
                                                            <div className="col-md-4">
                                                            <div className="input-group">
                                                                <input type="text"  name="state_association_name"  className="form-control" placeholder="State Association Name"  onChange={this.handleChangeStateAssociationName}  value={this.state.state_association_name} />
                                                            </div>
                                                            <span className="error">{this.state.state_association_name_error}</span>
                                                            </div>
                                                        </div>

                                                         

                                                        <div className="form-group">
                                                            <label className="col-md-3 control-label">Country</label>
                                                            <div className="col-md-4">
                                                                <div className="input-group">
                                                                <CountryDropdown
                                                                    name="country"
                                                                    value={this.state.country}
                                                                    className="form-control"
                                                                    onChange={(val) => this.selectCountry(val)} />
                                                                </div>
                                                                <span className="error">{this.state.country_error}</span>
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

export default UpdateStateAssociations
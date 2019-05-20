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




class NewPositions extends Component {
     constructor(){
        super()
     	this.state = {
             position_name:'',
            position_name_error:'',
		  }
     }
   


    componentDidMount() {  }
    handleChangePositionName = event =>{
        this.setState({position_name: event.target.value});
    }
  
    handleBack = event =>{
        this.props.history.push('/positions', { some: 'state' })
}
    validate(){
        var returnVal=true;
        this.setState({ position_name_error: '' });
        if(this.state.position_name==''){
            this.setState({ position_name_error: 'Please enter  name' });
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
          url: baseUrl('new-positions','api'),
          data: formData,
          config: { headers: {'Content-Type': 'multipart/form-data' }}
          })
          .then(function (response) {
              if(response.data.errorCode=='200'){
                self.props.history.push('/positions', { some: 'state' })
              }else{
                  alert(response.data.errorMsg);
              }
              
          })
          .catch(function (response) {
              console.log(response);
          })
   


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
                                                    <i className="fa fa-gift"></i>New Position</div>
                                            </div>
                                            <div className="portlet-body form">
                                                
                                                <form   className="form-horizontal"  enctype="multipart/form-data"  method="post" onSubmit={this.handleSubmit}>
                                                    <div className="form-body">
                                                        


                                                        <div className="form-group">
                                                            <label className="col-md-3 control-label">New Position Name</label>
                                                            <div className="col-md-4">
                                                            <div className="input-group">
                                                                <input type="text"  name="position_name"  className="form-control" placeholder="Name" value={this.state.position_name}  onChange={this.handleChangePositionName} />
                                                            </div>
                                                            <span className="error">{this.state.position_name_error}</span>
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

export default NewPositions
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




class StudentsDetail extends Component {
     constructor(){
        super()
     	this.state = {
            student:'',
            level_name_error:'',
		  }
     }
   


    componentDidMount() { 
        console.log(this.state);
        var url_string = window.location.href
        var url = new URL(url_string);
        var id = atob(url.searchParams.get("id"));
   
        
        axios.get( baseUrl('get-user-by-id?id='+id,'api'))
        .then(res => {
               if(res.data.errorCode=='200'){
                
                         this.setState({student: res.data.data});
                 }
        });


     }
    handleChangeLevelName = event =>{
        this.setState({level_name: event.target.value});
    }
  
    handleBack = event =>{
        this.props.history.push('/students', { some: 'state' })
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
                                                    <i className="fa fa-gift"></i>Vew Detail</div>
                                                    <button className="btn btn-success pull-right white"  onClick={this.handleBack} >Back</button>
                                            </div>
                                            <div className="portlet-body form">
                                                
                                                <form   className="form-horizontal"  enctype="multipart/form-data"  method="post" onSubmit={this.handleSubmit}>
                                                    <div className="form-body">
                                                        
                                                    <input type="hidden"  name="id"  value={this.state.id} />


                                                        <div className="form-group">
                                                            <label className="col-md-3 control-label">Name</label>
                                                            <div className="col-md-4">
                                                            <div className="input-group">
                                                                  <label className=" control-label">{this.state.student.name }</label>
                                                            </div>
                                                             </div>
                                                        </div>

                                                         <div className="form-group">
                                                            <label className="col-md-3 control-label">Contact</label>
                                                            <div className="col-md-4">
                                                            <div className="input-group">
                                                                  <label className=" control-label">{this.state.student.contact }</label>
                                                            </div>
                                                             </div>
                                                        </div>


                                                        <div className="form-group">
                                                            <label className="col-md-3 control-label">DOB</label>
                                                            <div className="col-md-4">
                                                            <div className="input-group">
                                                                  <label className=" control-label">{this.state.student.dob }</label>
                                                            </div>
                                                             </div>
                                                        </div>

                                                        <div className="form-group">
                                                            <label className="col-md-3 control-label">Address</label>
                                                            <div className="col-md-4">
                                                            <div className="input-group">
                                                                  <label className=" control-label">{this.state.student.address }</label>
                                                            </div>
                                                             </div>
                                                        </div>

                                                       <div className="form-group">
                                                            <label className="col-md-3 control-label">City</label>
                                                            <div className="col-md-4">
                                                            <div className="input-group">
                                                                  <label className=" control-label">{this.state.student.city }</label>
                                                            </div>
                                                             </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="col-md-3 control-label">State</label>
                                                            <div className="col-md-4">
                                                            <div className="input-group">
                                                                  <label className=" control-label">{this.state.student.state }</label>
                                                            </div>
                                                             </div>
                                                        </div>

                                                        <div className="form-group">
                                                            <label className="col-md-3 control-label">Country</label>
                                                            <div className="col-md-4">
                                                            <div className="input-group">
                                                                  <label className=" control-label">{this.state.student.country }</label>
                                                            </div>
                                                             </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="col-md-3 control-label">ZIP code</label>
                                                            <div className="col-md-4">
                                                            <div className="input-group">
                                                                  <label className=" control-label">{this.state.student.zip_code }</label>
                                                            </div>
                                                             </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="col-md-3 control-label">School Name</label>
                                                            <div className="col-md-4">
                                                            <div className="input-group">
                                                                  <label className=" control-label">{this.state.student.school_name }</label>
                                                            </div>
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

export default StudentsDetail
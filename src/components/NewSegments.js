import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header  from './Common/Header'
import Footer  from './Common/Footer'
import Sidebar  from './Common/Sidebar'
import baseUrl from '../CommonFunctions';
import logo from '.././assets/logo.png';

class NewSegments extends Component {
     constructor(){
        super()
     	this.state = {
     		userData:JSON.parse(localStorage.getItem("userData")),
            data: [],
            classes: [],
            id:'',
            segment_name:'',
            segment_name_error:'',
            local_association_id:'',
            class_id:'',
            class_id_error:'',
            release_date:new Date(),
            release_date_error:'',
            description:'',
            description_error:''

             
          }
          
          this.handleChangeRelease_date = this.handleChangeRelease_date.bind(this);
 
     }
componentDidMount() {
    this.setState({local_association_id:this.state.userData.local_association_id});

   console.log(this.state);
      var url_string = window.location.href
      var url = new URL(url_string);
      var id = atob(url.searchParams.get("id"));
   
      axios.get(baseUrl('classes?local_association_id='+this.state.userData.local_association_id,'api') )
      .then(res => {
         if(res.data.errorCode=='200'){
          const classes = res.data.data.map(obj => obj);
          this.setState({ classes }); }
      });
    
  
  }


    handleChangeClassId = event =>{
        this.setState({class_id: event.target.value});
    }
    handleChangeSegmentName = event =>{
        this.setState({segment_name: event.target.value});
    }
    handleChangeDescription = event =>{
        this.setState({description: event.target.value});
    }
   handleBack = event =>{
                      this.props.history.push('/classes', { some: 'state' })

    }
    handleChangeRelease_date(date) {
        this.setState({
          release_date: date
        });
      }
    handleChangeThumbImg = event =>{
        const files = Array.from(event.target.files)
            const formData = new FormData()
            files.forEach((file, i) => {
              formData.append('thumb_img', file);
            })
            var self = this;
           axios({
              method: 'post',
              url: baseUrl('upload-thumb-img', 'api'),
              data: formData,
              config: { headers: {'Content-Type': 'multipart/form-data' }}
              })
              .then(function (response) {
                   self.setState({thumb_img:  baseUrl(response.data.thumb_img, 'thumb')   });
                   console.log(self.state.thumb_img);
              })
              .catch(function (response) {
                  //handle error
                  console.log(response);
              })
    }

  
    validate(){
        var returnVal=true;
            this.setState({ from_error: 'Please enter start date' });
        this.setState({ class_id_error: '', segment_name_error:'' ,release_date_error:'',description_error:'' });
        if(this.state.class_id==''){
            this.setState({ class_id_error: 'Please select a class' });
            returnVal= false;
        }  

        if(this.state.segment_name==''){
            this.setState({ segment_name: 'Please enter segment name ' });
            returnVal= false;
        } 
        if(this.state.description==''){
            this.setState({ description_error: 'Please enter  descriptions' });
            returnVal= false;
        } 
        if(this.state.thumb_img==''){
            this.setState({ thumb_img_error: 'Please select a thumb img' });
            returnVal= false;
        } 
        return returnVal;
    }


 handleSubmit= event =>{
  event.preventDefault();
   var self = this;
  var formData = new FormData(document.querySelector('form'));
  formData.append('thumb_img', this.state.thumb_img);
  formData.append('local_association_id', this.state.local_association_id);

  
  if(this.validate()){
     axios({
          method: 'post',
          url: baseUrl('new-segment', 'api'),
          data: formData,
          config: { headers: {'Content-Type': 'multipart/form-data' }}
          })
          .then(function (response) {
              self.props.history.push('/segmants', { some: 'state' })
              console.log(response);
          })
          .catch(function (response) {
              console.log(response);
          }
    )
    }
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
                                                    <i className="fa fa-gift"></i>New Segment </div>
                                            </div>
                                            <div className="portlet-body form">
                                                
                                                <form   className="form-horizontal"  enctype="multipart/form-data"  method="post" onSubmit={this.handleSubmit}>
                                                  <input type="hidden" name="id" value={this.state.id}  />
                                                    <div className="form-body">
                                                       <div className="form-group">
                                                            <label className="col-md-3 control-label">Thumb image</label>
                                                            <div className="col-md-4">
                                                                <div className="input-group">
                                                                    <img src={this.state.thumb_img} id="blah" /> 
                                                                    <br/>
                                                                    <span className="error">{this.state.thumb_img_error}</span>
                                                                    <input type="file" accept=".png,.jpg,.jpeg"    className="form-control "   onChange={this.handleChangeThumbImg}  id="imgInp"  /> </div>
                                                            </div>
                                                             
                                                            

                                                        </div>
                                                        

                                                        <div className="form-group">
                                                            <label className="col-md-3 control-label">Segment Name</label>
                                                            <div className="col-md-4">
                                                            <div className="input-group">
                                                                <input type="text"  name="segment_name"  className="form-control" placeholder="Segment Name"  onChange={this.handleChangeSegmentName}  value={this.state.segment_name} />
                                                            </div>
                                                            <span className="error">{this.state.segment_error}</span>
                                                            </div>
                                                        </div>

                                                 


                                                         <div className="form-group">
                                                            <label className="col-md-3 control-label">Class</label>
                                                            <div className="col-md-4">
                                                            <div className="input-group">
                                                            <select name="class_id" value={this.state.class_id}   onChange={this.handleChangeClassId}  className="form-control">
                                                               <option value="">Select Class</option>
                                                               {this.state.classes.map(post =>
                                                                <option value={post.id}>{post.class_name} </option>
                                                                )}
                                                               </select>                                                            
                                                            </div>
                                                            <span className="error">{this.state.class_id_error}</span>
                                                            </div>
                                                        </div>


                                                         





                                                     
                                                        <div className="form-group">
                                                            <label className="col-md-3 control-label">Release date</label>
                                                            <div className="col-md-4">
                                                                <div className="input-group">
                                                                <DatePicker
                                                                        name="release_date"
                                                                        selected={this.state.release_date}
                                                                        onChange={this.handleChangeRelease_date}
                                                                        dateFormat="yyyy-MM-dd"
                                                                    />
                                                                </div>
                                                                <span className="error">{this.state.release_date_error}</span>
                                                            </div>
                                                        </div>
                                                      


                                                   <div className="form-group">
                                                            <label className="col-md-3 control-label">Description</label>
                                                            <div className="col-md-4">
                                                            <div className="input-group">
                                                            <textarea  name="description"  className="form-control"  onChange={this.handleChangeDescription}  value={this.state.description}></textarea>
                                                                
                                                            </div>
                                                            <span className="error">{this.state.description_error}</span>
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

export default NewSegments
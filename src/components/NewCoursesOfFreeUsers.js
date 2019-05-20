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

class NewCoursesOfFreeUsers extends Component {
     constructor(){
        super()
     	this.state = {
     		userData:JSON.parse(localStorage.getItem("userData")),
		    data: [],
            id:'',
            title:'',
            title_error:'',
            description:'',
            description_error:'',
            from:new Date(),
            from_error:'',
            to:new Date(),
            to_error:'',

            file:'',
            file_error:'',
            position:'',
            position_error:'',
            thumb_img:'',
            thumb_img_error:'',
            levels:[],
            positions:[],
          }
          
          this.handleChangeFrom = this.handleChangeFrom.bind(this);
          this.handleChangeTo = this.handleChangeTo.bind(this);

     }
componentDidMount() {
    this.setState({local_association_id:this.state.userData.local_association_id});

   console.log(this.state);
      var url_string = window.location.href
      var url = new URL(url_string);
      var id = atob(url.searchParams.get("id"));
   
      axios.get(baseUrl('levels', 'api'))
      .then(res => {
         if(res.data.errorCode=='200'){
          const levels = res.data.data.map(obj => obj);
          this.setState({ levels }); }
      });
      axios.get(baseUrl('positions', 'api'))
      .then(res => {
         if(res.data.errorCode=='200'){
          const positions = res.data.data.map(obj => obj);
          this.setState({ positions }); }
      });
  
  }


  handleChangetitle = event =>{
        this.setState({title: event.target.value});
    }
    handleChangeDescription = event =>{
        this.setState({description: event.target.value});
    }
   

   handleBack = event =>{
                      this.props.history.push('/courses-of-free-users', { some: 'state' })

    }

    handleChangeFrom(date) {
        this.setState({
          from: date
        });
      }
      handleChangeTo(date) {
        this.setState({
          to: date
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
                   self.setState({thumb_img:  response.data.thumb_img  });
                   self.setState({thumb_img_show:  baseUrl(response.data.thumb_img, 'thumb')   });
                   console.log(self.state.thumb_img);
              })
              .catch(function (response) {
                  //handle error
                  console.log(response);
              })
    }

    handleChangeFile = event =>{
        const files = Array.from(event.target.files)
            const formData = new FormData()
            files.forEach((file, i) => {
              formData.append('file', file);
            })
            this.setState({file_error: 'Please wait file is uploading'   });

            var self = this;
           axios({
              method: 'post',
              url: baseUrl('upload-course-file', 'api'),
              data: formData,
              config: { headers: {'Content-Type': 'multipart/form-data' }}
              })
              .then(function (response) {
                  if(response.data.errorCode=='200'){
                    self.setState({file: response.data.data   });
                    self.setState({type: response.data.type   });
                    self.setState({file_error: ''   });

                  }else{
                    
                    self.setState({file_error: response.data.errorMsg });

                  }
                   
                    
              })
              .catch(function (response) {
                  //handle error
                  console.log(response);
              })
    }

    
  
    validate(){
        var returnVal=true;
        
        this.setState({ title_error: '', description_error:'' ,thumb_img_error:'',file_error:''});
        if(this.state.title==''){
            this.setState({ title_error: 'Please enter  name' });
            returnVal= false;
        }  

        if(this.state.description==''){
            this.setState({ description_error: 'please enter description' });
            returnVal= false;
        } 
        if(this.state.thumb_img==''){
            this.setState({ thumb_img_error: 'Please select a thumb img' });
            returnVal= false;
        } 
        if(this.state.file==''){
            this.setState({ file_error: 'Please select a ppt or video file' });
            returnVal= false;
        } 
        
        return returnVal;
    }


 handleSubmit= event =>{
  event.preventDefault();
   var self = this;
  var formData = new FormData(document.querySelector('form'));
  formData.append('thumb_img', this.state.thumb_img);
  formData.append('file', this.state.file);
  formData.append('type', this.state.type);

  
  if(this.validate()){
     axios({
          method: 'post',
          url: baseUrl('free-courses-by-admin', 'api'),
          data: formData,
          config: { headers: {'Content-Type': 'multipart/form-data' }}
          })
          .then(function (response) {
              self.props.history.push('/courses-of-free-users', { some: 'state' })
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
                                                    <i className="fa fa-gift"></i>New Courses Of Free Users </div>
                                            </div>
                                            <div className="portlet-body form">
                                                
                                                <form   className="form-horizontal"  enctype="multipart/form-data"  method="post" onSubmit={this.handleSubmit}>
                                                  <input type="hidden" name="id" value={this.state.id}  />
                                                    <div className="form-body">
                                                       <div className="form-group">
                                                            <label className="col-md-3 control-label">Thumb image</label>
                                                            <div className="col-md-4">
                                                                <div className="input-group">
                                                                    <img src={this.state.thumb_img_show} id="blah" /> 
                                                                    <br/>
                                                                    <span className="error">{this.state.thumb_img_error}</span>
                                                                    <input type="file" accept=".png,.jpg,.jpeg"    className="form-control "   onChange={this.handleChangeThumbImg}  id="imgInp"  /> </div>
                                                            </div>
                                                       </div>
                                                        

                                                        <div className="form-group">
                                                            <label className="col-md-3 control-label">Title</label>
                                                            <div className="col-md-4">
                                                            <div className="input-group">
                                                                <input type="text"  name="title"  className="form-control" placeholder="Title"  onChange={this.handleChangetitle}  value={this.state.title} />
                                                            </div>
                                                            <span className="error">{this.state.title_error}</span>
                                                            </div>
                                                        </div>

                                                    <div className="form-group">
                                                            <label className="col-md-3 control-label">Description</label>
                                                            <div className="col-md-4">
                                                            <div className="input-group">
                                                            <textarea  name="description"  onChange={this.handleChangeDescription}  className="form-control">{this.state.description}</textarea>
                                                               
                                                            </div>
                                                            <span className="error">{this.state.description_error}</span>
                                                            </div>
                                                        </div>


                                                         <div className="form-group">
                                                            <label className="col-md-3 control-label">PPT or Video</label>
                                                            <div className="col-md-4">
                                                            <div className="input-group">
                                                                <input type="file"    className="form-control"    onChange={this.handleChangeFile}   />
                                                            </div>
                                                            <span className="error">{this.state.file_error}</span>
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

export default NewCoursesOfFreeUsers
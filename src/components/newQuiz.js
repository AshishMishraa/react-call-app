
import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

import Header  from './Common/Header'
import Footer  from './Common/Footer'
import Sidebar  from './Common/Sidebar'
import baseUrl from '../CommonFunctions';

 
import logo from '.././assets/logo.png';




class newQuiz extends Component {
     constructor(){
        super()
     	this.state = {
     		userData:JSON.parse(localStorage.getItem("userData")),
		    data: [],
        id:'',
		    thumbImageBase:'https://s3.us-east-2.amazonaws.com/holdingcallassets/thumb_image/',
        quizBase:'https://s3.us-east-2.amazonaws.com/holdingcallassets/quiz/',
        
        segments:[],
        classes:[],
        description:'',
        thumb_img:'',
        class_id:'',
        segment_id:'',
        file:'',
        title:'',
        descriptionError:'',
        titleError:'',

		  }
     }
   


componentDidMount() {
   console.log(this.state);
      var url_string = window.location.href
      var url = new URL(url_string);
      var quiz_id = atob(url.searchParams.get("quiz"));
      console.log(url);

    axios.get(baseUrl('classes?local_association_id='+this.state.userData.local_association_id,'api') )
    .then(res => {
            if(res.data.errorCode=='200'){
            const classes = res.data.data.map(obj => obj);
            this.setState({ classes }); }
        });
  }

    handleChangeClassId = event =>{
         this.setState({class_id: event.target.value});
        axios.get(baseUrl('segments?local_association_id='+this.state.userData.local_association_id+'&class_id='+event.target.value,'api') )
        .then(res => {
        if(res.data.errorCode=='200'){
            const segments = res.data.data.map(obj => obj);
            this.setState({ segments }); }
        });

    }
    handleChangeSegment_id = event =>{
        this.setState({segment_id: event.target.value});

        

        
    }
    handleChangeTitle = event =>{
        this.setState({title: event.target.value});
    }

    handleChangeDescription = event =>{
        this.setState({description: event.target.value});
    }

   handleBack = event =>{
                      this.props.history.push('/my-quizs', { some: 'state' })

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
              url: baseUrl('upload-thumb-img','api'),
              data: formData,
              config: { headers: {'Content-Type': 'multipart/form-data' }}
              })
              .then(function (response) {
                   self.setState({thumb_img: response.data.thumb_img});
                   self.setState({thumb_img_url: this.state.thumbImageBase+response.data.thumb_img});
                   
 

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
            var self = this;
           axios({
              method: 'post',
              url: baseUrl('upload-quiz-file','api'),
              data: formData,
              config: { headers: {'Content-Type': 'multipart/form-data' }}
              })
              .then(function (response) {
                   self.setState({file: response.data.file});
                   console.log(self.state.file);
              })
              .catch(function (response) {
                  //handle error
                  console.log(response);
              })
    }





    validate(){
        var returnVal=true;
        this.setState({ thumb_imgError: '', titleError:'',class_id_error:'',segment_id_error:'',fileError:'',descriptionError:''});
       
        if(this.state.thumb_img==''){
            this.setState({ thumb_imgError: 'Please select a thumb image' });
            returnVal= false;
        }  

        if(this.state.title==''){
            this.setState({ titleError: 'Please enter  title' });
            returnVal= false;
        }  
        if(this.state.class_id==''){
            this.setState({ class_id_error: 'Please select a class' });
            returnVal= false;
        }  
        if(this.state.segment_id==''){
            this.setState({ segment_id_error: 'Please select a class' });
            returnVal= false;
        }  
        if(this.state.file==''){
            this.setState({ fileError: 'Please select a file' });
            returnVal= false;
        }  
        if(this.state.description==''){
            this.setState({ descriptionError: 'Please add some description' });
            returnVal= false;
        }  





        return returnVal;
    }


    
 handleSubmit= event =>{
  event.preventDefault();
   var self = this;
  var formData = new FormData(document.querySelector('form'));
  formData.append('id', this.state.id);
  formData.append('thumb_img', this.state.thumb_img);
  formData.append('file', this.state.file);
  formData.append('local_association_id', this.state.userData.local_association_id);
  formData.append('user_id', this.state.userData.id);

   if(this.validate()){
     axios({
          method: 'post',
          url: baseUrl('add-quiz','api'),
          data: formData,
          config: { headers: {'Content-Type': 'multipart/form-data' }}
          })
          .then(function (response) {
              //handle success

              self.props.history.push('/my-quizs', { some: 'state' })
              console.log(response);
          })
          .catch(function (response) {
              //handle error
              console.log(response);
          }
    )
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
                                                    <i className="fa fa-gift"></i>New Quiz </div>
                                            </div>
                                            <div className="portlet-body form">
                                                
                                                <form   className="form-horizontal"  enctype="multipart/form-data"  method="post" onSubmit={this.handleSubmit}>
                                                    <div className="form-body">
                                                       <div className="form-group">
                                                            <label className="col-md-3 control-label">Thumb image</label>
                                                            <div className="col-md-4">
                                                                <div className="input-group">
                                                                    <img src={this.state.thumb_img_url} id="blah" /> 
                                                                    <input type="file" accept=".png,.jpg,.jpeg"    className="form-control "   onChange={this.handleChangeThumbImg}  id="imgInp"  /> </div>
                                                                    <span className="error">{this.state.thumb_imgError}</span> 
                                                            </div>
                                                            
                                                        </div>


                                                        <div className="form-group">
                                                            <label className="col-md-3 control-label">Title</label>
                                                            <div className="col-md-4">
                                                            <div className="input-group">
                                                                <input type="text"  name="title"  className="form-control" placeholder="Enter title"  onChange={this.handleChangeTitle}  value={this.state.title} />
                                                            </div>
                                                            <span className="error">{this.state.titleError}</span>
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
                                                            <label className="col-md-3 control-label">Segment</label>
                                                            <div className="col-md-4">
                                                            <div className="input-group">
                                                            <select name="segment_id" value={this.state.segment_id}   onChange={this.handleChangeSegment_id}  className="form-control">
                                                               <option value="">Select Segment</option>
                                                               {this.state.segments.map(post =>
                                                                <option value={post.id}>{post.segment_name} </option>
                                                                )}
                                                               </select>                                                            
                                                            </div>
                                                            <span className="error">{this.state.segment_id_error}</span>
                                                            </div>
                                                        </div>




                                                        <div className="form-group">
                                                            <label className="col-md-3 control-label">Description</label>
                                                            <div className="col-md-4">
                                                                <div className="input-group">
                                                                   <textarea className="form-control"  name="description" value={this.state.description} onChange={this.handleChangeDescription}  />

                                                                </div>
                                                                <span className="error">{this.state.descriptionError}</span>
                                                            </div>
                                                        </div>
                                                      
                                                       <div className="form-group">
                                                            <label className="col-md-3 control-label">Quiz XML</label>
                                                            <div className="col-md-4">
                                                                <input type="file"  accept=".xml"  className="form-control"  onChange={this.handleChangeFile}  />
                                                                <span className="error">{this.state.fileError}</span>
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

export default newQuiz
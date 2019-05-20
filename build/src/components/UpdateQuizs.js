import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

import Header  from './Common/Header'
import Footer  from './Common/Footer'
import Sidebar  from './Common/Sidebar'

 
import logo from '.././assets/logo.png';




class UpdateQuizs extends Component {
     constructor(){
        super()
     	this.state = {
     		userData:JSON.parse(localStorage.getItem("userData")),
		    data: [],
        id:'',
		    thumbImageBase:'https://s3.us-east-2.amazonaws.com/holdingcallassets/thumb_image/',
        quizBase:'https://s3.us-east-2.amazonaws.com/holdingcallassets/quiz/',
        

        description:'',
        thumb_img:'',
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


    axios.post('http://18.222.166.163:3000/quiz?id='+quiz_id)
      .then(res => {
             if(res.data.errorCode=='200'){
              var quizs=(res.data.quiz);
                     const data = quizs[0];


                      this.setState({title: data.title});
                      this.setState({description: data.description});
                      this.setState({id: data.id});

                     this.setState({ data });
              }
      });
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
              url: 'http://18.222.166.163:3000/upload-thumb-img',
              data: formData,
              config: { headers: {'Content-Type': 'multipart/form-data' }}
              })
              .then(function (response) {
                   self.setState({thumb_img: response.data.thumb_img});
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
              url: 'http://18.222.166.163:3000/upload-quiz-file',
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



 handleSubmit= event =>{
  event.preventDefault();
   var self = this;
  var formData = new FormData(document.querySelector('form'));
  formData.append('id', this.state.id);
  formData.append('thumb_img', this.state.thumb_img);
  formData.append('file', this.state.file);

 
  if(this.state.title !='' && this.state.description !=''){
     axios({
          method: 'post',
          url: 'http://18.222.166.163:3000/update-quiz',
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
                                                    <i className="fa fa-gift"></i>Update Quiz: {this.state.data.title} </div>
                                            </div>
                                            <div className="portlet-body form">
                                                
                                                <form   className="form-horizontal"  enctype="multipart/form-data"  method="post" onSubmit={this.handleSubmit}>
                                                    <div className="form-body">
                                                       <div className="form-group">
                                                            <label className="col-md-3 control-label">Thumb image</label>
                                                            <div className="col-md-4">
                                                                <div className="input-group">
                                                                    <img src={this.state.thumbImageBase+this.state.data.thumb_img} id="blah" /> 
                                                                    <input type="file" accept=".png,.jpg,.jpeg"    className="form-control "   onChange={this.handleChangeThumbImg}  id="imgInp"  /> </div>
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
                                                                <a target="_blank" href={this.state.quizBase+this.state.data.file} > download Quiz</a>
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

export default UpdateQuizs
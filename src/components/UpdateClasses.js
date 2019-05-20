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

class UpdateClasses extends Component {
     constructor(){
        super()
     	this.state = {
     		userData:JSON.parse(localStorage.getItem("userData")),
		    data: [],
            id:'',
            class_name:'',
            class_name_error:'',
            local_association_id:'',
            from:new Date(),
            from_error:'',
            to:new Date(),
            to_error:'',

            level:'',
            level_error:'',
            position:'',
            position_error:'',
            thumb_img:'',
            levels:[],
            positions:[],
          }
          
          this.handleChangeFrom = this.handleChangeFrom.bind(this);
          this.handleChangeTo = this.handleChangeTo.bind(this);

     }
componentDidMount() {
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
    axios.get(baseUrl('class-by-id?id='+id, 'api'))
      .then(res => {
             if(res.data.errorCode=='200'){
                     const data = res.data.data;
                     this.setState({id: data.id});
                     this.setState({class_name: data.class_name});
                     this.setState({local_association_id: data.local_association_id});
                     this.setState({from: new Date(data.from) });
                     this.setState({to: new Date(data.to)});
                     this.setState({level: data.level});
                     this.setState({position: data.position});
                     this.setState({thumb_img: data.thumb_img});
                     
                       this.setState({ data });
              }
      });
  }


    handleChangeClassName = event =>{
        this.setState({class_name: event.target.value});
    }
    handleChangeLevel = event =>{
        this.setState({level: event.target.value});
    }
    handleChangePosition = event =>{
        this.setState({position: event.target.value});
    }
     

   handleBack = event =>{
                      this.props.history.push('/classes', { some: 'state' })

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
        this.setState({ class_name_error: '', level_error:'' ,position_error:'',from_error:'',to_error:''});
        if(this.state.class_name==''){
            this.setState({ class_name_error: 'Please enter  name' });
            returnVal= false;
        }  

        if(this.state.level==''){
            this.setState({ level_error: 'Please select  level' });
            returnVal= false;
        } 
        if(this.state.position==''){
            this.setState({ position_error: 'Please select position' });
            returnVal= false;
        } 
        if(this.state.from==''){
            this.setState({ from_error: 'Please enter start date' });
            returnVal= false;
        } 
        if(this.state.to==''){
            this.setState({ to_error: 'Please enter end date' });
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
  if(this.validate()){
     axios({
          method: 'post',
          url: baseUrl('update-class', 'api'),
          data: formData,
          config: { headers: {'Content-Type': 'multipart/form-data' }}
          })
          .then(function (response) {
              self.props.history.push('/classes', { some: 'state' })
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
                                                    <i className="fa fa-gift"></i>Update Class </div>
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
                                                                    <input type="file" accept=".png,.jpg,.jpeg"    className="form-control "   onChange={this.handleChangeThumbImg}  id="imgInp"  /> </div>
                                                            </div>
                                                        </div>


                                                        <div className="form-group">
                                                            <label className="col-md-3 control-label">Class Name</label>
                                                            <div className="col-md-4">
                                                            <div className="input-group">
                                                                <input type="text"  name="class_name"  className="form-control" placeholder="Class Name"  onChange={this.handleChangeClassName}  value={this.state.class_name} />
                                                            </div>
                                                            <span className="error">{this.state.class_name_error}</span>
                                                            </div>
                                                        </div>

                                                    <div className="form-group">
                                                            <label className="col-md-3 control-label">Level</label>
                                                            <div className="col-md-4">
                                                            <div className="input-group">
                                                            <select name="level" value={this.state.level}  onChange={this.handleChangeLevel}  className="form-control">
                                                               <option value="">Select Level</option>
                                                               {this.state.levels.map(post =>
                                                                <option value={post.id}>{post.level_name} </option>
                                                                )}
                                                               </select>                                                            </div>
                                                            <span className="error">{this.state.level_error}</span>
                                                            </div>
                                                        </div>


                                                         <div className="form-group">
                                                            <label className="col-md-3 control-label">Position</label>
                                                            <div className="col-md-4">
                                                            <div className="input-group">
                                                            <select name="position" value={this.state.position}   onChange={this.handleChangePosition}  className="form-control">
                                                               <option value="">Select Position</option>
                                                               {this.state.positions.map(post =>
                                                                <option value={post.id}>{post.position_name} </option>
                                                                )}
                                                               </select>                                                            
                                                            </div>
                                                            <span className="error">{this.state.position_error}</span>
                                                            </div>
                                                        </div>


                                                         





                                                        <div className="form-group">
                                                            <label className="col-md-3 control-label">Start Date</label>
                                                            <div className="col-md-4">
                                                                <div className="input-group">
                                                                <DatePicker
                                                                        name="from"
                                                                        selected={this.state.from}
                                                                        onChange={this.handleChangeFrom}
                                                                        dateFormat="yyyy-MM-dd"
                                                                    />
                                                                </div>
                                                                <span className="error">{this.state.from_error}</span>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="col-md-3 control-label">End Date</label>
                                                            <div className="col-md-4">
                                                                <div className="input-group">
                                                                <DatePicker
                                                                        name="to"
                                                                        selected={this.state.to}
                                                                        onChange={this.handleChangeTo}
                                                                        dateFormat="yyyy-MM-dd"
                                                                    />
                                                                </div>
                                                                <span className="error">{this.state.to_error}</span>
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

export default UpdateClasses
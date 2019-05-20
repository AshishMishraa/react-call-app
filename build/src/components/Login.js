import React, {Component} from 'react'
import axios from 'axios';

import logo from '.././assets/logo.png';
 





class Login extends Component {

 constructor(){
    super()
 	this.state={
      email:'',
      password:'',
      emailError:'',
      passwordError:''
 	}
 }


handleChangeEmail = event =>{
    this.setState({email: event.target.value});
}

handleChangePassword = event =>{
    this.setState({password: event.target.value});
}

 handleSubmit= event =>{
	event.preventDefault();
	
	if(this.state.email !='' && this.state.password !=''){
		var urlA='email='+this.state.email+'&password='+this.state.password;
		axios.post('http://18.222.166.163:3000/login?'+urlA)
	      .then(res => {
	      	//const datas = res.data.errorCode.map(obj => obj);
	      	if(res.data.errorCode=='200'){



				if (typeof(Storage) !== "undefined") {
				  // Store
				  //localStorage.setItem("uData", res.data.user[0]);
				  var userData=res.data.user[0];
				  localStorage.setItem("userData", JSON.stringify(userData));
				  console.log(localStorage.getItem("userData"));
				} else {
				  console.log("Sorry, your browser does not support Web Storage...");
				}



            this.props.history.push('/my-quizs', { some: 'state' })
	      	}
    	   else{
    	   	this.setState({emailError: 'Something is wrong',passwordError: ' '});
    	   }

	        //const data = res.data.quizs.map(obj => obj);
	        // this.setState({ data }); 
	      });
	  }else{
       this.setState({emailError: 'please enter your email',passwordError: 'please enter your password',});

	  }
	


  
	console.log(this.state);
 }

 render(){
 	return (
 		<center>
          <div className="login-content">
          
		           
			        <div className="content">
			        <div className="logo">
		            <a href="index.html">
		                <img src={logo} alt="" /> </a>
		            </div>
			            <form className="login-form"  method="post" onSubmit={this.handleSubmit}>
			                <h3 className="form-title font-green">Sign In</h3>
			                <div className="alert alert-danger display-hide">
			                    <button className="close" data-close="alert"></button>
			                    <span> Enter any username and password. </span>
			                </div>
			                <div className="form-group">
			                    <label className="control-label visible-ie8 visible-ie9">Email</label>
			                    <input 
			                           className="form-control form-control-solid placeholder-no-fix" 
			                           type="text" 
			                           autoComplete="off" 
			                           placeholder="login@login.com" 
			                           name="username" 
			                           value={this.state.name}
			                           onChange={this.handleChangeEmail}
			                      /> 
			                      <span className="error">{this.state.emailError}</span>
			                </div>

			                <div className="form-group">
			                    <label className="control-label visible-ie8 visible-ie9">Password</label>
			                    <input 
			                           className="form-control form-control-solid placeholder-no-fix" 
			                           type="password" 
			                           autoComplete="off" 
			                           placeholder="Password" 
			                           name="password" 
			                           value={this.state.name}
			                           onChange={this.handleChangePassword}
			                    /> 
			                    <span className="error">{this.state.passwordError}</span>
			                </div>
			                <div className="form-actions">
			                    <button type="submit" className="btn green uppercase">Login</button>
			                    
			                    <a href="javascript:;" id="forget-password" className="forget-password">Forgot Password?</a>
			                </div>
			               
			            </form>
			        </div>
			        <div className="copyright"> 2019 © HoldingCall. </div>
          </div>
          </center>
 		)
 }

}

export default Login
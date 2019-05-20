import React, {Component} from 'react'
import axios from 'axios';
import baseUrl from '../CommonFunctions';

import logo from '.././assets/logo.png';
 





class Login extends Component {

 constructor(){
    super()
 	this.state={
      email:'',
      password:'',
      emailError:'',
	  passwordError:'',
	  tab:'',
	  msg:'',
	  otp:'',
	  otpError:'',
	  new_password:'',
	  newPasswordError:'',
	  confirmPasswordError:'',
	  confirm_password:''
 	}
 }

 activatePasswordTab = event =>{
    this.setState({tab: 'forget-password',email:''});
}

activateLoginTab = event =>{
    this.setState({tab: 'login'});
}

handleChangeEmail = event =>{
    this.setState({email: event.target.value});
}


componentDidMount() {    
	 this.setState({tab: 'login'});
 }


handleChangeConfirmPassword = event =>{
    this.setState({confirm_password: event.target.value,confirmPasswordError:''});
}
handleChangeOtp = event =>{
    this.setState({otp: event.target.value, otpError:''});
}

handleChangeNewPassword = event =>{
    this.setState({new_password: event.target.value,newPasswordError:''});
}

handleChangePassword = event =>{
    this.setState({password: event.target.value});
}


handleResetPassword= event =>{
	event.preventDefault();
	if(this.state.email !=''){
 		var urlA='email='+this.state.email;
		this.setState({emailError: ''});
		axios.post(baseUrl('reset-password?'+urlA,'api'))
	      .then(res => {
			  if(res.data.errorCode=='200'){
				  this.setState({tab: 'update-password',msg:res.data.data});
			   }else{
				this.setState({emailError: res.data.errorMsg});
			   }
		  })
	}
	else{ this.setState({emailError: 'please enter your email'}); }	 
}

handleUpdatePassword= event =>{
	event.preventDefault();
	if(this.state.otp == ''){
		this.setState({otpError: 'Please enter otp'});
		return false;
	}
	if(this.state.new_password == ''){
		this.setState({newPasswordError: 'Please enter a password'});
		return false;
	}
	if(this.state.confirm_password == ''){
		this.setState({confirmPasswordError: 'Please confirm password'});
		return false;
	}
	if(this.state.new_password !== this.state.confirm_password){
		this.setState({confirmPasswordError: 'new password and confirm password must be same'});
		return false;
	}

	var urlA='otp='+this.state.otp+'&password='+this.state.new_password;
	this.setState({emailError: ''});
	axios.post(baseUrl('set-password?'+urlA,'api'))
	  .then(res => {
		  if(res.data.errorCode=='200'){
			  this.setState({tab: 'login',msg:res.data.data});
		   }else{
			this.setState({otpError: res.data.errorMsg});
		   }
	  })







}


 handleSubmit= event =>{
	event.preventDefault();
	
	if(this.state.email !=='' && this.state.password !=''){
		var urlA='email='+this.state.email+'&password='+this.state.password;
		 

		
		axios.post(baseUrl('login?'+urlA,'api'))
	      .then(res => {
	      	//const datas = res.data.errorCode.map(obj => obj);
	      	if(res.data.errorCode=='200'){
				if (typeof(Storage) !== "undefined") {
				  // Store
				  //localStorage.setItem("uData", res.data.user[0]);
				  var userData=res.data.user[0];
				  localStorage.setItem("userData", JSON.stringify(userData));
				  localStorage.setItem("isSuperAdmin", 'false');
				  localStorage.setItem("isLocalAssociationAdmin", 'false');
				  localStorage.setItem("isStateAssociationAdmin", 'false');
				  localStorage.setItem("isTeacher", 'false');


					if(userData.role=='1'){
						localStorage.setItem("isSuperAdmin", 'true');
						localStorage.setItem("login_user", 'super-admin');
						localStorage.setItem("active_user", 'super-admin');
						localStorage.setItem("superAdminData", JSON.stringify(userData));
						localStorage.setItem("loginUserData", JSON.stringify(userData));
					}
					if(userData.role=='2'){
						localStorage.setItem("login_user", 'state-admin');
						localStorage.setItem("active_user", 'state-admin');
						localStorage.setItem("isStateAssociationAdmin", 'true');
						localStorage.setItem("stateAssociationAdminData", JSON.stringify(userData));
						localStorage.setItem("loginUserData", JSON.stringify(userData));

					}
					if(userData.role=='3'){
						localStorage.setItem("login_user", 'local-admin');
						localStorage.setItem("active_user", 'local-admin');
						localStorage.setItem("isLocalAssociationAdmin", 'true');
						localStorage.setItem("LocalAssociationAdminData", JSON.stringify(userData));
						localStorage.setItem("loginUserData", JSON.stringify(userData));

					}
					if(userData.role=='4'){
						localStorage.setItem("login_user", 'teacher');
						localStorage.setItem("active_user", 'teacher');
						localStorage.setItem("isTeacher", 'true');
						localStorage.setItem("teacherData", JSON.stringify(userData));
						localStorage.setItem("loginUserData", JSON.stringify(userData));


					}
				} else {
				  console.log("Sorry, your browser does not support Web Storage...");
				}


            window.location='/dashboard';
           //this.props.history.push('/my-quizs', { some: 'state' })
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
          <div className="login-content ff">
          
		           
			        <div className="content">
			        <div className="logo">
		            <a href="index.html">
		                <img src={logo} alt="" className="loginlogo" /> </a>
		            </div>



					{this.state.tab=='login' &&(
			            <form className="login-form"  method="post" onSubmit={this.handleSubmit}>
			                <h3 className="form-title font-green">Sign In</h3>
							<span className="success">{this.state.msg}</span>

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
			                    
			                    <a href="javascript:;"  onClick={(e) => this.activatePasswordTab()}  id="forget-password" className="forget-password">Forgot Password?</a>
			                </div>
			               
			            </form>
                     )}
                         {this.state.tab=='forget-password' &&(     
							 <form className="login-form"  method="post" onSubmit={this.handleResetPassword}>
							 <h3 className="form-title font-green">Forgot Password</h3>
							 <div className="alert alert-danger display-hide">
								 <button className="close" data-close="alert"></button>
								 <span> Enter your email </span>
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
 
							  
							  
							 <div className="form-actions">
								 <button type="submit" className="btn green uppercase pull-left">Submit</button>
								 
								 <a href="javascript:;" id="forget-password"   onClick={(e) => this.activateLoginTab()}  className="forget-password">Login</a>
							 </div>
							
						 </form>
						)}

						  {this.state.tab=='update-password' &&(     
							 <form className="login-form"  method="post" onSubmit={this.handleUpdatePassword}>
							 <h3 className="form-title font-green">Update Password</h3>
							 <span className="success">{this.state.msg}</span>
							 <div className="alert alert-danger display-hide">
								 <button className="close" data-close="alert"></button>
								 <span> Enter your email </span>
							 </div>
							 <div className="form-group">
								 <label className="control-label visible-ie8 visible-ie9">OTP</label>
								 <input 
										className="form-control form-control-solid placeholder-no-fix" 
										type="text" 
										autoComplete="off" 
										placeholder="123456" 
										name="otp" 
										value={this.state.otp}
										onChange={this.handleChangeOtp}
								   /> 
								   <span className="error">{this.state.otpError}</span>
							 </div>

							 <div className="form-group">
								 <label className="control-label visible-ie8 visible-ie9">New Password</label>
								 <input 
										className="form-control form-control-solid placeholder-no-fix" 
										type="password" 
										autoComplete="off" 
										placeholder="********" 
										name="new_password" 
										value={this.state.new_password}
										onChange={this.handleChangeNewPassword}
								   /> 
								   <span className="error">{this.state.newPasswordError}</span>
							 </div>
							 <div className="form-group">
								 <label className="control-label visible-ie8 visible-ie9">Confirm Password</label>
								 <input 
										className="form-control form-control-solid placeholder-no-fix" 
										type="password" 
										autoComplete="off" 
										placeholder="*******" 
										name="confirm_password" 
										value={this.state.confirm_password}
										onChange={this.handleChangeConfirmPassword}
								   /> 
								   <span className="error">{this.state.confirmPasswordError}</span>
							 </div>
							  
							 <div className="form-actions">
								 <button type="submit" className="btn green uppercase pull-left">Submit</button>
								 
								 <a href="javascript:;" id="forget-password"   onClick={(e) => this.activateLoginTab()}  className="forget-password">Login</a>
							 </div>
							
						 </form>
						)}

			        </div>
           </div>
          </center>
 		)
 }

}

export default Login
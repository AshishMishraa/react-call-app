import React, {Component} from 'react'
 import ReactDOM from 'react-dom';
 import axios from 'axios';
 import baseUrl from '../../CommonFunctions';
 import AuthUser from '../../AuthUser';

 
class Sidebar extends Component {
    
    constructor(){
        super()
        this.state = {
           data: [],
           authUser:AuthUser(),
           data:JSON.parse(localStorage.getItem("userData")),
           active_link:'/dashboard'
         }
     }

    handleLogin(){
       if(this.state.authUser.login_user=='super-admin'){
            localStorage.setItem("userData", localStorage.getItem("superAdminData"));
            localStorage.setItem("active_user", 'super-admin');
            localStorage.setItem("isStateAssociationAdmin", 'false');
            localStorage.setItem("stateAssociationAdminData", '');
            localStorage.setItem("superAdminData", localStorage.getItem("superAdminData"));
            localStorage.setItem("isLocalAssociationAdmin", 'false');
            localStorage.setItem("LocalAssociationAdminData", '');

       }
       if(this.state.authUser.login_user=='state-admin'){
            localStorage.setItem("userData", localStorage.getItem("stateAssociationAdminData"));
            localStorage.setItem("active_user", 'state-admin');
            localStorage.setItem("isStateAssociationAdmin", 'true');
            localStorage.setItem("stateAssociationAdminData", localStorage.getItem("stateAssociationAdminData"));
            localStorage.setItem("isLocalAssociationAdmin", 'false');
            localStorage.setItem("LocalAssociationAdminData", '');
       }


      
      
 



        window.location=baseUrl('dashboard');         
    }

    componentDidMount() {
        var url_string = window.location.href
        var url = new URL(url_string);
        this.setState({active_link:url.pathname});
    }
    handleGo(url,e){
        console.log();
    // this.props.history.push(url, { some: 'state' })
    }   
render() {

	return (
          <div className="page-sidebar-wrapper">
                <div className="page-sidebar navbar-collapse collapse">
                    
                      

                        {this.state.authUser.active_user=='super-admin' &&(
                        //SUPER ADMIN MENU START   
                        <ul className="page-sidebar-menu  page-header-fixed " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200" >
                                        <li className="sidebar-toggler-wrapper hide">
                                            <div className="sidebar-toggler"> </div>
                                        </li>
                                        <li className="sidebar-search-wrapper">
                                            
                                        
                                        </li>
                                        <li className={this.state.active_link =='/dashboard' ? 'nav-item start active' : 'nav-item '}  >
                                            <a href={baseUrl('dashboard')} className= "nav-link nav-toggle   ">
                                                <i className="icon-home"></i>
                                                <span className="title">Dashboard</span>
                                                <span className="arrow"></span>
                                            </a>
                                            
                                        </li>
                                        <li className={this.state.active_link =='/state-associations' ? 'nav-item start active' : 'nav-item '}>
                                            <a href={baseUrl('state-associations')}       className="nav-link nav-toggle">
                                                <i className="icon-diamond"></i>
                                                <span className="title">State Associations</span>
                                                <span className="arrow"></span>
                                            </a>
                                        </li>
                                        <li className={this.state.active_link =='/state-associations-admin' ? 'nav-item start active' : 'nav-item '}>
                                            <a href={baseUrl('state-associations-admin')}       className="nav-link nav-toggle">
                                                <i className="icon-puzzle"></i>
                                                <span className="title">State Associations Admin</span>
                                                <span className="arrow"></span>
                                            </a>
                                        </li>
                                        <li className={this.state.active_link =='/levels' ? 'nav-item start active' : 'nav-item '}>
                                            <a href={baseUrl('levels')}       className="nav-link nav-toggle">
                                            <i class="fa fa-ellipsis-v"></i>
                                                <span className="title">Levels</span>
                                                <span className="arrow"></span>
                                            </a>
                                        </li>
                                        <li className={this.state.active_link =='/positions' ? 'nav-item start active' : 'nav-item '}>
                                            <a href={baseUrl('positions')}       className="nav-link nav-toggle">
                                                <i className="icon-paper-plane"></i>
                                                <span className="title">Positions</span>
                                                <span className="arrow"></span>
                                            </a>
                                        </li>
                                        <li className={this.state.active_link =='/courses-of-free-users' ? 'nav-item start active' : 'nav-item '}>
                                            <a href={baseUrl('courses-of-free-users')}       className="nav-link nav-toggle">
                                                <i className="icon-wallet"></i>
                                                <span className="title">Courses Of free users</span>
                                                <span className="arrow"></span>
                                            </a>
                                        </li>

                                </ul>
                       //SUPER ADMIN MENU END   
                        )}

                        {this.state.authUser.active_user=='state-admin' &&(
                            //STATE ADMIN MENU START   
                            <ul className="page-sidebar-menu  page-header-fixed " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200" >
                                    <li className="sidebar-toggler-wrapper hide">
                                        <div className="sidebar-toggler"> </div>
                                    </li>
                                    <li className="sidebar-search-wrapper">
                                        
                                    
                                    </li>
                                    <li className={this.state.active_link =='/dashboard' ? 'nav-item start active' : 'nav-item '}>
                                        <a href={baseUrl('dashboard')} className="nav-link nav-toggle">
                                            <i className="icon-home"></i>
                                            <span className="title">Dashboard</span>
                                            <span className="arrow"></span>
                                        </a>
                                        
                                    </li>
                                    <li className={this.state.active_link =='/local-associations' ? 'nav-item start active' : 'nav-item '}>
                                        <a href={baseUrl('local-associations')}       className="nav-link nav-toggle">
                                            <i className="icon-pointer"></i>
                                            <span className="title">Local Associations</span>
                                            <span className="arrow"></span>
                                        </a>
                                    </li>
                                    <li className={this.state.active_link =='/local-associations-admin' ? 'nav-item start active' : 'nav-item '}>
                                        <a href={baseUrl('local-associations-admin')}       className="nav-link nav-toggle">
                                            <i className="icon-pointer"></i>
                                            <span className="title">Local Associations Admin</span>
                                            <span className="arrow"></span>
                                        </a>
                                    </li>
                            </ul>
                            //STATE ADMIN MENU END 

                         )}


                         {this.state.authUser.active_user=='local-admin' &&(
                            //STATE ADMIN MENU START   
                            <ul className="page-sidebar-menu  page-header-fixed " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200" >
                                        <li className="sidebar-toggler-wrapper hide">
                                            <div className="sidebar-toggler"> </div>
                                        </li>
                                        <li className="sidebar-search-wrapper">
                                            
                                        
                                        </li>
                                        <li className={this.state.active_link =='/dashboard' ? 'nav-item start active' : 'nav-item '}>
                                            <a href={baseUrl('dashboard')} className="nav-link nav-toggle">
                                                <i className="icon-home"></i>
                                                <span className="title">Dashboard</span>
                                                <span className="arrow"></span>
                                            </a>
                                            
                                        </li>
                                        <li className={this.state.active_link =='/classes' ? 'nav-item start active' : 'nav-item '}>
                                            <a href={baseUrl('classes')}       className="nav-link nav-toggle">
                                                <i className="icon-pointer"></i>
                                                <span className="title">Classes</span>
                                                <span className="arrow"></span>
                                            </a>
                                        </li>

                                        <li className={this.state.active_link =='/segmants' ? 'nav-item start active' : 'nav-item '}>
                                            <a href={baseUrl('segmants')}       className="nav-link nav-toggle">
                                                <i className="icon-pointer"></i>
                                                <span className="title">Segmants</span>
                                                <span className="arrow"></span>
                                            </a>
                                        </li>

                                        <li className={this.state.active_link =='/teachers' ? 'nav-item start active' : 'nav-item '}>
                                            <a href={baseUrl('teachers')}       className="nav-link nav-toggle">
                                                <i className="icon-pointer"></i>
                                                <span className="title">Teachers</span>
                                                <span className="arrow"></span>
                                            </a>
                                        </li>

                                        <li className={this.state.active_link =='/students' ? 'nav-item start active' : 'nav-item '}>
                                            <a href={baseUrl('students')}       className="nav-link nav-toggle">
                                                <i className="icon-pointer"></i>
                                                <span className="title">Students</span>
                                                <span className="arrow"></span>
                                            </a>
                                        </li>
                            </ul>
                            //LOCAL ADMIN MENU END 

                         )}

                         {this.state.authUser.active_user=='teacher' &&(
                            //teacher MENU START   
                                   <ul className="page-sidebar-menu  page-header-fixed " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200" >
                                        <li className="sidebar-toggler-wrapper hide">
                                            <div className="sidebar-toggler"> </div>
                                        </li>
                                        <li className="sidebar-search-wrapper">
                                            
                                        
                                        </li>
                                        <li className={this.state.active_link =='/dashboard' ? 'nav-item start active' : 'nav-item '}>
                                            <a href={baseUrl('dashboard')} className="nav-link nav-toggle">
                                                <i className="icon-home"></i>
                                                <span className="title">Dashboard</span>
                                                <span className="arrow"></span>
                                            </a>
                                            
                                        </li>
                                        <li className={this.state.active_link =='/my-quizs' ? 'nav-item start active' : 'nav-item '}
                                        >
                                            <a href={baseUrl('my-quizs')}       className="nav-link nav-toggle">
                                                <i className="icon-pointer"></i>
                                                <span className="title">My-Quizs</span>
                                                <span className="arrow"></span>
                                            </a>
                                        </li>
                                        
                        
                                </ul>
                        //teacher MENU END 

                        )}

                        {this.state.authUser.active_user !=this.state.authUser.login_user &&(   
                            <ul className="page-sidebar-menu  page-header-fixed " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200" >
                                    <li className="sidebar-toggler-wrapper bg-blue">
                                                <a href= "javascript:void(0);" onClick={(e) => this.handleLogin()} className="nav-link nav-toggle">
                                                         <span className="title">Back to Account</span>
                                                     </a>
                                    </li>
                                    <li className="sidebar-toggler-wrapper bg-blue">
                                                <a href= "javascript:void(0);"  className="nav-link nav-toggle">
                                                         <span className="title">Login as- <span className="loginUserName"> {this.state.data.name} </span></span>
                                                     </a>
                                    </li>
                            </ul>   
                        )} 



 

                    
                    
                </div>
            </div>  
     
             
		)
  }
}

export default Sidebar 
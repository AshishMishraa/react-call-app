import React, {Component} from 'react'
import logo from '../.././assets/logo.png';
import baseUrl from '../../CommonFunctions';



class Header extends Component {

    handleGoEdit(){
        localStorage.setItem("userData", 'false');
        localStorage.setItem("isSuperAdmin", 'false');
        localStorage.setItem("isLocalAssociationAdmin", 'false');
        localStorage.setItem("isStateAssociationAdmin", 'false');
        localStorage.setItem("isTeacher", 'false');
        window.location=baseUrl();
    }



render() {
	return (
             <div className="page-header navbar navbar-fixed-top">
            <div className="page-header-inner ">
                <div className="page-logo">
                    <a href="">
                        <img src={logo} alt="logo" className="logo-default" /> </a>
                    <div className="menu-toggler sidebar-toggler"> <i class="fa fa-bars" ></i></div>
                </div>
                <a  className="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse"> </a>
              
                <div className="top-menu">
                    <ul className="nav navbar-nav pull-right">
                        
                   
               
                     


                        <li className=" dropdown-quick-sidebar-toggler">
                            <a href="javascript:;" onClick={(e) => this.handleGoEdit()} className="dropdown-toggle">
                                <i className="icon-logout"></i>
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
     
             
		)
  }
}

export default Header 
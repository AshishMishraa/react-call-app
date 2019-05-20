import React, {Component} from 'react'
import logo from '../.././assets/logo.png';

class Header extends Component {



render() {
	return (
             <div className="page-header navbar navbar-fixed-top">
            <div className="page-header-inner ">
                <div className="page-logo">
                    <a href="index.html">
                        <img src={logo} alt="logo" className="logo-default" /> </a>
                    <div className="menu-toggler sidebar-toggler"> </div>
                </div>
                <a href="javascript:;" className="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse"> </a>
              
                <div className="top-menu">
                    <ul className="nav navbar-nav pull-right">
                        
                   
               
                    
                        <li className="dropdown dropdown-quick-sidebar-toggler">
                            <a href="javascript:;" className="dropdown-toggle">
                                <i className="icon-logout"></i>
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
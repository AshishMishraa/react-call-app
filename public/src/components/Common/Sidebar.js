import React, {Component} from 'react'
class Sidebar extends Component {



render() {
	return (
          <div className="page-sidebar-wrapper">
                <div className="page-sidebar navbar-collapse collapse">
                    <ul className="page-sidebar-menu  page-header-fixed " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200" >
                        <li className="sidebar-toggler-wrapper hide">
                            <div className="sidebar-toggler"> </div>
                        </li>
                        <li className="sidebar-search-wrapper">
                            
                           
                        </li>
                        <li className="nav-item start ">
                            <a href="javascript:;" className="nav-link nav-toggle">
                                <i className="icon-home"></i>
                                <span className="title">Dashboard</span>
                                <span className="arrow"></span>
                            </a>
                            
                        </li>
                       
                        <li className="nav-item  ">
                            <a href="http://18.222.166.163:3001/my-quizs" className="nav-link nav-toggle">
                                <i className="icon-pointer"></i>
                                <span className="title">My-Quizs</span>
                                <span className="arrow"></span>
                            </a>
                        </li>
                       
                        
                    </ul>
                    
                </div>
            </div>  
     
             
		)
  }
}

export default Sidebar 
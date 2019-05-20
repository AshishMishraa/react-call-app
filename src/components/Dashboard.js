import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';
import Header  from './Common/Header'
import Footer  from './Common/Footer'
import Sidebar  from './Common/Sidebar'
import baseUrl from '../CommonFunctions';

 

import logo from '.././assets/logo.png';




class Classes extends Component {
     constructor(){
        super()
     	this.state = {
             userData:JSON.parse(localStorage.getItem("userData")),
             active_user:localStorage.getItem("active_user"),
             total_quizs:'',
             total_submitted_quizs:'',
             total_reviewed_quizs:'',
             total_students:'',

             StateAssociation:'',
             LocalAssociation:'',
             Teachers:'',
             Students:'',
             Levels:'',
             Positions:'',




		    data: [],
 		  }
     }
   
     handleGoEdit(url, e){
  	  this.props.history.push(url, { some: 'state' })
     }

componentDidMount() {
                  //////////////////////////SUPER ADMIN/////////////////////////////
                  if(this.state.active_user=='super-admin'){
                  axios.get(baseUrl('state-associations-admins','api'))
                  .then(res => {
                            if(res.data.errorCode=='200'){
                                this.setState({StateAssociationAdmin: (res.data.data).length})
                            }
                  });

                  axios.get(baseUrl('state-associations','api'))
                  .then(res => {
                     if(res.data.errorCode=='200'){
                      this.setState({StateAssociation: (res.data.data).length})
                     }
                  });

                  axios.get(baseUrl('local-associations-admins?state_association_id=ALL','api'))
                  .then(res => {
                            if(res.data.errorCode=='200'){
                                this.setState({LocalAssociationAdmin: (res.data.data).length})
                            }
                  });
                  axios.get(baseUrl('local-associations?state_association_id=ALL','api'))
                  .then(res => {
                     if(res.data.errorCode=='200'){
                        this.setState({LocalAssociation: (res.data.data).length})
                     }
                  });

                  axios.get(baseUrl('teachers?local_association_id=ALL','api') )
                  .then(res => {
                            if(res.data.errorCode=='200'){
                                this.setState({Teachers: (res.data.data).length})
                            }
                  });
                  axios.get(baseUrl('students?local_association_id=ALL','api') )
                  .then(res => {
                            if(res.data.errorCode=='200'){
                                this.setState({Students: (res.data.data).length})
                            }
                  });
                  axios.get(baseUrl('positions','api'))
                  .then(res => {
                     if(res.data.errorCode=='200'){
                        this.setState({Positions: (res.data.data).length})
                        }
                  });
                  axios.get(baseUrl('levels','api'))
                    .then(res => {
                        if(res.data.errorCode=='200'){ 
                            this.setState({Levels: (res.data.data).length})
                        }
                    });

                 
                }

                if(this.state.active_user=='state-admin'){
                  //////////////////////////State ADMIN/////////////////////////////
                  axios.get(baseUrl('local-associations?state_association_id='+this.state.userData.state_association_id,'api'))
                  .then(res => {
                        if(res.data.errorCode=='200'){
                            this.setState({LocalAssociation: (res.data.data).length})
                        }
                  });

                  axios.get(baseUrl('local-associations-admins?state_association_id='+this.state.userData.state_association_id,'api'))
                  .then(res => {
                            if(res.data.errorCode=='200'){
                                this.setState({LocalAssociationAdmin: (res.data.data).length})
                            }

                  });

                }


                if(this.state.active_user=='local-admin'){
                    //////////////////////////Local ADMIN/////////////////////////////
                    axios.get(baseUrl('classes?local_association_id='+this.state.userData.local_association_id,'api') )
                    .then(res => {
                          if(res.data.errorCode=='200'){
                            this.setState({classes: (res.data.data).length})
                            }
                       });
                       axios.get(baseUrl('segments?local_association_id='+this.state.userData.local_association_id,'api') )
                       .then(res => {
                          if(res.data.errorCode=='200'){
                            this.setState({segments: (res.data.data).length})
                         }
                       });

                       axios.get(baseUrl('teachers?local_association_id='+this.state.userData.local_association_id,'api') )
                       .then(res => {
                          if(res.data.errorCode=='200'){
                            this.setState({teachers: (res.data.data).length})
                          }
                       });
                       axios.get(baseUrl('students?local_association_id='+this.state.userData.local_association_id,'api') )
                            .then(res => {
                                if(res.data.errorCode=='200'){
                                    this.setState({students: (res.data.data).length})
                                 }
                            });
                  }


                if(this.state.active_user=='teacher'){
                    //////////////////////////TEACHER START/////////////////////////////
                    axios.post(baseUrl('quizs-teacher?user_id='+this.state.userData.id,'api'))
                    .then(res => {
                            if(res.data.errorCode=='200'){
                                this.setState({total_quizs: (res.data.quizs).length});
                                var quizs='';
                                res.data.quizs.map((item, key) =>
                                quizs=quizs+(item.id)+','
                                )
                                quizs=(quizs.replace(/,\s*$/, ""));

                                    axios.get(baseUrl('teacher-dashboard-data?id='+this.state.userData.id+'&quizs='+quizs,'api') )
                                    .then(res => {
                                        this.setState({total_submitted_quizs: (res.data.data).length});
                                        var total_reviewed_quizs=0;
                                        var students=[];
                                        res.data.data.map((item, key) =>{
                                            if(item.is_reviewed=='1'){
                                                total_reviewed_quizs=total_reviewed_quizs+1;
                                            } 
                                            if(students.indexOf(item.user_id)=='-1'){
                                                students.push(item.user_id);
                                            }
                                        }
                                        )
                                        this.setState({total_students: (students).length});
                                        this.setState({total_reviewed_quizs: total_reviewed_quizs});
                                    })
                            }
                    });
                 }
                 //////////////////////////TEACHER START/////////////////////////////
  }

  updateStatus(status,id,e){
    axios.get( baseUrl('update-classes-status?id='+id+'&status='+status,'api') )
    .then(res => {
       if(res.data.errorCode=='200'){
         axios.get(baseUrl('classes?local_association_id='+this.state.userData.local_association_id,'api') )
         .then(res => {
           if(res.data.errorCode=='200'){
            const data = res.data.data.map(obj => obj);
            this.setState({ data }); }
        });
       }
    });
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
					                            <i className="fa fa-cogs"></i>Dashboard</div>
                                                 

					                    </div>
					                       <div className="portlet-body flip-scroll">
                   
                                            {this.state.active_user=='super-admin' &&(
                                                <div class="row">
                                                   <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                                    <a class="dashboard-stat dashboard-stat-v2 blue"  >
                                                        <div class="visual">
                                                            <i class="fa fa-user"></i>
                                                        </div>
                                                        <div class="details">
                                                            <div class="number">
                                                                <span data-counter="counterup" data-value="">{this.state.StateAssociation}</span>
                                                            </div>
                                                            <div class="desc"> State Association  </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                
                                                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                                    <a class="dashboard-stat dashboard-stat-v2 blue"  >
                                                        <div class="visual">
                                                            <i class="fa fa-comments"></i>
                                                        </div>
                                                        <div class="details">
                                                            <div class="number">
                                                                <span data-counter="counterup" data-value="">{this.state.StateAssociationAdmin}</span>
                                                            </div>
                                                            <div class="desc"> State Association Admin </div>
                                                        </div>
                                                    </a>
                                                </div>
                                             
                                                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                                    <a class="dashboard-stat dashboard-stat-v2 red"  >
                                                        <div class="visual">
                                                            <i class="fa fa-star"></i>
                                                        </div>
                                                        <div class="details">
                                                            <div class="number">  
                                                                <span data-counter="counterup" data-value=" ">{this.state.LocalAssociation}</span>  </div>
                                                            <div class="desc"> Local Association </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                                    <a class="dashboard-stat dashboard-stat-v2 green"  >
                                                        <div class="visual">
                                                            <i class="fa fa-bar-chart-o"></i>
                                                        </div>
                                                        <div class="details">
                                                            <div class="number">  
                                                                <span data-counter="counterup" data-value=" ">{this.state.LocalAssociationAdmin}</span>  </div>
                                                            <div class="desc"> Local Association Admin </div>
                                                        </div>
                                                    </a>
                                                </div>


                                                
                                                <div className="seperater">  </div>
                                                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                                    <a class="dashboard-stat dashboard-stat-v2 green-haze"  >
                                                        <div class="visual">
                                                            <i class="fa fa-shopping-cart"></i>
                                                        </div>
                                                        <div class="details">
                                                            <div class="number">
                                                                <span data-counter="counterup" data-value="">{this.state.Teachers}</span>
                                                            </div>
                                                            <div class="desc"> Teachers </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                                    <a class="dashboard-stat dashboard-stat-v2 purple"  >
                                                        <div class="visual">
                                                            <i class="fa fa-globe"></i>
                                                        </div>
                                                        <div class="details">
                                                            <div class="number"> 
                                                                <span data-counter="counterup" data-value="">{this.state.Students}</span> </div>
                                                            <div class="desc"> Students </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                
                                                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                                    <a class="dashboard-stat dashboard-stat-v2 grey"  >
                                                        <div class="visual">
                                                            <i class="fa fa-bar-chart-o"></i>
                                                        </div>
                                                        <div class="details">
                                                            <div class="number">  
                                                                <span data-counter="counterup" data-value=" ">{this.state.Levels}</span>  </div>
                                                            <div class="desc"> Levels </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                                    <a class="dashboard-stat dashboard-stat-v2 yellow"  >
                                                        <div class="visual">
                                                            <i class="fa fa-shopping-cart"></i>
                                                        </div>
                                                        <div class="details">
                                                            <div class="number">
                                                                <span data-counter="counterup" data-value="">{this.state.Positions}</span>
                                                            </div>
                                                            <div class="desc"> Positions </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>   

                                            )}






                                            {this.state.active_user=='state-admin' &&(
                                                    <div class="row">
                                                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                                            <a class="dashboard-stat dashboard-stat-v2 blue"  >
                                                                <div class="visual">
                                                                    <i class="fa fa-comments"></i>
                                                                </div>
                                                                <div class="details">
                                                                    <div class="number">
                                                                        <span data-counter="counterup" data-value="">{this.state.LocalAssociation}</span>
                                                                    </div>
                                                                    <div class="desc"> Local Associations</div>
                                                                </div>
                                                            </a>
                                                        </div>
                                                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                                            <a class="dashboard-stat dashboard-stat-v2 red"  >
                                                                <div class="visual">
                                                                    <i class="fa fa-bar-chart-o"></i>
                                                                </div>
                                                                <div class="details">
                                                                    <div class="number">  
                                                                        <span data-counter="counterup" data-value=" ">{this.state.LocalAssociationAdmin}</span>  </div>
                                                                    <div class="desc">Local Associations Admins</div>
                                                                </div>
                                                            </a>
                                                        </div>
                                                    </div>   

                                                )}




                  {this.state.active_user=='local-admin' &&(
                       <div class="row">
                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <a class="dashboard-stat dashboard-stat-v2 blue"  >
                                <div class="visual">
                                    <i class="fa fa-comments"></i>
                                </div>
                                <div class="details">
                                    <div class="number">
                                        <span data-counter="counterup" data-value="">{this.state.classes}</span>
                                    </div>
                                    <div class="desc"> Class </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <a class="dashboard-stat dashboard-stat-v2 red"  >
                                <div class="visual">
                                    <i class="fa fa-bar-chart-o"></i>
                                </div>
                                <div class="details">
                                    <div class="number">  
                                        <span data-counter="counterup" data-value=" ">{this.state.segments}</span>  </div>
                                    <div class="desc">Segment  </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <a class="dashboard-stat dashboard-stat-v2 green"  >
                                <div class="visual">
                                    <i class="fa fa-shopping-cart"></i>
                                </div>
                                <div class="details">
                                    <div class="number">
                                        <span data-counter="counterup" data-value="">{this.state.teachers}</span>
                                    </div>
                                    <div class="desc">Teacher</div>
                                </div>
                            </a>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <a class="dashboard-stat dashboard-stat-v2 purple"  >
                                <div class="visual">
                                    <i class="fa fa-globe"></i>
                                </div>
                                <div class="details">
                                    <div class="number"> 
                                        <span data-counter="counterup" data-value="">{this.state.students}</span> </div>
                                    <div class="desc"> Students </div>
                                </div>
                            </a>
                        </div>
                    </div>   

                   )}





                   {this.state.active_user=='teacher' &&(
                       <div class="row">
                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <a class="dashboard-stat dashboard-stat-v2 blue"  >
                                <div class="visual">
                                    <i class="fa fa-comments"></i>
                                </div>
                                <div class="details">
                                    <div class="number">
                                        <span data-counter="counterup" data-value="">{this.state.total_quizs}</span>
                                    </div>
                                    <div class="desc"> My Quizs </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <a class="dashboard-stat dashboard-stat-v2 red"  >
                                <div class="visual">
                                    <i class="fa fa-bar-chart-o"></i>
                                </div>
                                <div class="details">
                                    <div class="number">  
                                        <span data-counter="counterup" data-value=" ">{this.state.total_submitted_quizs}</span>  </div>
                                    <div class="desc">Submitted Quizs  </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <a class="dashboard-stat dashboard-stat-v2 green"  >
                                <div class="visual">
                                    <i class="fa fa-shopping-cart"></i>
                                </div>
                                <div class="details">
                                    <div class="number">
                                        <span data-counter="counterup" data-value="">{this.state.total_reviewed_quizs}</span>
                                    </div>
                                    <div class="desc"> Reviewed Quizs </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <a class="dashboard-stat dashboard-stat-v2 purple"  >
                                <div class="visual">
                                    <i class="fa fa-globe"></i>
                                </div>
                                <div class="details">
                                    <div class="number"> 
                                        <span data-counter="counterup" data-value="">{this.state.total_students}</span> </div>
                                    <div class="desc"> Students </div>
                                </div>
                            </a>
                        </div>
                    </div>   

                   )}


					                                
                                                    


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

export default Classes
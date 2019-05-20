import React, {Component} from 'react'


export default function baseUrl(parms='', name=''){
    localStorage.setItem("active_link", parms);

    if(name==''){
     //return 'http://localhost:3000/'+parms;
   return 'http://holdingcall.com/'+parms;
     
    }
    if(name=='api'){
        return 'http://holdingcall.com:3000/'+parms;
    }
    if(name=='thumb'){
        return 'https://s3.us-east-2.amazonaws.com/holdingcallassets/thumb_image/'+parms;
    }
    if(name=='profile_pic'){
        return 'https://s3.us-east-2.amazonaws.com/holdingcallprofile/'+parms;
    }
 
 }
 


 

 
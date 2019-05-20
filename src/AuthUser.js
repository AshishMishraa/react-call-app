import React, {Component} from 'react'


export default function AuthUser(){
   return { 
        isSuperAdmin:localStorage.getItem("isSuperAdmin"),
        isStateAssociationAdmin:localStorage.getItem("isStateAssociationAdmin"),
        isLocalAssociationAdmin:localStorage.getItem("isLocalAssociationAdmin"),
        isTeacher:localStorage.getItem("isTeacher"),
        login_user:localStorage.getItem("login_user"),
        active_user:localStorage.getItem("active_user")
   };
 }
 


 

 
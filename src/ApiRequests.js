import React, {Component} from 'react'
import axios from 'axios';
export function base_url(segment){
    // get the segments
    pathArray = window.location.pathname.split( '/' );
    // find where the segment is located
    indexOfSegment = pathArray.indexOf(segment);
    // make base_url be the origin plus the path to the segment
    return window.location.origin + pathArray.slice(0,indexOfSegment).join('/') + '/';
 }
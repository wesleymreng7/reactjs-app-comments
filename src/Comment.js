import React, { Component } from 'react'

//Functional stateless component

const Comment = props => 
    <div className="card">
        <p className="card-body">
        { props.comment.comment } <br/> 
        por: <b>{ props.comment.user.name } </b></p>
    </div>

export default Comment
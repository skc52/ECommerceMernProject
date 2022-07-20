import React from 'react'
import { Rating } from '@mui/material'
import profilePng from "C:/Users/samip/Desktop/ECommerceMERN/frontend/src/images/profile.png"
const ReviewCard = ({review}) => {
    const options = {
     
      value:review.rating,
      readOnly:true,
      precision:0.5,
      
        
    }
  return (
    <div className='reviewCard'>
        <img src={profilePng} alt="User" />
        <p>{review.name}</p>
        <Rating {...options}/>
        <span className = "reviewCardComment">{review.comment}</span>
    </div>
  )
}

export default ReviewCard
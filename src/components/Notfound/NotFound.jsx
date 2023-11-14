/* eslint-disable react/no-unescaped-entities */
import { Button } from '@mui/material'

import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='notfound-container'>
         <h4 style={{color: "#55565f8"}}>404</h4>
         <h2>Oops,the page you're looking for doesn't exist</h2>
         <Link to='/'>
            <Button style={{background: '#000', color: '#fff', padding: '12px 15px'}}>Go Back</Button>
        </Link>
    </div>
  )
}

export default NotFound

import React from 'react'
import { ButtonStyles, Container, Paragraph } from './styles'

const Pagination = ({currentPage,setPage, totalPages}) => {
  if(totalPages === 0) return null;
  const handlePrev = ()=> {
    if(currentPage !== 1) {
      setPage((prevPage)=> prevPage - 1)
    }
    
  }
  const handleNext = ()=> {
    if(currentPage !== totalPages) {
      setPage((prevPage)=> prevPage + 1)
    }
   
  }
  return (
    <Container>
       <ButtonStyles onClick={handlePrev} variant='contained' color='primary' type='button'>Prev</ButtonStyles>
       <Paragraph variant='h4'>{currentPage}</Paragraph>
       <ButtonStyles onClick={handleNext} variant='contained' color='primary' type='button'>Next</ButtonStyles>
    </Container>
  )
}

export default Pagination
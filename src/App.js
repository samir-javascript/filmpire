import 'react-toastify/dist/ReactToastify.css';


import { Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import {Home, MovieDetailsPage, ProfilePage , Navbar, ActorDetailsPage, Actors} from './components/index'
import NotFound from './components/Notfound/NotFound';
import useAlan from './components/Alan';
export default function App() {
   const alanBtnContainer = useRef()
   useAlan()
  return (
     <div className='root'>
       <CssBaseline />
        <Navbar />
        <main className='content'>
         <div className='toolbar'/>
            <Routes>
            <Route index={true} path={'/'} element={<Home />} />
            <Route index  path="/approved" element={<Home />} /> 
               <Route  path='/movies/:id' element={<MovieDetailsPage />}/>
               <Route path='/profile/:id' element={<ProfilePage />}/>
               <Route  path='/actors' element={<Actors />}/>
               <Route path='/actors/:id' element={<ActorDetailsPage />}/>
               <Route path='*' element={<NotFound />}/>
            </Routes>
           
        </main>
        <div ref={alanBtnContainer}/>
        <ToastContainer />
     </div>
  )
}

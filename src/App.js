/* eslint-disable react/react-in-jsx-scope */
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route} from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import {Home, MovieDetailsPage, ProfilePage , Navbar, ActorDetailsPage, Actors} from './components/index'
import NotFound from './components/Notfound/NotFound';
import useAlan from './components/Alan';
import { Helmet } from 'react-helmet-async';
export default function App() {
   const alanBtnContainer = useRef()
   useAlan()
  return (
     <div className='root'>
       <CssBaseline />
        <Navbar />
        <main className='content'>
         <div className='toolbar'/>
         <Helmet>
         <meta name="description" content="Welcome to Filmpire, your go-to destination for all things movies! Immerse yourself in the world of cinema with our user-friendly and feature-packed movie app. Discover a vast library of films from various genres, including action, drama, comedy, sci-fi, and more.

Explore in-depth details about each movie, from cast and crew information to plot summaries and user reviews. Our app provides you with personalized recommendations based on your preferences, ensuring that you never miss out on the latest releases or timeless classics.

Stay up-to-date with the latest movie news, trailers, and exclusive behind-the-scenes content. Create your watchlist to keep track of movies you want to see and mark your favorites. With our intuitive search and filtering options, finding the perfect movie for any mood is a breeze.

Whether you're a casual moviegoer or a cinephile, Filmpire is designed to enhance your movie-watching experience." />
          <title>Filmpire</title>
       
          {/* Add more default meta tags as needed */}
        </Helmet>
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

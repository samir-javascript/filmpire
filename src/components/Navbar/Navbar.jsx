import React, { useContext, useState, useEffect } from 'react'
import { AppBar, IconButton, Drawer, Button, Avatar , useMediaQuery} from '@mui/material'
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/system';
import {ButtonStyles, DrawerStyles, ToolbarStyles} from './styles'
import {Search, Sidebar} from '../index'
import { ColorModeContext } from '../../utils';
import { createSessionId, fetchToken, moviesApi } from '../../utils/auth';
import { setUser , userSelector} from '../../features/Authenticate';

import { useDispatch, useSelector } from 'react-redux';
const Navbar = () => {
  const [mobileOpen,setMobileOpen] = useState(false)
  const dispatch = useDispatch()
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isSmallScreen = useMediaQuery('(max-width: 800px)');
  const colorMode = useContext(ColorModeContext)
  const theme = useTheme()
  const { isAuthenticated, user } = useSelector(userSelector)

  const token = localStorage.getItem('request_token');
  const sessionIdFromLocalStorage = localStorage.getItem('session_id')
  
  useEffect(() => {
    const loginUser = async () => {
      if (token) {
        try {
          let sessionId;
  
          if (sessionIdFromLocalStorage) {
            sessionId = sessionIdFromLocalStorage;
          } else {
            sessionId = await createSessionId();
          }
  
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`);
          dispatch(setUser(userData));
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
  
    loginUser();
  }, [token, sessionIdFromLocalStorage]);
  
  
  return (
    <>
        <AppBar position='fixed'>
           <ToolbarStyles>
                {isMobile && (
                  <ButtonStyles 
                    color='inherit'
                    edge='start'
                    style={{outline: 'none'}}
                    onClick={()=> setMobileOpen((prev)=> !prev)}
                  >
                     <Menu />
                  </ButtonStyles>
                  
                )}
                <IconButton color='inherit' sx={{ml:'1'}} onClick={colorMode.toggleMode}>  
                    {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
                {
                     !isMobile && <Search  />
                }
               
                <div>
                {!isAuthenticated ? (
                   <Button onClick={fetchToken} color='inherit'>
                       Login &nbsp; <AccountCircle />
                   </Button>
                ) : (
                  <Button style={{textDecoration: 'none'}} color='inherit' 
                    component={Link}
                    to={`/profile/${user.id}`}
                    
                  >
                    {!isSmallScreen && <>My Movies &nbsp; </>}
                    <Avatar alt='avatar'
                     style={{width: '30px', height: '30px'} }
                       src={`https://themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar_path}`}

                     />
                      
                    
                   </Button> 
                )}
                </div>
                {
                     isMobile && <Search  />
                }
               
           </ToolbarStyles>
        </AppBar>

        <div>
            <DrawerStyles>
              {isMobile ? (
                 <Drawer 
                   variant='temporary'
                   anchor='right'
                   ModalProps={{keepMounted:true}}
                   open={mobileOpen}
                    onClose={()=> setMobileOpen((prev)=> !prev)}
                   classes={{ paper: 'MuiDrawer-paper' }}

                 >
                   <Sidebar setMobileOpen={setMobileOpen}/>
                 </Drawer>
              ) :  (
                <Drawer 
                variant='permanent'
                open
                classes={{ paper: 'MuiDrawer-paper' }}
              >
                <Sidebar setMobileOpen={setMobileOpen}/>
              </Drawer>
                          
               )}
            </DrawerStyles>
        </div>
     </>
  )
}

export default Navbar
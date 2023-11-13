import  {useEffect,useContext} from 'react'
import alanBtn from '@alan-ai/alan-sdk-web';
import { ColorModeContext } from '../utils';
import { fetchToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { searchMovie, selectGenreOrGategory } from '../features/CurrentGenreOrCategory';
const useAlan = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const { setMode } = useContext(ColorModeContext)
    useEffect(() => {
        alanBtn({
            key: '550bb2c3d53ed8864a55de5de09bc0442e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: ({command,mode, genres , genreOrCategory,query}) => {
              if (command === 'chooseGenre') {
                const foundGenre = genres.find((g)=> g?.name?.toLowerCase() === genreOrCategory?.toLowerCase())
                if(foundGenre) {
                   navigate('/')
                   dispatch(selectGenreOrGategory(foundGenre.id))
                }
             }else {
                navigate('/')
                dispatch(selectGenreOrGategory(genreOrCategory))
             }
              if (command === 'changeMode') {
                if(mode === 'light') {
                    setMode('light')
                }else {
                    setMode('dark')
                }
              }
             else if(command === 'logout') {
                 localStorage.clear()
                 navigate('/')
                 window.location.reload()
                 
              }
              else if(command === 'login') {
                      fetchToken()
              }else if(command === 'search') {
                dispatch(searchMovie(query))
              }
               
            }
        });
      }, []);
 
}

export default useAlan
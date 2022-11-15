import React from 'react'
import Navbar from './Navbar'
import './Header.css'
import { useDispatch, useSelector } from 'react-redux'
import { themeActions } from '../../Store/theme/Theme'

const Header = () => {
  const theme = useSelector(state=> state.theme.theme)
  const dispatch = useDispatch()

  const themeChangeHandler=()=>{
    if(!theme){
      dispatch(themeActions.forPremium())
    }else{
      dispatch(themeActions.forNormal())
    }
    
  }

  return (
    <div className='header-conponent-container'>
      <Navbar/>
      <div><button onClick={themeChangeHandler} className='theme-toggle-btn'>{theme? 'Normal':'Dark'}</button></div>
    </div>
  )
}

export default Header

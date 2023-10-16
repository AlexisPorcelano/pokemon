import './App.css'
import { Routes, Route, useNavigate } from "react-router-dom";
import Welcome from './components/Welcome/Welcome'
import {useState, useEffect, Fragment} from 'react'
import Nav from './components/Nav/Nav'
import Form from './components/Form/Form'
import Pokedex from './components/Pokedex/Pokedex';
import Detail from './components/Detail/Detail';

function App() {

  const navigate = useNavigate();

  return (
    <div >
    <Routes>
      <Route path='/submit' element={<Form/>} />
      <Route path='/detail/:id' element={<Detail/>} />
      <Route path='/' element={ <Fragment><Welcome/> <button onClick={()=>{navigate('/pokedex')}} >PLAY</button> </Fragment> } />
      <Route path='/*' element={<Fragment>
        <Nav/>
        <Routes>
          <Route path='/pokedex' element={<Pokedex/>}/>
        </Routes>
      </Fragment>} />
    </Routes>
    </div>
  )
}

export default App

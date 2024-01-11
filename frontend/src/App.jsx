import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateNote from './components/CreateNote'
import CreateUser from './components/CreateUser'
import Navbar from './components/Navbar'
import NoteList from './components/NoteList'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' exact element={ <NoteList />}/>
        <Route path='/create' element={ <CreateNote />}/>
        <Route path='/edit/:id' element={ <CreateNote />}/>
        <Route path='/user' element={ <CreateUser />}/>  
      </Routes>
    </BrowserRouter>
  )
}

export default App

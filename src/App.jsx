import {BrowserRouter,Routes,Route,Link} from 'react-router-dom'
import Login from './Components/Login'
import ProtectedRoute from './Components/ProtectedRoute'  
 import BookShelf from './Components/BookShelf'
import Home from './Components/Home' 
import './App.css'
import { Navigate } from 'react-router-dom'
import NoPageFound from './Components/NoPageFound/index.jsx'
import BookCardDetails from './Components/BookCardDetails.jsx'
function App() {
  

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Login/>}>
       
      </Route>
       <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
       <Route path="/bookshelf" element={<Navigate to="/bookshelf/ALL" replace />} />
       <Route path="/bookshelf/:shelf" element={<ProtectedRoute><BookShelf/></ProtectedRoute>}></Route>
         <Route path="/book-hub/book/:id" element={<ProtectedRoute><BookCardDetails /></ProtectedRoute>} />
         <Route path="*" element={<NoPageFound/>}/>
     </Routes>
     </BrowserRouter> 
    </>
  )
}

export default App

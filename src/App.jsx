import {BrowserRouter,Routes,Route,Link} from 'react-router-dom'
import Login from './Components/Login'
import ProtectedRoute from './Components/ProtectedRoute'  
 import BookShelf from './Components/BookShelf'
import Home from './Components/Home' 
import './App.css'
import { Navigate } from 'react-router-dom'
import NoPageFound from './Components/NoPageFound/index.jsx'
import BookCardDetails from './Components/BookCardDetails.jsx'
import DataCreation from './Components/dataCreation'
import History from  './Components/History'
import AdminHome from './Components/AdminHome'
import BulkUpdated from './Components/BulkUpdated'
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
        <Route path="/datamanipulation" element={<DataCreation></DataCreation>}></Route>
          <Route path="/history" element={<History></History>}></Route>
          <Route path="/bulkupdated" element={<BulkUpdated></BulkUpdated>}></Route>
          <Route path="/adminHome" element={<AdminHome></AdminHome>}></Route>
     </Routes>
     </BrowserRouter> 
    </>
  )
}

export default App

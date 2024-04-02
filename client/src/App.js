import './App.css';

import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div>
        <BrowserRouter>
        
         <Routes>
      
         <Route path='/' element={<Home/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/register' element={<Register/>}/>
       
       


         </Routes>
        
        </BrowserRouter>
    </div>
  );
}

export default App;

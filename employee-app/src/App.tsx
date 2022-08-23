import { Route, Routes } from 'react-router-dom';
import './App.css';
import Addemployee from './components/Addemployee';
import AddProject from './components/AddProject';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/addemployee' element={<Addemployee/>}/>
        <Route path='/addproject' element={<AddProject/>}/> 
      </Routes>
    </div>
  );
}

export default App;

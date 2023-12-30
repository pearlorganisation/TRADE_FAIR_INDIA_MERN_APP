import { Route, Routes } from 'react-router';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';

function App() {
  return (
    <div className=" bg-[#F8F6F5]">
      <Header/>
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </div>
    <Footer/>
    </div>
   
  );
}

export default App;

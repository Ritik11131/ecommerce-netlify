
import './App.css';
import Homepage from './pages/Homepage';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductInfo from './pages/ProductInfo';
import CartPage from './pages/CartPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrdersPage from './pages/OrdersPage';
import AdminPage from './pages/AdminPage';
import NewArrivals from './pages/NewArrivals';
import Upcomings from './pages/Upcomings';

function App() {
  return (
    <div>
      <ToastContainer autoClose={3000} />
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<ProtectedRoutes><Homepage /></ProtectedRoutes>} />
          <Route path='/login' exact element={<LoginPage />} />
          <Route path='/register' exact element={<RegisterPage />} />
          <Route path='/productinfo/:productid' exact element={<ProtectedRoutes><ProductInfo /></ProtectedRoutes>} />
          <Route path='/cart' exact element={<ProtectedRoutes><CartPage /></ProtectedRoutes>} />
          <Route path='/orders' exact element={<ProtectedRoutes><OrdersPage /></ProtectedRoutes>} />
          <Route path='/ritikAdminPage11131' exact element={<ProtectedRoutes><AdminPage /></ProtectedRoutes>} />
          <Route path='/new' exact element={<ProtectedRoutes><NewArrivals /></ProtectedRoutes>} />
          <Route path='/upcomings' exact element={<ProtectedRoutes><Upcomings /></ProtectedRoutes>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


export const ProtectedRoutes = ({ children }) => {
  if (localStorage.getItem('currentUser')) {
    return children
  }
  else {
    return <Navigate to='/login' />
  }
}

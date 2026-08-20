import { BrowserRouter, Routes, Route } from 'react-router'
import PublicLayout from './pages/Layouts/PublicLayout'
import ProfileLayout from './pages/Layouts/ProfileLayout'
import Home from './pages/public/Home'
import SignUp from './pages/public/SignUp'
import NotFound from './pages/public/NotFound'
import ForgotPassword from './pages/public/ForgotPassword'
import ProductsPage from './pages/public/ProductsPage'
import ProductDetails from './pages/public/ProductDetails'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { Profile } from './pages/user/Profile'
import UserOrders from './pages/user/UserOrders'
import UserAddresses from './pages/user/UserAddresses'
import SellerLayout from './components/seller/SellerLayout'
import SellerDashboard from './pages/seller/SellerDashboard'
import SellerProductsPage from './pages/seller/SellerProductsPage'
import SellerOrders from './pages/seller/SellerOrders'
import { useEffect } from 'react'
import { useAuthStore } from './store/authStore'
import Checkout from './pages/payment/Checkout'
import PaymentSuccess from './pages/payment/PaymentSuccess'
import SellerMessages from './pages/seller/SellerMessages'
import { EditProduct } from './pages/seller/SellerEditProduct'

function App() {
  const checkAuth = useAuthStore(state => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<ProtectedRoute allowedRoles={["user"]}><Checkout /></ProtectedRoute>} />
          <Route path="/payment/success" element={<ProtectedRoute allowedRoles={["user"]}><PaymentSuccess /></ProtectedRoute>} />
        </Route>

        {/* Profile routes */}
        <Route path="/profile" element={<ProtectedRoute allowedRoles={["user"]}><ProfileLayout /></ProtectedRoute>}>
          <Route index element={<Profile />} />
          <Route path="orders" element={<UserOrders />} />
          <Route path="address" element={<UserAddresses />} />
        </Route>

        {/* seller routes */}
        <Route path="/seller" element={<SellerLayout />}>
          <Route index element={<SellerDashboard />} />
          <Route path="products" element={<SellerProductsPage />} />
          <Route path="orders" element={<SellerOrders />} />
          <Route path="messages" element={<SellerMessages />} />
          <Route path="products/:id/edit" element={<EditProduct />} />
        </Route>
        {/* customer routes */}

        {/* any other route will be directed to not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App


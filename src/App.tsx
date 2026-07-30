import { BrowserRouter, Routes, Route } from 'react-router'
import PublicLayout from './pages/Layouts/PublicLayout'
import Home from './pages/public/Home'
import { Login } from './pages/public/Login'
import SignUp from './pages/public/SignUp'
import NotFound from './pages/public/NotFound'
import ForgotPassword from './pages/public/ForgotPassword'
import ProductsPage from './pages/public/ProductsPage'
import ProductDetails from './pages/public/ProductDetails'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { Profile } from './pages/public/Profile'
import SellerLayout from './components/seller/SellerLayout'
import SellerDashboard from './components/seller/SellerDashboard'
import SellerProductsPage from './components/seller/SellerProductsPage'
import SellerOrders from './components/seller/SellerOrders'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/profile" element={<ProtectedRoute allowedRoles={["user"]}><Profile /></ProtectedRoute>} />
        </Route>

        {/* protected routes */}

        {/* seller routes */}
        <Route path="/seller" element={<SellerLayout />}>
          <Route index element={<SellerDashboard />} />
          <Route path="products" element={<SellerProductsPage />} />
          <Route path="orders" element={<SellerOrders />} />
        </Route>
        {/* customer routes */}

        {/* any other route will be directed to not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

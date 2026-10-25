import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Books from './pages/Books';
import ScrollToTop from './components/ui/ScrollToTop';
import PrivateRoute from './components/ui/PrivateRoute';
import BookName from './pages/BookName';
import Cart from './pages/Cart'; 
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import MyBooks from './pages/MyBooks'
import MySales from './pages/MySales';
import MyOrders from './pages/MyOrders';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import LibrolyPro from './pages/LibrolyPro';
import Seller from './pages/Seller';
import NotFound from './pages/NotFound';
import Contact from './pages/Contact';
import TermsAndConditions from './pages/TermsAndConditions';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import NavBar from "./components/layout/NavBar";
import TopBar from './components/layout/TopBar';
import Footer from './components/layout/Footer';
import ChatBot from './components/ui/ChatBot';
import DemoBanner from './components/ui/DemoBanner';
import { DEMO_MODE } from './config';
import CheckoutSuccess from "./pages/CheckoutSuccess";
import AboutUs from './pages/AboutUs';
import SubscriptionSuccess from './pages/SubscriptionSuccess';

import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import { CartProvider } from './contexts/CartContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-white">
        {DEMO_MODE && <DemoBanner />}
        <TopBar />
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book/:isbn" element={<BookName />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/books" element={<Books />} />
            <Route path="/terms-conditions" element={<TermsAndConditions />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } 
            />
            <Route path='/my-orders' element={
              <PrivateRoute>
                <MyOrders />
              </PrivateRoute>
            } />
            <Route path='/my-books' element={<MyBooks />} />
            <Route path='/my-sales' element={<MySales />} />
            <Route path='/my-orders' element={
              <PrivateRoute>
                <MyOrders />
              </PrivateRoute>
            } />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/seller/:id' element={<Seller />} />
            <Route path='/libroly-pro' element={<LibrolyPro />} />
            <Route path="/checkout-success" element={<CheckoutSuccess />} />
            <Route path="/subscription-success" element={<SubscriptionSuccess />} />
            <Route path='/contact' element={<Contact />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <ChatBot />
      </div>
      </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

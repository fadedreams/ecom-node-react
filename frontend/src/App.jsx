import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Product from './pages/Product';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Header from "./components/Header";

import AdminDashboard from './pages/AdminDashboard';
import AdminProduct from './pages/AdminProduct';
import AdminAddProduct from './pages/AdminAddProduct';
import AdminEditProduct from './pages/AdminEditProduct';
import AdminCategory from './pages/AdminCategory';
import AdminAddCategory from './pages/AdminAddCategory';
import AdminEditCategory from './pages/AdminEditCategory';

function Home() {
    return <h1>Home Page</h1>;
}

function About() {
    return <h1>About Page</h1>;
}

// Public Layout with Header
function PublicLayout() {
    const location = useLocation(); // To log current path
    console.log("PublicLayout rendering for path:", location.pathname);
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

// Admin Layout without Header
function AdminLayout() {
    const location = useLocation(); // To log current path
    console.log("AdminLayout rendering for path:", location.pathname);
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

function App() {
    console.log("App component rendering");
    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes with Header */}
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot" element={<ForgotPassword />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/cart" element={<Cart />} />
                </Route>

                {/* Admin routes without Header */}
                <Route element={<AdminLayout />}>
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/products" element={<AdminProduct />} />
                    <Route path="/admin/products/add" element={<AdminAddProduct />} />
                    <Route path="/admin/products/edit" element={<AdminEditProduct />} />
                    <Route path="/admin/cats" element={<AdminCategory />} />
                    <Route path="/admin/cats/add" element={<AdminAddCategory />} />
                    <Route path="/admin/cats/edit" element={<AdminEditCategory />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

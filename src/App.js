

import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';

// Pages
import Index from "./pages/Index";
// import NotFound from "./pages/NotFound";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/DashBoard";
import CategoryList from "./pages/admin/categories/CategoryList";

// Auth middleware
import PrivateRoute from "./components/auth/PrivateRoute";
import AdminRoute from "./components/auth/AdminRoute";
import { Toaster } from "sonner";
import ProductList from "./pages/admin/products/ProductList";
import CartPage from "./pages/web/CartPage";
import ProductListPage from "./pages/web/ProducListPage";
import ProductDetailPage from "./pages/web/ProductDetailPage";
import CategoryDetailPage from "./pages/web/CategoryListPage";
import AboutPage from "./pages/web/AboutPage";
import ContactPage from "./pages/web/ContactPage";
import CheckoutPage from "./pages/web/CheckOutPage";
import OrderList from "./pages/admin/orders/OrderList";
import OrderDetailsPage from "./pages/admin/orders/OrderDetailPage";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Frontend Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            <Route path="/category/:categoryId" element={<CategoryDetailPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            } />
            <Route path="/admin/categories" element={
              <AdminRoute>
                <CategoryList />
              </AdminRoute>
            } />
            <Route path="/admin/orders" element={
              <AdminRoute>
                <OrderList />
              </AdminRoute>
            } />

            <Route path="/admin/orders/:orderId" element={
              <AdminRoute>
                <OrderDetailsPage />
              </AdminRoute>
            } />
            <Route path="/admin/products" element={
              <AdminRoute>
                <ProductList />
              </AdminRoute>
            } />
            
            {/* Catch-all route */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;

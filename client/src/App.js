import {BrowserRouter,Routes,Route} from "react-router-dom"
import HomePage from "./Pages/HomePage";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Policy from "./Pages/Policy";
import PagenotFound from "./Pages/PagenotFound";
import UserState from "./Context/userState";
import Register from "./Pages/Register";
import Login from "./Pages/Login"
import AuthState from "./Context/authState";
import SearchState from "./Context/searchState"
import Dashboard from "./Pages/user/Dashboard";
import Private from "./Components/Routes/Private";
import ResetPassword from "./Pages/ResetPassword";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminRoute from "./Components/Routes/AdminRoute";
import CreateCategory from "./Pages/Admin/CreateCategory";
import CreateProducts from "./Pages/Admin/CreateProducts";
import AllUsers from "./Pages/Admin/AllUsers";
import Profile from "./Pages/user/Profile";
import AllOrders from "./Pages/user/AllOrders";
import Products from "./Pages/Admin/Products";
import UpdateProducts from "./Pages/Admin/UpdateProducts";
import Search from "./Pages/Search";
import ProductDetails from "./Pages/ProductDetails";
import Categories from "./Pages/Categories";
import CategoryProducts from "./Pages/CategoryProducts";
import { CartState } from "./Context/cartContext";
import Cart from "./Pages/Cart";
import AllOrdersAdmin from "./Pages/Admin/AllOrdersAdmin";

function App() {
  return (
    <div className="App">
      <AuthState>
      <SearchState>
        <CartState>
        <UserState>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/about" element={<About/>}/>
              <Route path="/contact" element={<Contact/>}/>
              <Route path="/policy" element={<Policy/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/search" element={<Search/>}/>
              <Route path="/cart" element={<Cart/>}/>
              <Route path="/categories" element={<Categories/>}/>
              <Route path="/category/:slug" element={<CategoryProducts/>}/>
              <Route path="/product-details/:slug" element={<ProductDetails/>}/>
              <Route path="/resetPassword" element={< ResetPassword/>}/>
              <Route path="/dashboard" element={<Private/>}>
                  <Route path="user" element={<Dashboard/>}/>
                  <Route path="user/profile" element={<Profile/>}/>
                  <Route path="user/all-orders" element={<AllOrders/>}/>
              </Route>
              <Route path ="/dashboard" element={<AdminRoute/>}>
                <Route path="admin" element={<AdminDashboard/>}/>
                <Route path="admin/create-category" element={<CreateCategory/>}/>
                <Route path="admin/create-products" element={<CreateProducts/>}/>  
                <Route path="admin/product/:slug" element={<UpdateProducts/>}/>  
                <Route path="admin/all-users" element={<AllUsers/>}/>
                <Route path="admin/products" element={<Products/>}/>
                <Route path="admin/all-orders" element={<AllOrdersAdmin/>}/>
              </Route>
              <Route path ="*" element={<PagenotFound/>}/>
            </Routes>
          </BrowserRouter>
        </UserState>
        </CartState>
       </SearchState>
      </AuthState>

    </div>

  );
}

export default App;

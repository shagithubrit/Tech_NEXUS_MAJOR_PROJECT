import { useEffect, lazy, Suspense } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Switch, Route } from "react-router-dom";

import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "./functions/auth";
import { LoadingOutlined } from "@ant-design/icons";

// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import Home from "./pages/Home";
// import Header from "./components/nav/Header";
// import SideDrawer from "./components/drawer/SideDrawer";
// import RegisterComplete from "./pages/auth/RegisterComplete";
// import UserRoute from "./components/routes/UserRoute";

// import ForgotPassword from "./pages/auth/ForgotPassword";
// import History from "./pages/user/History";
// import Password from "./pages/user/Password";
// import Wishlist from "./pages/user/Wishlist";
// import AdminRoute from "./components/routes/AdminRoute";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import CategoryCreate from "./pages/admin/category/CategoryCreate";
// import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
// import SubCreate from "./pages/admin/sub/SubCreate";
// import SubUpdate from "./pages/admin/sub/SubUpdate";
// import ProductCreate from "./pages/admin/product/ProductCreate";
// import ProductUpdate from "./pages/admin/product/ProductUpdate";
// import AllProducts from "./pages/admin/product/AllProducts";
// import Product from "./pages/Product";
// import CategoryHome from "./pages/category/CategoryHome";
// import SubHome from "./pages/sub/SubHome";
// import Shop from "./pages/Shop";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import CreateCoupon from "./pages/admin/coupon/CreateCoupon";
// import Payment from "./pages/Payment";

// using lazy
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Home = lazy(() => import("./pages/Home"));
const Header = lazy(() => import("./components/nav/Header"));
const SideDrawer = lazy(() => import("./components/drawer/SideDrawer"));
const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
const UserRoute = lazy(() => import("./components/routes/UserRoute"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const History = lazy(() => import("./pages/user/History"));
const Password = lazy(() => import("./pages/user/Password"));
const Wishlist = lazy(() => import("./pages/user/Wishlist"));
const AdminRoute = lazy(() => import("./components/routes/AdminRoute"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const CategoryCreate = lazy(() =>
  import("./pages/admin/category/CategoryCreate")
);
const CategoryUpdate = lazy(() =>
  import("./pages/admin/category/CategoryUpdate")
);
const SubCreate = lazy(() => import("./pages/admin/sub/SubCreate"));
const SubUpdate = lazy(() => import("./pages/admin/sub/SubUpdate"));
const ProductCreate = lazy(() => import("./pages/admin/product/ProductCreate"));
const ProductUpdate = lazy(() => import("./pages/admin/product/ProductUpdate"));
const AllProducts = lazy(() => import("./pages/admin/product/AllProducts"));
const Product = lazy(() => import("./pages/Product"));
const CategoryHome = lazy(() => import("./pages/category/CategoryHome"));
const SubHome = lazy(() => import("./pages/sub/SubHome"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const CreateCoupon = lazy(() => import("./pages/admin/coupon/CreateCoupon"));
const Payment = lazy(() => import("./pages/Payment"));

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const idTokenResult = await user.getIdTokenResult();
          // const res = await currentUser(idTokenResult.token);

          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: "Ryan",
              email: user.email,
              token: idTokenResult.token,
              // role: res.data.role,
              // _id: res.data._id,
            },
          });
        } catch (err) {
          console.log("App login data error", err);
          toast.error(err.message);
        }
      }
    });

    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Suspense
      fallback={
        <div className="col text-center p-5">
          __React redux EC
          <LoadingOutlined />
          MMERCE__
        </div>
      }
    >
      <Header />
      <SideDrawer />
      <ToastContainer />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={user ? Home : Login} />
        <Route path="/register" component={user ? Home : Register} exact />
        <Route path="/register/complete" component={RegisterComplete} />
        <Route
          path="/forgot/password"
          component={user ? Home : ForgotPassword}
        />
        <UserRoute path="/user/history" component={History} />
        <UserRoute path="/user/password" component={Password} />
        <UserRoute path="/user/wishlist" component={Wishlist} />
        <AdminRoute path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute path="/admin/category" component={CategoryCreate} exact />
        <AdminRoute path="/admin/category/:slug" component={CategoryUpdate} />
        <AdminRoute path="/admin/sub" component={SubCreate} exact />
        <AdminRoute path="/admin/sub/:slug" component={SubUpdate} />
        <AdminRoute path="/admin/product" component={ProductCreate} exact />
        <AdminRoute path="/admin/coupon" component={CreateCoupon} exact />
        <AdminRoute
          path="/admin/product/:slug"
          component={ProductUpdate}
          exact
        />
        <AdminRoute path="/admin/products" component={AllProducts} />
        <Route path="/product/:slug" component={Product} exact />
        <Route path="/category/:slug" component={CategoryHome} />
        <Route path="/sub/:slug" component={SubHome} />
        <Route path="/shop/" component={Shop} exact />
        <Route path="/cart/" component={Cart} exact />
        <UserRoute path="/checkout/" component={Checkout} exact />
        <UserRoute path="/payment/" component={Payment} exact />
      </Switch>
    </Suspense>
  );
};

export default App;

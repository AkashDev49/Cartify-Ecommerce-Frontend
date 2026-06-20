import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Userdata } from "./context/UserContext";
import Verify from "./pages/Verify";
import Loading from "./components/Loading";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import ProductPage from "./pages/ProductPage";
import Checkout from "./pages/Checkout";
import Payement from "./pages/Payement";
import OrderProcessing from "./pages/OrderProcessing";
import Order from "./pages/Order";
import OrderPage from "./pages/OrderPage";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
	const { isAuth, loading } = Userdata();
	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<>
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />}></Route>
						<Route
							path="/login"
							element={isAuth ? <Home /> : <Login />}
						></Route>
						<Route
							path="/verify"
							element={isAuth ? <Home /> : <Verify />}
						></Route>
						<Route path="/product" element={<Product />}></Route>
						<Route path="/product/:id" element={<ProductPage />}></Route>
						<Route path="/cart" element={isAuth ? <Cart /> : <Login />}></Route>
						<Route
							path="/orders"
							element={isAuth ? <Order /> : <Login />}
						></Route>
						<Route
							path="/orders/:id"
							element={isAuth ? <OrderPage /> : <Login />}
						></Route>
						<Route
							path="/admin/dashboard"
							element={isAuth ? <AdminDashboard /> : <Login />}
						></Route>
						<Route
							path="/payment/:id"
							element={isAuth ? <Payement /> : <Login />}
						></Route>
						<Route
							path="/ordersuccess"
							element={isAuth ? <OrderProcessing /> : <Login />}
						></Route>
						<Route
							path="/checkout"
							element={isAuth ? <Checkout /> : <Login />}
						></Route>
						<Route path="*" element={<NotFound />}></Route>
					</Routes>
					<Footer />
				</>
			)}
		</>
	);
}

export default App;

import { server } from "@/main";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	let [user, setUser] = useState([]);
	let [loading, setLoading] = useState(true);
	let [btnLoading, setBtnLoding] = useState(false);
	let [isAuth, setIsAuth] = useState(false);

	async function loginUser(email, navigate) {
		setBtnLoding(true);

		try {
			const { data } = await axios.post(`${server}/api/user/login`, { email });
			toast.success(data.message);
			localStorage.setItem("email", email);
			navigate("/verify");
			setBtnLoding(false);
		} catch (error) {
			toast.error(error.response.data.message);
			console.log(error);
			setBtnLoding(false);
		}
	}

	async function verifyUser(otp, navigate, fetchCart) {
		setBtnLoding(true);
		const email = localStorage.getItem("email");

		try {
			const { data } = await axios.post(`${server}/api/user/verify`, {
				email,
				otp,
			});
			toast.success(data.message);
			localStorage.clear();
			navigate("/");
			setBtnLoding(false);
			setIsAuth(true);
			setUser(data.user);
			Cookies.set("token", data.token, {
				expires: 15,
				secure: true,
				path: "/",
			});
			fetchCart();
		} catch (error) {
			toast.error(error.response.data.message);
			console.log(error);
			setBtnLoding(false);
		}
	}

	async function fetchUser() {
		try {
			const { data } = await axios.get(`${server}/api/user/me`, {
				headers: { token: Cookies.get("token") },
			});

			setIsAuth(true);
			setUser(data);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setIsAuth(false);
			setLoading(false);
		}
	}

	function logout(navigate, setTotalItem) {
		Cookies.set("token", null);
		setUser([]);
		setIsAuth(false);
		navigate("/login");
		toast.success("Logged out successfully");
		setTotalItem(0);
	}

	useEffect(() => {
		fetchUser();
	}, []);

	return (
		<UserContext.Provider
			value={{
				user,
				loading,
				btnLoading,
				isAuth,
				loginUser,
				verifyUser,
				logout,
			}}
		>
			{children}
			<Toaster />
		</UserContext.Provider>
	);
};

export const Userdata = () => useContext(UserContext);

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { server } from "../config.js";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [totalItem, setTotalItem] = useState(0);
	const [subTotal, setSubTotal] = useState(0);
	const [cart, setCart] = useState([]);

	async function fetchCart() {
		try {
			const { data } = await axios.get(`${server}/api/cart/all`, {
				headers: {
					token: Cookies.get("token"),
				},
			});

			setCart(data.cart);
			setTotalItem(data.sumofQuantity);
			setSubTotal(data.subTotal);
		} catch (error) {
			console.log(error);
		}
	}

	async function addToCart(product) {
		try {
			const { data } = await axios.post(
				`${server}/api/cart/add`,
				{ product },
				{
					headers: {
						token: Cookies.get("token"),
					},
				},
			);

			toast.success(data.message);
			fetchCart();
		} catch (error) {
			toast.error(error.response.data.message);
		}
	}

	async function updateCart(action, id) {
		try {
			const { data } = await axios.post(
				`${server}/api/cart/update?action=${action}`,
				{ id },
				{
					headers: {
						token: Cookies.get("token"),
					},
				},
			);

			fetchCart();
		} catch (error) {
			toast.error(error.response.data.message);
		}
	}

	async function removeFromCart(id) {
		try {
			const { data } = await axios.get(`${server}/api/cart/remove/${id}`, {
				headers: {
					token: Cookies.get("token"),
				},
			});
			toast.success(data.message);
			fetchCart();
		} catch (error) {
			toast.error(error.response.data.message);
		}
	}

	useEffect(() => {
		fetchCart();
	}, []);

	return (
		<CartContext.Provider
			value={{
				cart,
				totalItem,
				subTotal,
				fetchCart,
				addToCart,
				setTotalItem,
				setSubTotal,
				updateCart,
				removeFromCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const CartData = () => useContext(CartContext);

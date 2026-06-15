import { CartData } from "@/context/CartContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { server } from "@/main";
import Loading from "@/components/Loading";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

function Payement() {
	const { cart, subTotal, fetchCart } = CartData();

	const [address, setAddress] = useState("");
	const [method, setMethod] = useState("");
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const { id } = useParams();

	async function fetchAddress() {
		try {
			const { data } = await axios.get(`${server}/api/address/${id}`, {
				headers: {
					token: Cookies.get("token"),
				},
			});

			setAddress(data);
			// setAddress(data.address);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchAddress();
	}, [id]);
	// console.log(address);

	const paymentHandler = async () => {
		if (method === "cod") {
			setLoading(true);
			try {
				const { data } = await axios.post(
					`${server}/api/order/new/cod`,
					{
						method,
						phone: address.phone,
						address: address.address,
					},
					{
						headers: {
							token: Cookies.get("token"),
						},
					},
				);
				setLoading(false);
				toast.success(data.message);
				fetchCart();
				navigate("/order");
			} catch (error) {
				setLoading(false);
				toast.error(error.response.data.message);
			}
		}

		if (method === "online") {
			const stripePromise = loadStripe(
				"pk_test_51TR8U01FdnIpgMFDC4ECc13ZNbPFJCZypLrAEaoGfND2AhyEhOpa3OHs2HnAgU55AnbONUOckD1qeSr9eqJf9JAi00bOMv8ice",
			);

			try {
				setLoading(true);

				const stripe = await stripePromise;
				const { data } = await axios.post(
					`${server}/api/order/new/online`,
					{
						method,
						phone: address.phone,
						address: address.address,
					},
					{
						headers: {
							token: Cookies.get("token"),
						},
					},
				);

				if (data.url) {
					window.location.href = data.url;
					setLoading(false);
				} else {
					toast.error("failed to create payment session");
					setLoading(false);
				}
			} catch (error) {
				setLoading(false);
				toast.error("Payment failed try again later");
				console.log(error.response?.data);
			}
		}
	};

	return (
		<div>
			{loading ? (
				<Loading />
			) : (
				<div className="container mx-auto px-4 py-8">
					<div className="space-y-8">
						<h2 className="text-3xl font-bold text-center">
							Proceed to payment
						</h2>

						<div>
							<h3 className="text-xl font-semibold">Products</h3>
							<Separator className="my-2"></Separator>

							<div className="space-y-4">
								{cart &&
									cart.map((e, idx) => (
										<div
											key={idx}
											className="flex flex-col items-center md:flex-row justify-center bg-card p-4 rounded-lg shadow border dark:border-gray-700"
										>
											<img
												src={e.product.images[0].url}
												alt="Product Img"
												className="w-16 h-16 object-cover rounded mb-4 md:mb-0"
											/>

											<div className="flex-1 md:ml-4 text-center md:text-left">
												<h2 className="text-lg font-medium">
													{e.product.title}
												</h2>

												<p className="text-sm text-muted-foreground dark:text-gray-400">
													₹ {e.product.price} X {e.quantity}
												</p>

												<p className="text-sm text-muted-foreground dark:text-gray-400">
													₹ {e.product.price * e.quantity}
												</p>
											</div>
										</div>
									))}
							</div>
						</div>

						<div className="text-lg font-medium text-center">
							Total price to be paid : ₹ {subTotal}
						</div>

						{address && (
							<div className="bg-card p-4 rounded-lg shadow border space-y-4 dark:border-gray-700">
								<h3 className="text-lg font-semibold text-center">Details</h3>
								<Separator className="my-2"></Separator>

								<div className="flex flex-col space-y-4">
									<div>
										<h4 className="font-semibold mb-1">Delivery Address</h4>
										<p className="text-sm text-muted-foreground dark:text-gray-500">
											<strong>Address : </strong>
											{address.address}
										</p>

										<p className="text-sm text-muted-foreground dark:text-gray-500">
											<strong>Phone : </strong>
											{address.phone}
										</p>
									</div>

									<div className="w-full md:w-1/2">
										<h4 className="font-semibold mb-1">
											Select payment method
										</h4>

										<select
											value={method}
											onChange={(e) => setMethod(e.target.value)}
											className="w-full p-2 border rounded-lg bg-card dark:bg-gray-900 dark:text-white"
										>
											<option value="">Select payment method</option>
											<option value="cod">Cash on delivery</option>
											<option value="online">Online payement</option>
										</select>
									</div>
								</div>
							</div>
						)}

						<Button
							className="w-full py-3 mt-4"
							disabled={!method || !address}
							onClick={paymentHandler}
						>
							Proceed to checkouts
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}

export default Payement;

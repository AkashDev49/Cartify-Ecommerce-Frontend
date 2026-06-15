import { CartData } from "@/context/CartContext";
import { server } from "@/main";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

function OrderProcessing() {
	const location = useLocation();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [paymentVerify, setPayemntVerified] = useState(false);
	const { fetchCart } = CartData();

	const queryParams = new URLSearchParams(location.search);
	const sessionId = queryParams.get("session_id");
	console.log("Sessoin id :", sessionId);

	useEffect(() => {
		const verifyPayment = async (req, res) => {
			if (!sessionId) {
				toast.error("sesssion Id is missing");
				return navigate("/cart");
			}

			if (paymentVerify) {
				return;
			}

			setLoading(true);

			try {
				const { data } = await axios.post(
					`${server}/api/order/verify/payment`,
					{
						sessionId,
					},
					{
						headers: {
							token: Cookies.get("token"),
						},
					},
				);

				if (data.success) {
					toast.success("Order Placed Successfully");
					setPayemntVerified(true);
					fetchCart();
					setLoading(false);
					setTimeout(() => {
						navigate("/orders");
					}, 10000);
				}
			} catch (error) {
				toast.error("Payment verification failed try again later");
				navigate("/cart");
				console.log(error);
			}
		};

		if (sessionId && !paymentVerify) {
			verifyPayment();
		}
	}, [sessionId, paymentVerify, navigate]);

	return (
		<div className="min-h-screen flex items-center justify-center bg-linear-to-r from-blue-100 to-blue-500">
			{loading ? (
				<>
					<div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-lg">
						<h1 className="text-4xl font-extrabold text-blue-600 mb-4">
							Processing Order
						</h1>
						<p className="text-lg text-gray-700 mb-6">
							Please wait while we process your payment and order
						</p>
						<Loader></Loader>
						<div className="text-xl text-gray-400">Processing...</div>
					</div>
				</>
			) : (
				<>
					<div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
						<div>
							<h1 className="text-4xl font-bold text-green-600 mb-4">
								Order placed
							</h1>
							<p className="text-gray-600 text-lg mb6">
								Thankyou for shopping with us. your order will be delivered soon
							</p>

							<Button onClick={() => navigate("/orders")}>
								Go to order page
							</Button>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default OrderProcessing;

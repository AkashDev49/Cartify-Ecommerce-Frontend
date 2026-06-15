import { server } from "@/main";
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Userdata } from "@/context/UserContext";
import HomePage from "@/components/admin/HomePage";

function OrderPage() {
	const { id } = useParams();
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const { user } = Userdata();

	const navigate = useNavigate();

	useEffect(() => {
		const fetchOrder = async () => {
			try {
				const { data } = await axios.get(`${server}/api/order/${id}`, {
					headers: {
						token: Cookies.get("token"),
					},
				});

				setOrders(data.order);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

		fetchOrder();
	}, [id]);

	if (loading) {
		return <Loading />;
	}

	if (!orders) {
		return (
			<div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
				<h1 className="text-2xl font-bold text-red-600">
					No Order with this id
				</h1>
				<Button onClick={() => navigate("/product")}>Shop now</Button>
			</div>
		);
	}

	return (
		<div className="container mx-auto py-6 px-4">
			{user._id === orders.user._id || user.role === "admin" ? (
				<>
					<Card className="mb-6">
						<CardHeader>
							<div className="flex justify-between">
								<CardTitle className="text-2xl font-bold">
									Order Details
								</CardTitle>
								<Button onClick={() => window.print()}>Print Order</Button>
							</div>
						</CardHeader>

						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
							<div>
								<h2 className="text-xl font-semibold mb-4">Order Summary</h2>

								<p>
									<strong>Order Id : </strong>
									{orders._id}
								</p>

								<p>
									<strong>Status : </strong>
									<span
										className={`${orders.status === "pending" ? "text-yellow-400" : "text-green-500"}`}
									>
										{orders.status}
									</span>
								</p>

								<p>
									<strong>Total Items : </strong>
									{orders.items.length}
								</p>

								<p>
									<strong>Payment Method : </strong>
									{orders.method}
								</p>

								<p>
									<strong>SubTotal : </strong>
									{orders.subTotal}
								</p>

								<p>
									<strong>Placed At : </strong>
									{new Date(orders.createdAt).toLocaleDateString()}
								</p>

								<p>
									<strong>Paid At : </strong>
									{orders.paidAt || "Payment through COD"}
								</p>
							</div>

							<div>
								<h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
								<p>
									<strong>Phone : </strong>
									{orders.phone}
								</p>

								<p>
									<strong>Address : </strong>
									{orders.address}
								</p>

								<p>
									<strong>User : </strong>
									{orders.user?.email || "Guest"}
								</p>
							</div>
						</div>
					</Card>

					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{orders.items.map((i, idx) => (
							<Card key={idx}>
								<Link to={`/product/${i.product._id}`}>
									<img
										src={i.product.images[0]?.url}
										alt="product title"
										className="max-w-full max-h-full object-contain m-auto"
									/>
								</Link>

								<CardContent>
									<h3 className="text-lg font-semibold">{i.product.title}</h3>
									<p>
										<strong>Quantity : </strong>
										{i.quantity}
									</p>

									<p>
										<strong>Price : </strong>₹ {i.product.price}
									</p>

									<p>
										<strong>Quantity : </strong>
										{i.quantity}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</>
			) : (
				<div className="w-[60%] m-auto flex flex-col justify-center items-center ">
					<img src="/not found.png" alt="Not found" />
					<Link to={"/"}>
						<Button variant={"outline"} className="mt-4">
							Go to <HomePage /> Page
						</Button>
					</Link>
				</div>
			)}
		</div>
	);
}

export default OrderPage;

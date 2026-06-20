import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CartData } from "@/context/CartContext";
import { ShoppingCart, Trash } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
	const { cart, totalItem, subTotal, updateCart, removeFromCart } = CartData();

	const navigate = useNavigate();

	const updatedCartHandler = async (action, id) => {
		await updateCart(action, id);
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-2xl font-bold mb-6 text-center">Shopping Cart</h1>
			{cart.length === 0 ? (
				<div className="text-center  py-10">
					<p className="text-xl text-gray-500">
						Your cart is empty
						<ShoppingCart size={200} className="m-auto mt-4" />
					</p>
					<Button className="mt-6" onClick={() => navigate("/product")}>
						Start Shopping
					</Button>
				</div>
			) : (
				<div className="grid gap-8 lg:grid-cols-3">
					<div className="lg:col-span-2 space-y-6">
						{cart.map((item) => (
							<div
								className="flex flex-col sm:flex-row items-center sm:items-stretch space-y-4 sm:space-y-0 sm:space-x-4 shadow-md p-4 rounded-lg border border-gray-400"
								key={item._id}
							>
								<img
									src={item.product.images[0].url}
									alt={item.product.title}
									className="w-full sm:w-24 sm:h-20 object-cover rounded-md cursor-pointer"
									onClick={() => navigate(`/product/${item.product._id}`)}
								/>

								<div className="flex-1 text-center sm:text-left">
									<h2 className="text-lg font-medium cursor-pointer">
										{item.product.title}
									</h2>
									<p className="text-gray-500">₹ {item.product.price}</p>
								</div>

								<div className="flex items-center space-x-2 justify-center sm:justify-start gap-2">
									<Button
										variant="outline"
										size="sm"
										onClick={() => updatedCartHandler("dec", item._id)}
									>
										-
									</Button>

									<span className="text-center font-bold">{item.quantity}</span>

									<Button
										variant="outline"
										size="sm"
										onClick={() => updatedCartHandler("inc", item._id)}
									>
										+
									</Button>
								</div>

								<Button
									variant="ghost"
									className="text-red-600"
									onClick={() => removeFromCart(item._id)}
								>
									<Trash size={18} className="w-5 h-5" />
								</Button>
							</div>
						))}
					</div>

					<div className="p-6 shadow-lg rounded-lg border border-gray-400">
						<h2 className="text-xl font-semibold mb-4 text-center lg:text-left">
							Order Summary
						</h2>

						<Separator className="my-4" />

						<div className="space-y-2">
							<div className="flex justify-between text-sm">
								<span>Total Items : {totalItem}</span>
								<span>Total Price : ₹ {subTotal}</span>
							</div>
						</div>

						<Separator className="my-4" />

						<div className="flex justify-between font-medium text-lg">
							<span>Total : </span>
							<span>₹ {subTotal}</span>
						</div>

						<Button
							className="w-full mt-7 p-5"
							onClick={() => navigate("/checkout")}
							disabled={cart.length === 0}
						>
							Checkout
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}

export default Cart;

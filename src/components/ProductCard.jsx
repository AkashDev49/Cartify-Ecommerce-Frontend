import { Badge } from "@/components/ui/badge";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

function ProductCard({ product, latest }) {
	const navigate = useNavigate();

	return (
		<div>
			{product && (
				<div className="w-75 mx-auto shadow-md rounded-lg overflow-hidden border border-gray-200">
					<Link to={`/product/${product._id}`}>
						<div className="relative h-75 bg-gray-100 flex justify-center">
							<img
								src={product.images[0].url}
								alt="Product"
								className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-300 "
							/>

							{latest === "yes" && (
								<Badge className="absolute top-2 left-2 bg-green-500 text-white ">
									New
								</Badge>
							)}
						</div>
					</Link>

					<div className="p-4">
						<h3 className="text-lg font-semibold truncate mb-2">
							{product.title.slice(0, 20)}
						</h3>
						<p className="text-sm mt-1 truncate">
							{product.description.slice(0, 50)}
						</p>
						<p className="text-lg font-bold mt-2">₹ {product.price}</p>
					</div>
					<div className="flex items-center justify-center mt-4 mb-4">
						<Button
							onClick={() => navigate(`/product/${product._id}`)}
							className="hover:cursor-pointer"
						>
							View Details
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}

export default ProductCard;

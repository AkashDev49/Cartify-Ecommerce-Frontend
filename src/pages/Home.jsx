import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { ProductData } from "@/context/ProductContext";
import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
	const navigate = useNavigate();
	const { loading, products, newProduct } = ProductData();

	return (
		<div>
			<Hero navigate={navigate} />
			<div className="top products mt-4 p-4">
				<h1 className="text-3xl mb-4">Latest Products</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
					{newProduct && newProduct.length > 0 ? (
						newProduct.map((product) => (
							<ProductCard key={product._id} product={product} latest={"yes"} />
						))
					) : (
						<p>No new products available.</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default Home;

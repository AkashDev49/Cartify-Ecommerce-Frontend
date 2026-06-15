import React from "react";
import { Button } from "./ui/button";

function Hero({ navigate }) {
	return (
		<div
			className="relative h-[calc(110vh-100px)] bg-cover bg-center flex items-center justify-center"
			style={{
				backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url("/bg image.jpg")`,
				// paddingTop: "10px",
			}}
		>
			<div className="flex items-center justify-center text-center h-full text-white">
				<div>
					<h1 className="text-4xl sm:text-6xl font-bold mb-6">
						Welcome to Our Store
					</h1>
					<p className="text-lg sm:text-2xl mb-8">
						Discover amazing products at great prices
					</p>
					<Button
						className="hover:cursor-pointer"
						variant="outline"
						size="lg"
						onClick={() => navigate("/product")}
					>
						Shop Now
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Hero;

import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

import { ProductData } from "@/context/ProductContext";
import { Filter, X } from "lucide-react";
import React, { useState } from "react";

const Product = () => {
	const [show, setShow] = useState(false);
	const {
		search,
		setSearch,
		category,
		categories,
		setCategory,
		totalPages,
		price,
		setPrice,
		page,
		setPage,
		allProducts,
		loading,
	} = ProductData();

	const handleClearFilters = () => {
		setSearch("");
		setCategory("");
		setPrice("");
		setPage(1);
	};

	const nextPage = () => {
		setPage(page + 1);
	};

	const previousPage = () => {
		setPage(page - 1);
	};

	return (
		<div className="flex flex-col md:flex-row h-full p-4">
			<div
				className={`fixed inset-y-0 left-0 z-50 md:z-40 w-64 bg-white text-black transform transition-transform duration-300 ease-in-out ${
					show ? "translate-x-0" : "-translate-x-full"
				} dark:bg-gray-900 dark:text-white shadow-lg md:relative md:translate-x-0`}
			>
				<div className="p-4 relative">
					<button
						onClick={() => setShow(false)}
						className="absolute top-4 right-4 bg-gray-200 text-black rounded-full p-2 md:hidden dark:bg-gray-700 dark:text-white"
					>
						<X />
					</button>

					<h1 className="text-3xl font-bold mb-4">Filter</h1>

					<div className="mb-4">
						<label className="block mb-2 text-sm font-medium">
							search title
						</label>

						<Input
							type="text"
							placeholder="Search product title..."
							className="w-full p-2 border border-gray-300 rounded-full bg-white text-black placeholder-gray-400 dark:bg-gray-800 dark:text-white dark:border-gray-600"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>

					<div className="mb-4">
						<label className="block mb-2 text-sm font-medium">Category</label>

						<select
							className="w-full p-2 border border-gray-300 rounded-md bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
							value={category}
							onChange={(e) => setCategory(e.target.value)}
						>
							<option value="">All</option>

							{categories.map((cat) => (
								<option key={cat} value={cat}>
									{cat}
								</option>
							))}
						</select>
					</div>

					<div className="mb-4">
						<label className="block mb-2 text-sm font-medium">Price</label>

						<select
							className="w-full p-2 border border-gray-300 rounded-md bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						>
							<option value="">select</option>
							<option value="lowToHigh">Low to High</option>
							<option value="highToLow">High to Low</option>
						</select>
					</div>

					<Button
						className="m-2 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
						onClick={handleClearFilters}
					>
						clear filter
					</Button>
				</div>
			</div>

			<div className="flex-1 p-4">
				<button
					className="md:hidden bg-blue-500 text-white rounded-md mb-4 py-2 px-4"
					onClick={() => setShow(true)}
				>
					<Filter></Filter>
				</button>
				{loading ? (
					<Loading />
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{allProducts && allProducts.length > 0 ? (
							allProducts.map((product) => (
								<ProductCard
									key={product._id}
									product={product}
									latest={"no"}
								/>
							))
						) : (
							<p>No new products available.</p>
						)}
					</div>
				)}

				<div className="mt-2 mb-3">
					<Pagination>
						<PaginationContent>
							{page !== 1 && (
								<PaginationItem
									onClick={previousPage}
									className="cursor-pointer"
								>
									<PaginationPrevious />
								</PaginationItem>
							)}

							{page !== totalPages && (
								<PaginationItem onClick={nextPage} className="cursor-pointer">
									<PaginationNext />
								</PaginationItem>
							)}
						</PaginationContent>
					</Pagination>
				</div>
			</div>
		</div>
	);
};
export default Product;

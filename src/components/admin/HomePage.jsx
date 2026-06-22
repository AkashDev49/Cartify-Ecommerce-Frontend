import { ProductData } from "@/context/ProductContext";
import React, { useState } from "react";
import Loading from "../Loading";
import ProductCard from "../ProductCard";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from "../ui/pagination";

import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { categories } from "@/main";
import { server } from "../../config.js";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";

function HomePage() {
	const { allProducts, page, setPage, fetchProducts, loading, totalPages } =
		ProductData();

	const nextPage = () => {
		setPage(page + 1);
	};

	const previousPage = () => {
		setPage(page - 1);
	};

	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		category: "",
		price: "",
		stock: "",
		images: null,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((pre) => ({ ...pre, [name]: value }));
	};

	const handleFileChange = (e) => {
		setFormData((prev) => ({ ...prev, images: e.target.files }));
	};

	const submitHandle = async (e) => {
		e.preventDefault();

		if (!formData.images || formData.images.length === 0) {
			return toast.error("Please select images");
		}

		const form = new FormData();

		Object.entries(formData).forEach(([key, value]) => {
			if (key === "images") {
				for (let i = 0; i < value.length; i++) {
					form.append("files", value[i]);
				}
			} else {
				form.append(key, value);
			}
		});

		try {
			const { data } = await axios.post(`${server}/api/product/new`, form, {
				headers: {
					"Content-Type": "multipart/form-data",
					token: Cookies.get("token"),
				},
			});

			toast.success(data.message);
			setOpen(false);
			setFormData({
				title: "",
				description: "",
				category: "",
				price: "",
				stock: "",
				images: null,
			});

			fetchProducts();
		} catch (error) {
			console.log(error);
			console.log(error.response.data.message);
		}
	};

	return (
		<div>
			<div className="flex justify-between">
				<h2 className="text-2xl font-bold">All Products</h2>

				<Button onClick={() => setOpen(true)} className="mb-4">
					Add Product
				</Button>

				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger />

					<DialogContent>
						<DialogHeader>
							<DialogTitle>Add new product </DialogTitle>
							<DialogDescription>
								Add your product details here
							</DialogDescription>
						</DialogHeader>

						<form onSubmit={submitHandle} className="space-y-4">
							<Input
								name="title"
								placeholder="Product Title"
								value={formData.title}
								onChange={handleChange}
								required
							/>

							<Input
								name="description"
								placeholder="Product Discription"
								value={formData.description}
								onChange={handleChange}
								required
							/>

							<select
								name="category"
								placeholder="Categroy"
								value={formData.category}
								onChange={handleChange}
								required
							>
								<option value="">Select Category</option>
								{categories.map((e) => {
									return (
										<option value={e} key={e}>
											{e}
										</option>
									);
								})}
							</select>

							<Input
								name="price"
								placeholder="Product Price"
								value={formData.price}
								onChange={handleChange}
								required
							/>

							<Input
								name="stock"
								placeholder="Product Stock"
								value={formData.stock}
								onChange={handleChange}
								required
							/>

							<Input
								type="file"
								name="images"
								accept="image/*"
								placeholder="image URL/Link"
								multiple
								onChange={handleFileChange}
								required
							/>

							<Button type="submit" className="w-full">
								Create Product
							</Button>
						</form>
					</DialogContent>
				</Dialog>
			</div>

			{loading ? (
				<Loading />
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{allProducts && allProducts.length > 0 ? (
						allProducts.map((e) => (
							<ProductCard product={e} key={e._id} latest={"no"} />
						))
					) : (
						<p>No Products Yet</p>
					)}
				</div>
			)}

			<div className="mt-2 mb-3">
				<Pagination>
					<PaginationContent>
						{page !== 1 && (
							<PaginationItem onClick={previousPage} className="cursor-pointer">
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
	);
}

export default HomePage;

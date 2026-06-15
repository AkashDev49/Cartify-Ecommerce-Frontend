import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CartData } from "@/context/CartContext";
import { ProductData } from "@/context/ProductContext";
import { Userdata } from "@/context/UserContext";
import { categories, server } from "@/main";
import axios from "axios";
import { Edit, Loader, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

function ProductPage() {
	const { fetchProduct, product, relatedProducts, loading } = ProductData();

	const { addToCart } = CartData();

	const { id } = useParams();

	const params = useParams();

	const { isAuth, user } = Userdata();

	useEffect(() => {
		fetchProduct(params.id);
	}, [params.id]);

	const addToCartHandler = () => {
		addToCart(id);
	};

	const [show, setShow] = useState(false);
	const [title, setTitle] = useState("");
	const [about, setAbout] = useState("");
	const [stock, setStock] = useState("");
	const [price, setPrice] = useState("");
	const [category, setCategory] = useState("");

	const [btnLoading, setBtnLoading] = useState(false);

	const updateHandler = () => {
		setShow(!show);
		setCategory(product.category);
		setTitle(product.title);
		setAbout(product.description);
		setStock(product.stock);
		setPrice(product.price);
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		setBtnLoading(true);
		try {
			const { data } = await axios.patch(
				`${server}/api/product/${id}`,
				{
					title,
					about,
					price,
					stock,
				},
				{
					headers: {
						token: Cookies.get("token"),
					},
				},
			);

			toast.success(data.message);
			fetchProduct(id);
			setShow(false);
			setBtnLoading(false);
		} catch (error) {
			toast.error(error.response.data.message);
			setBtnLoading(false);
		}
	};

	const [updateimages, setUpdateImages] = useState(null);

	const handleSubmitImage = async (e) => {
		e.preventDefault();
		setBtnLoading(true);

		if (!updateimages || updateimages.length === 0) {
			toast.error("Please select new image");
			setBtnLoading(false);
			return;
		}

		const formData = new FormData();

		for (let i = 0; i < updateimages.length; i++) {
			formData.append("files", updateimages[i]);
		}

		try {
			const { data } = await axios.post(
				`${server}/api/product/${id}`,
				formData,
				{
					headers: {
						token: Cookies.get("token"),
					},
				},
			);

			toast.success(data.message);
			fetchProduct(id);
			setBtnLoading(false);
		} catch (error) {
			toast.error(error.response.data.message);
			setBtnLoading(false);
		}
	};

	return (
		<div>
			{loading ? (
				<Loading />
			) : (
				<div className="container mx-auto px-4 py-8">
					{user && user.role === "admin" && (
						<div className="w-76 md:w-112.5 m-auto mb-5">
							<Button onClick={updateHandler}>{show ? <X /> : <Edit />}</Button>
							{show && (
								<form onSubmit={submitHandler} className="space-y-4">
									<div>
										<Label> Title</Label>
										<Input
											placeholder="Product title"
											value={title}
											onChange={(e) => setTitle(e.target.value)}
											required
										/>
									</div>

									<div>
										<Label>About</Label>
										<Input
											placeholder="about"
											value={about}
											onChange={(e) => setAbout(e.target.value)}
											required
										/>
									</div>

									<div>
										<Label>Category</Label>
										<select
											value={category}
											onChange={(e) => setCategory(e.target.value)}
											className="w-full p-2 border rounded-md dark:bg-gray-900 dark:text-white"
											required
										>
											{categories.map((val) => (
												<option value={val} key={val}>
													{val}
												</option>
											))}
										</select>
									</div>

									<div>
										<Label>Price</Label>
										<Input
											placeholder="Product price"
											value={price}
											onChange={(e) => setPrice(e.target.value)}
											required
										/>
									</div>

									<div>
										<Label>Stock</Label>
										<Input
											placeholder="Product stock"
											value={stock}
											onChange={(e) => setStock(e.target.value)}
											required
										/>
									</div>

									<Button className={"w-full"} disabled={btnLoading}>
										{btnLoading ? <Loader /> : "Update Product"}
									</Button>
								</form>
							)}
						</div>
					)}
					{product && (
						<div className="flex flex-col lg:flex-row items-start gap-14 ml-10">
							<div className="w-70 md:w-150">
								<Carousel>
									<CarouselContent>
										{product.images &&
											product.images.map((img, index) => (
												<CarouselItem key={index}>
													<img
														src={img.url}
														alt="product img"
														className="w-full rounded-md"
													/>
												</CarouselItem>
											))}
									</CarouselContent>

									<CarouselPrevious />
									<CarouselNext />
								</Carousel>

								{user && user.role === "admin" && (
									<form
										onSubmit={handleSubmitImage}
										className="flex gap-4 flex-col"
									>
										<div>
											<Label>Upload new image</Label>
											<input
												type="file"
												name="files"
												id="files"
												multiple
												accept="image/*"
												onChange={(e) => setUpdateImages(e.target.files)}
												className="block w-full mt-1 text-sm"
											/>
										</div>
										<Button disabled={btnLoading}>Update Image</Button>
									</form>
								)}
							</div>

							<div className="w-full lg:w-1/2 space-y-4">
								<h1 className="text-2xl font-bold">{product.title}</h1>
								<p className="text-lg">{product.description}</p>
								<p className="text-xl font-semibold">₹ {product.price}</p>
								{isAuth ? (
									<>
										{product.stock <= 0 ? (
											<p className="text-red-500">Out of stock</p>
										) : (
											<Button onClick={addToCartHandler}>Add to Cart</Button>
										)}
									</>
								) : (
									<p className="text-blue-500">
										Please log in to add something in cart
									</p>
								)}
							</div>
						</div>
					)}
				</div>
			)}

			{relatedProducts && relatedProducts.length > 0 && (
				<>
					{loading ? (
						<Loading />
					) : (
						<div className="mt-12">
							<h2 className="text-xl font-bold mb-4 ml-9">Related Products</h2>
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 ">
								{relatedProducts.map((prod) => (
									<ProductCard key={prod._id} product={prod} />
								))}
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
}

export default ProductPage;

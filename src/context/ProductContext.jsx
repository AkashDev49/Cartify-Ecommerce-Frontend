import { server } from "@/main";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
	const [allProducts, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [newProduct, setNewProduct] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [search, setSearch] = useState("");
	const [category, setCategory] = useState("");
	const [price, setPrice] = useState("");
	const [categories, setCategories] = useState([]);

	async function fetchProducts() {
		setLoading(true);
		try {
			const { data } = await axios.get(
				`${server}/api/product/items?search=${search}&category=${category}&sortByPrice=${price}&page=${page}`,
			);

			setProducts(data.allProducts);
			setNewProduct(data.newProduct);
			setCategories(data.categories);
			setTotalPages(data.totalPages);

			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	}

	const [product, setProduct] = useState([]);
	const [relatedProducts, setRelatedProducts] = useState([]);

	async function fetchProduct(id) {
		setLoading(true);
		try {
			const { data } = await axios.get(`${server}/api/product/${id}`);
			setProduct(data.product);
			setRelatedProducts(data.relatedProd);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchProducts();
	}, [search, category, price, page]);

	return (
		<ProductContext.Provider
			value={{
				allProducts,
				newProduct,
				loading,
				search,
				setSearch,
				category,
				setCategory,
				price,
				setPrice,
				categories,
				totalPages,
				page,
				setPage,
				fetchProduct,
				fetchProducts,
				product,
				relatedProducts,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
};

export const ProductData = () => useContext(ProductContext);

import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { server } from "../config.js";
import axios from "axios";
import Cookies from "js-cookie";
import { Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Checkout() {
	const [address, setAddress] = useState([]);
	const [loading, setLoading] = useState(true);

	async function fetchAddress() {
		try {
			const { data } = await axios.get(`${server}/api/address/all`, {
				headers: {
					token: Cookies.get("token"),
				},
			});

			setAddress(data.allAddress);
			setLoading(false);
		} catch (error) {
			console.error("Error fetching address:", error);
			setLoading(false);
		}
	}

	const [modalOpen, setModalOpen] = useState(false);
	const [newAddress, setNewAddress] = useState({
		address: "",
		phone: "",
	});

	const handleAddAddress = async () => {
		try {
			const { data } = await axios.post(
				`${server}/api/address/new`,
				{ address: newAddress.address, phone: newAddress.phone },
				{
					headers: {
						token: Cookies.get("token"),
					},
				},
			);

			if (data.message) {
				toast.success(data.message);
				fetchAddress();
				setAddress({
					address: "",
					phone: "",
				});
				setModalOpen(false);
			}
		} catch (error) {
			console.error("Error adding address:", error);
			toast.error(error.response.data.message);
		}
	};

	useEffect(() => {
		fetchAddress();
	}, []);

	const handleDeleteAddress = async (id) => {
		if (confirm("Are you sure you want to delete this address?")) {
			try {
				const { data } = await axios.delete(`${server}/api/address/${id}`, {
					headers: {
						token: Cookies.get("token"),
					},
				});

				toast.success(data.message);
				fetchAddress();
			} catch (error) {
				console.error("Error deleting address:", error);
				toast.error(error.response.data.message);
			}
		}
	};

	return (
		<div className="container mx-auto px-4 py-8 min-h-[60vh]">
			<h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
			{loading ? (
				<Loading />
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-3 gap-6">
					{address && address.length > 0 ? (
						address.map((item) => (
							<div className="p-4 border rounded-lg shadow-md" key={item._id}>
								<h3 className="text-xl font-semibold flex justify-between gap-3.5">
									Address - {item.address}
									<Button
										variant="destructive"
										onClick={() => handleDeleteAddress(item._id)}
									>
										<Trash />
									</Button>
								</h3>

								<p className="text-gray-600 text-sm mt-2">
									Phone - {item.phone}
								</p>

								<Link to={`/payment/${item._id}`}>
									<Button variant="outline">Use this address</Button>
								</Link>
							</div>
						))
					) : (
						<p>No address found</p>
					)}
				</div>
			)}

			<Button
				className="mt-6"
				variant="outline"
				onClick={() => setModalOpen(true)}
			>
				Add New Address
			</Button>

			<Dialog open={modalOpen} onOpenChange={setModalOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add new address</DialogTitle>
						<DialogDescription>
							Enter your delivery address and phone number.
						</DialogDescription>
					</DialogHeader>

					<div className="space-y-4">
						<Input
							type="text"
							placeholder="Address"
							value={newAddress.address}
							onChange={(e) =>
								setNewAddress({ ...newAddress, address: e.target.value })
							}
						/>

						<Input
							type="number"
							placeholder="Phone"
							value={newAddress.phone}
							onChange={(e) =>
								setNewAddress({ ...newAddress, phone: e.target.value })
							}
						/>
					</div>

					<DialogFooter>
						<Button variant="outline" onClick={() => setModalOpen(false)}>
							Cancel
						</Button>

						<Button onClick={handleAddAddress} variant="outline">
							Add Address
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default Checkout;

import HomePage from "@/components/admin/HomePage";
import InfoPage from "@/components/admin/InfoPage";
import OrderPage from "@/components/admin/OrderPage";
import { Button } from "@/components/ui/button";
import { Userdata } from "@/context/UserContext";
import {
	Home,
	Info,
	Menu,
	PhoneIcon,
	PhoneMissed,
	ShoppingCart,
	X,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
	const [selectedPage, setSelectedPage] = useState("home");
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const navigate = useNavigate();

	const { user } = Userdata();

	if (user.role !== "admin") {
		return navigate("/");
	}

	const renderPageContent = () => {
		switch (selectedPage) {
			case "home":
				return <HomePage />;

			case "order":
				return <OrderPage />;

			case "info":
				return <InfoPage />;

			default:
				return <HomePage />;
		}
	};

	return (
		<div className="flex min-h-screen">
			<div
				className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed lg:relative lg:translate-x-0 h-full shadow-lg transition-transform duration-300 bg-background/50 border-b backdrop-blur z-50`}
			>
				<div className="flex flex-col h-full p-4">
					<h1 className="text-lg font-bold mb-4">Admin Panel</h1>
					<div className="space-y-4">
						<Button
							variant="ghost"
							onClick={() => setSelectedPage("home")}
							className={`w-full flex items-center gap-2 ${selectedPage === "home" ? "bg-gray-500" : ""}`}
						>
							<Home className="w-5 h-5" />
							Home
						</Button>

						<Button
							variant="ghost"
							onClick={() => setSelectedPage("order")}
							className={`w-full flex items-center gap-2 ${selectedPage === "order" ? "bg-gray-500" : ""}`}
						>
							<ShoppingCart className="w-5 h-5" />
							Orders
						</Button>

						<Button
							variant="ghost"
							onClick={() => setSelectedPage("info")}
							className={`w-full flex items-center gap-2 ${selectedPage === "info" ? "bg-gray-500" : ""}`}
						>
							<Info className="w-5 h-5" />
							Details
						</Button>

						<Button
							variant="ghost"
							className="lg:hidden"
							onClick={() => setSidebarOpen(false)}
						>
							<X className="w-5 h-5"></X>Close
						</Button>
					</div>
				</div>
			</div>

			<div className="flex flex-1 flex-col">
				<div className="shadow p-4 flex items-center justify-between lg:justify-end">
					<Button
						variant="outline"
						className="lg:hidden"
						onClick={() => setSidebarOpen(!sidebarOpen)}
					>
						<Menu className="w-5 h-5"></Menu>
					</Button>

					<h2 className="text-lg font-bold hidden lg:block">Admin Dashboard</h2>
				</div>

				<div className="p-4">{renderPageContent()}</div>
			</div>
		</div>
	);
}

export default AdminDashboard;

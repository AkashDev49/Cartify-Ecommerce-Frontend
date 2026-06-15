import { LogIn, ShoppingCart, User } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ModeToggle } from "./mode-toggle";
import { Userdata } from "@/context/UserContext";
import { CartData } from "@/context/CartContext";

function Navbar() {
	const navigate = useNavigate();

	const { isAuth, logout, user } = Userdata();

	const { totalItem, fetchCart } = CartData();

	const logoutHadler = () => {
		logout(navigate, fetchCart);
	};

	return (
		<div className="z-50 sticky top-0 bg-background/50 border-b backdrop-blur">
			<div className="container mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between">
				<h1 className="text-2xl font-bold">Cartify</h1>
				<ul className="flex justify-center items-center space-x-6 ms-auto">
					<li className="cursor-pointer" onClick={() => navigate("/")}>
						Home
					</li>
					<li className="cursor-pointer" onClick={() => navigate("/product")}>
						Products
					</li>
					<li
						className="cursor-pointer relative flex items-center"
						onClick={() => navigate("/cart")}
					>
						<ShoppingCart className="w-6 h-6" />
						<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
							{totalItem || 0}
						</span>
					</li>

					<li className="cursor-pointer">
						<DropdownMenu>
							<DropdownMenuTrigger>
								{isAuth ? <User /> : <LogIn />}
							</DropdownMenuTrigger>

							<DropdownMenuContent
								className="w-56 h-30 p-2 text-base"
								align="end"
							>
								<DropdownMenuLabel>User</DropdownMenuLabel>
								<DropdownMenuSeparator>
									{!isAuth ? (
										<>
											<DropdownMenuItem onClick={() => navigate("/login")}>
												Login
											</DropdownMenuItem>
										</>
									) : (
										<>
											<DropdownMenuItem onClick={() => navigate("/orders")}>
												Your Order
											</DropdownMenuItem>

											{user && user.role === "admin" && (
												<DropdownMenuItem
													onClick={() => navigate("/admin/dashboard")}
												>
													Dashboard
												</DropdownMenuItem>
											)}

											<DropdownMenuItem onClick={logoutHadler}>
												Logout
											</DropdownMenuItem>
										</>
									)}
								</DropdownMenuSeparator>
							</DropdownMenuContent>
						</DropdownMenu>
					</li>

					<ModeToggle />
				</ul>
			</div>
		</div>
	);
}

export default Navbar;

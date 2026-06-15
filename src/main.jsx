import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { UserProvider } from "./context/UserContext";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";

export const server = "https://cartify-ecommerce-website-v9wx.onrender.com";

export const categories = [
	"Electronics",
	"Mobiles",
	"Laptops",
	"Computers",
	"Gaming",
	"Gaming Accessories",
	"Headphones",
	"Earbuds",
	"Smart Watches",
	"Cameras",
	"Speakers",
	"Power Banks",
	"Chargers",
	"Computer Accessories",
	"Men Fashion",
	"Women Fashion",
	"Kids Fashion",
	"T-Shirts",
	"Shirts",
	"Jeans",
	"Shoes",
	"Sneakers",
	"Sandals",
	"Watches",
	"Bags",
	"Jewellery",
	"Beauty",
	"Makeup",
	"Skin Care",
	"Hair Care",
	"Perfumes",
	"Books",
	"Stationery",
	"Office Supplies",
	"Home Decor",
	"Furniture",
	"Kitchen",
	"Kitchen Appliances",
	"Home Appliances",
	"TV & Entertainment",
	"Refrigerators",
	"Washing Machines",
	"Air Conditioners",
	"Fitness",
	"Gym Equipment",
	"Sports",
	"Outdoor",
	"Cycling",
	"Automobile",
	"Bike Accessories",
	"Car Accessories",
	"Toys",
	"Baby Products",
	"Pet Supplies",
	"Groceries",
	"Food & Beverages",
	"Snacks",
	"Organic Products",
	"Health Care",
	"Medical Supplies",
	"Supplements",
	"Art & Crafts",
	"Musical Instruments",
	"Mobile Accessories",
	"USB Gadgets",
	"Networking",
	"Software",
	"Digital Products",
	"Gift Items",
	"Festival Decorations",
	"Lighting",
	"Tools & Hardware",
	"Industrial",
	"Travel Accessories",
	"Luggage",
	"Smart Home",
	"Security Devices",
	"Drone",
	"VR Accessories",
	"Anime Merchandise",
	"Collectibles",
	"Luxury Products",
	"Handmade Products",
	"Eco Friendly",
	"Daily Essentials",
	"Party Supplies",
	"Wedding Accessories",
	"Seasonal Products",
	"Winter Wear",
	"Summer Collection",
	"Rain Wear",
	"Photography",
	"Streaming Equipment",
	"Content Creator Gear",
	"Phone Cases",
	"Tempered Glass",
	"Bluetooth Devices",
	"Cables",
	"Printers",
	"Ink & Toner",
	"Educational Toys",
	"DIY Kits",
	"Garden Supplies",
	"Camping Gear",
	"Fishing Accessories",
];

createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<ThemeProvider>
			<UserProvider>
				<ProductProvider>
					<CartProvider>
						<App />
					</CartProvider>
				</ProductProvider>
			</UserProvider>
		</ThemeProvider>
	</BrowserRouter>,
);

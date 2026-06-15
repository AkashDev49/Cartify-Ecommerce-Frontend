import React from "react";
import {
	FaFacebook,
	FaInstagram,
	FaLinkedinIn,
	FaTwitter,
	FaYoutube,
} from "react-icons/fa";

function Footer() {
	return (
		<footer className="w-full mt-30">
			<hr className="border border-gray-300 dark:border-gray-900" />

			<div className="container mx-auto px-4 py-6">
				<div className="flex flex-col md:flex-row justify-between items-center">
					<div className="mb-6 flex-col md:flex-row justify-between items-center ">
						<h1 className="text-xl font-bold">Cartify</h1>
						<p className="text-sm">
							Your one stop shop for everything you need
						</p>
					</div>

					<div className="flex flex-wrap justify-center md:justify-end gap-4">
						<a href="#" className="text-sm hover:underline">
							About
						</a>
						<a href="#" className="text-sm hover:underline">
							Contact us
						</a>
						<a href="#" className="text-sm hover:underline">
							Privacy Policies
						</a>
						<a href="#" className="text-sm hover:underline">
							Terms & Conditions
						</a>
					</div>
				</div>

				<div className="mt-6 text-center">
					<p className="text-sm ">Follow us:</p>
					<div className="flex justify-center gap-4 mt-2">
						<a href="#" className="hover:opacity-75">
							<FaFacebook />
						</a>
						<a href="#" className="hover:opacity-75">
							<FaYoutube />
						</a>
						<a
							href="https://github.com/AkashDev49"
							className="hover:opacity-75"
						>
							<FaTwitter />
						</a>
						<a
							href="https://www.linkedin.com/in/aakasheng/"
							className="hover:opacity-75"
						>
							<FaLinkedinIn />
						</a>
						<a href="#" className="hover:opacity-75">
							<FaInstagram />
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;

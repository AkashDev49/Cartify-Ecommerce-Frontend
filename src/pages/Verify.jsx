import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Userdata } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { CartData } from "@/context/CartContext";

function Verify() {
	let [otp, setOtp] = useState("");

	const navigate = useNavigate();

	const { btnLoading, loginUser, verifyUser } = Userdata();

	const { fetchCart } = CartData();

	const [timer, setTimer] = useState(90);
	const [canResend, setCanResend] = useState(false);

	useEffect(() => {
		if (timer > 0) {
			const interval = setInterval(() => {
				setTimer((prev) => prev - 1);
			}, 1000);
			return () => clearInterval(interval);
		} else {
			setCanResend(true);
		}
	}, [timer]);

	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const second = time % 60;
		return `${String(minutes).padStart(2, "0")}:${String(second).padStart(2, "0")}`;
	};

	const handleResend = async () => {
		const email = localStorage.getItem("email");
		await loginUser(email, navigate);

		setTimer(90);
		setCanResend(false);
	};

	const submitHandler = () => {
		verifyUser(Number(otp), navigate, fetchCart);
	};
	return (
		<div className="min-h-[59vh]">
			<Card className="md:w-100 sm:w-75 m-auto mt-5">
				<CardHeader>
					<CardTitle>Verify using otp</CardTitle>
					<CardDescription>
						if you didnt get otp in mail then you check your otp in mail spam
						folder
					</CardDescription>
				</CardHeader>

				<CardContent className="space-y-2">
					<div className="space-x-1">
						<Label className="mb-2">OTP</Label>
						<Input
							placeholder="enter your email"
							type="number"
							value={otp}
							onChange={(e) => setOtp(e.target.value)}
						/>
					</div>
				</CardContent>

				<CardFooter>
					<Button disabled={btnLoading} onClick={submitHandler}>
						{btnLoading ? <Loader /> : "Submit"}
					</Button>
				</CardFooter>

				<div className="flex flex-col justify-center items-center w-50 m-auto">
					<p className="text-lg mb-3">
						{canResend
							? "You can now resend otp"
							: `time remaning : ${formatTime(timer)}`}
					</p>
					<Button onClick={handleResend} className="mb-3" disabled={!canResend}>
						Resend Otp
					</Button>
				</div>
			</Card>
		</div>
	);
}

export default Verify;

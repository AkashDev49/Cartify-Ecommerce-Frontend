import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Userdata } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

function Login() {
	const [email, setEmail] = useState("");

	const navigate = useNavigate();

	const { loginUser, btnLoading } = Userdata();

	const submitHandler = () => {
		loginUser(email, navigate);
	};

	return (
		<div className="min-h-[59vh]">
			<Card className="md:w-100 sm:w-75 m-auto mt-5">
				<CardHeader>
					<CardTitle>Email</CardTitle>
					<CardDescription>
						If you have already email please login
					</CardDescription>
				</CardHeader>

				<CardContent className="space-y-2">
					<div className="space-x-1">
						<Label className="mb-2">Email</Label>
						<Input
							placeholder="enter your email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
				</CardContent>

				<CardFooter>
					<Button disabled={btnLoading} onClick={submitHandler}>
						{btnLoading ? <Loader /> : "Submit"}
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}

export default Login;

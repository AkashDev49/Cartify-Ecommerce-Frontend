import { server } from "@/main";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import {
	Bar,
	CartesianGrid,
	Label,
	Pie,
	PieChart,
	Tooltip,
	XAxis,
	YAxis,
	BarChart,
} from "recharts";
import { Userdata } from "@/context/UserContext";
import Order from "@/pages/Order";

function InfoPage() {
	const [cod, setCod] = useState(0);
	const [online, setOnline] = useState(0);
	const [data, setData] = useState([]);

	async function fetchStats() {
		try {
			const { data } = await axios.get(`${server}/api/order/stats`, {
				headers: {
					token: Cookies.get("token"),
				},
			});

			setCod(data.cod);
			setOnline(data.onlineOrder);
			setData(data.data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchStats();
	}, []);

	const paymentData = [
		{ method: "online", users: online, fill: "#48cae4" },
		{ method: "cod", users: cod, fill: "#ffb703" },
	];

	const paymentChartConfig = {
		users: {
			label: "Users",
		},
		online: {
			label: "Online",
			color: "#48cae4",
		},

		cod: {
			label: "Cod",
			color: "#ffb703",
		},
	};

	const paymentPercentage = paymentData.map((data) => ({
		...data,
		percentage: parseFloat(((data.users / (cod + online)) * 100).toFixed(2)),
	}));

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
			<Card className={"flex flex-col"}>
				<CardHeader className={"items-center pb-0"}>
					<CardTitle>Pie Chart - Payment Methods</CardTitle>
					<CardDescription>Payment Breakdown</CardDescription>
				</CardHeader>

				<CardContent className={"flex-1 pb-0"}>
					<ChartContainer
						config={paymentChartConfig}
						className={"mx-auto aspect-square max-h-63"}
					>
						<PieChart>
							<ChartTooltip
								cursor={false}
								content={<ChartTooltipContent hideLabel />}
							/>

							<Pie
								data={paymentData}
								dataKey={"users"}
								nameKey="method"
								innerRadius={60}
								strokeWidth={5}
							>
								<Label
									content={({ viewBox }) => {
										if (viewBox && "cx" in viewBox && "cy" in viewBox) {
											return (
												<text
													x={viewBox.cx}
													y={viewBox.cy}
													textAnchor="middle"
													dominantBaseline={"middle"}
												>
													<tspan
														x={viewBox.cx}
														y={viewBox.cy}
														className="fill-foreground text-xl font-medium"
													>
														{cod + online} Users
													</tspan>
												</text>
											);
										}
									}}
								></Label>
							</Pie>
						</PieChart>
					</ChartContainer>
				</CardContent>

				<CardFooter className={"flex flex-col gap-2 text-sm"}>
					<div className="leading-none text-muted-foreground">
						Showing Total Users for Payment Methods
					</div>
				</CardFooter>
			</Card>

			<Card className={"flex flex-col"}>
				<CardHeader className={"items-center pb-0"}>
					<CardTitle>Pie Chart - Payment Percentage</CardTitle>
					<CardDescription>Payment Breakdown</CardDescription>
				</CardHeader>

				<CardContent className={"flex-1 pb-0"}>
					<ChartContainer
						config={paymentChartConfig}
						className={"mx-auto aspect-square max-h-63"}
					>
						<PieChart>
							<ChartTooltip
								cursor={false}
								content={<ChartTooltipContent hideLabel />}
							/>

							<Pie
								data={paymentPercentage}
								dataKey={"percentage"}
								nameKey="method"
								innerRadius={60}
								strokeWidth={5}
							>
								<Label
									content={({ viewBox }) => {
										if (viewBox && "cx" in viewBox && "cy" in viewBox) {
											return (
												<text
													x={viewBox.cx}
													y={viewBox.cy}
													textAnchor="middle"
													dominantBaseline={"middle"}
												>
													<tspan
														x={viewBox.cx}
														y={viewBox.cy}
														className="fill-foreground text-xl font-medium"
													>
														100%
													</tspan>
												</text>
											);
										}
									}}
								></Label>
							</Pie>
						</PieChart>
					</ChartContainer>
				</CardContent>

				<CardFooter className={"flex flex-col gap-2 text-sm"}>
					<div className="leading-none text-muted-foreground">
						Display the percentage distribution of payment methods
					</div>
				</CardFooter>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Bar Chart - Payment Percentage</CardTitle>
					<CardDescription>Units sold for each products</CardDescription>
				</CardHeader>

				<CardContent>
					<BarChart
						width={600}
						height={400}
						data={data}
						margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
					>
						<CartesianGrid strokeDasharray={"3 3"} />
						<XAxis
							dataKey={"sold"}
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => `${value}`}
						/>

						<YAxis />

						<Tooltip
							cursor={{ fill: "#f0f0f0" }}
							content={({ payload }) => {
								if (payload && payload.length) {
									// const { name, sold } = payload[0];

									return (
										<div
											style={{
												backgroundColor: "white",
												padding: "10px",
												border: "1px solid #ddd",
												fontSize: "12px",
											}}
										>
											<strong>{payload[0].payload.name}</strong>
											<br />
											<span>Sold : {payload[0].value}</span>
										</div>
									);
								}
								return null;
							}}
						/>

						<Bar dataKey={"sold"} fill="#9d4edd" radius={8} />
					</BarChart>
				</CardContent>

				<CardFooter className={"flex flex-col gap-2 text-sm"}>
					<div className="leading-none text-muted-foreground">
						Hover over the bar to see in details
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}

export default InfoPage;

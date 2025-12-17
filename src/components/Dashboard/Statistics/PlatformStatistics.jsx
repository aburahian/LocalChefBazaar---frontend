import React from "react";
import { useQuery } from "@tanstack/react-query";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PlatformStatistics = () => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, error } = useQuery({
    queryKey: ["platformStats"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/stats`
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner/>;
  if (error) return <p>Error fetching statistics</p>;

  const barData = [
    { name: "Total Payments", value: data.totalPaymentAmount },
    { name: "Total Users", value: data.totalUsers },
    { name: "Pending Orders", value: data.ordersPending },
    { name: "Delivered Orders", value: data.ordersDelivered },
  ];

  const pieData = [
    { name: "Pending Orders", value: data.ordersPending },
    { name: "Delivered Orders", value: data.ordersDelivered },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Platform Statistics</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h2 className="text-lg font-medium">Total Payments</h2>
          <p className="text-2xl font-bold">${data.totalPaymentAmount}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h2 className="text-lg font-medium">Total Users</h2>
          <p className="text-2xl font-bold">{data.totalUsers}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h2 className="text-lg font-medium">Orders Pending</h2>
          <p className="text-2xl font-bold">{data.ordersPending}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h2 className="text-lg font-medium">Orders Delivered</h2>
          <p className="text-2xl font-bold">{data.ordersDelivered}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">All Metrics Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Orders Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PlatformStatistics;

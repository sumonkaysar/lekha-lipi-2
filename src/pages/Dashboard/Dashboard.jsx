import { useState } from "react";
import Barchart from "../../components/Dashboard/Dashboard/charts/Barchart";
import DashboardCounts from "../../components/Dashboard/Dashboard/DashboardCounts";

const Dashboard = () => {
    const [data, setData] = useState([
        { name: 'A', value: 30 },
        { name: 'B', value: 80 },
        { name: 'C', value: 45 },
        { name: 'D', value: 60 },
        { name: 'E', value: 20 },
        { name: 'F', value: 90 },
        { name: 'G', value: 55 },
    ]);

    return (
        <div className="mb-20 mt-10 w-11/12 mx-auto">
            <h1 className="font-semibold text-3xl uppercase text-[#064e89]">Dashboard</h1>
            <div className="mt-10">
                <DashboardCounts />
                <Barchart data={data} />
            </div>
        </div>
    )
};

export default Dashboard
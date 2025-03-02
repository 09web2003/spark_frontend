import React from "react";
import "./Analytics.css";
import NavRightShare from "../../components/navrightshare/NavRightShare";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Title, Legend } from "chart.js";
import Topsidebar from "../../components/topsidebar/Topsidebar";
import { useState } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ComposedChart,
  Bar,
  CartesianGrid,
} from "recharts";

Chart.register(ArcElement, Title, Legend);
function Analytics() {
  const data = [
    {
      label: "Jan",
      points: 1000,
    },
    {
      label: "Feb",
      points: 0,
    },
    {
      label: "Mar",
      points: 1500,
    },
    {
      label: "Apr",
      points: 2800,
    },
    {
      label: "May",
      points: 3000,
    },
    {
      label: "Jun",
      points: 1000,
    },
    {
      label: "Jul",
      points: 2000,
    },
  ];
  const colors = [
    " #92FFC6",
    " #9BEBC1",
    " #165534",
    " #3EE58F",
    " #A1D4BA",
    " #21AF66",
  ];

  const bardata = [
    {
      name: "Linux",
      amt: 1500,
      fill: colors[0],
    },
    {
      name: "Mac",
      amt: 2500,
      fill: colors[1],
    },
    {
      name: "ios",
      amt: 1000,
      fill: colors[2],
    },
    {
      name: "Window",
      amt: 3000,
      fill: colors[3],
    },
    {
      name: "Android",
      amt: 2000,
      fill: colors[4],
    },
    {
      name: "Other",
      amt: 1000,
      fill: colors[5],
    },
  ];

  const piedata = {
    datasets: [
      {
        data: [10, 20, 30, 40, 50, 60],
        backgroundColor: [
          " #92FFC6",
          " #9BEBC1",
          " #165534",
          " #3EE58F",
          " #A1D4BA",
          " #21AF66",
        ],
      },
    ],
  };

  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0]; 
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);
  const formattedNextWeek = nextWeek.toISOString().split("T")[0]; 

  const [startDate, setStartDate] = useState(formattedToday);

  return (
    <>
    
    
      <div className="analytic-nav">
        <NavRightShare />
        <Topsidebar />
      </div>
     

      <div className="overview">
        <div className="overview1">Overview</div>
        <div className="date">
          <input
            className='calender'
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={formattedToday} 
            max={formattedNextWeek}
          />
        </div>
      </div>
      <div className="click-ondata">
        <div className="click1">
          <p>Click on Links</p>
          <h3>2</h3>
        </div>
        <div className="click2">
          <p>Click on Shop</p>
          <h3>2</h3>
        </div>
        <div className="click3">
          <p>Click on CTA</p>
          <h3>2</h3>
        </div>
      </div>
      <div className="analytics-line">
        <div className="line">
          <ResponsiveContainer
            
            aspect={3}
            className="line-respo"
          >
            <LineChart data={data} className="line-chart" stroke="none">
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Line
                type="bump"
                dataKey="points"
                stroke="gray"
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="analytics-bar">
        <div className="bar">
          <p className="traffic-p">Traffic by Device</p>
          <ResponsiveContainer
           
            className="bar-repo"
            width="90%" height="80%"
          >
            <ComposedChart data={bardata}>
              <CartesianGrid stroke="white" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amt" barSize={20} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="chart">
          <p className="traffic-p">Sites</p>
          <Pie
            data={piedata}
            className="pirchart"
          />
        </div>
      </div>
      <div className="bar-down">
        <div className="bar-down2">
          <p
            className="traffic-p"
            style={{ paddingLeft: "1rem", paddingTop: "1rem" }}
          >
            Traffic by Device
          </p>
          <ResponsiveContainer width="90%" height="80%">
            <ComposedChart data={bardata}>
              <CartesianGrid stroke="white" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amt" barSize={20} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
      
    </>
  );
}

export default Analytics;

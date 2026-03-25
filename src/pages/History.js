import React, { useState } from "react";
import ReactECharts from "echarts-for-react";

function History() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState(null);

  const fetchHistory = async () => {
    if (!startDate || !endDate) return;

    const res = await fetch(
      `https://archive-api.open-meteo.com/v1/archive?latitude=28.6&longitude=77.2&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum`
    );

    const result = await res.json();
    setData(result);
  };

  const chartOption = data && {
    tooltip: { trigger: "axis" },

    xAxis: {
      type: "category",
      data: data.daily.time,
    },

    yAxis: {
      type: "value",
    },

    dataZoom: [
      { type: "inside" }, // 🔍 zoom
      { type: "slider" }, // ↔️ scroll
    ],

    series: [
      {
        name: "Max Temp",
        type: "line",
        data: data.daily.temperature_2m_max,
      },
      {
        name: "Min Temp",
        type: "line",
        data: data.daily.temperature_2m_min,
      },
    ],
  };

  return (
    <div>
      <h1>Historical Data</h1>

      <input type="date" onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" onChange={(e) => setEndDate(e.target.value)} />

      <button onClick={fetchHistory}>Get Data</button>

      {data && (
        <div>
          <h2>Temperature Trends</h2>
          <ReactECharts option={chartOption} style={{ height: 400 }} />
        </div>
      )}
    </div>
  );
}

export default History;
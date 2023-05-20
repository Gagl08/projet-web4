import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { NotificationType } from "@prisma/client";

const LineChart = () => {
  const [chartData, setChartData] = useState(null);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `/api/notification?where={"type" :"${NotificationType.NEW_MATCH}"}`
      );
      const data = await response.json();

      // Traiter les données pour compter le nombre de likes et de matchs par date
      const likesByDate = {};
      const matchesByDate = {};

      data.forEach((entry) => {
        const date = entry.date;
        const likes = entry.likes;
        const matches = entry.matches;

        if (likesByDate[date]) {
          likesByDate[date] += likes;
        } else {
          likesByDate[date] = likes;
        }

        if (matchesByDate[date]) {
          matchesByDate[date] += matches;
        } else {
          matchesByDate[date] = matches;
        }
      });

      // Préparer les données pour le graphique
      const chartData = {
        labels: Object.keys(likesByDate),
        datasets: [
          {
            label: "Nombre total de likes",
            data: Object.values(likesByDate),
            fill: false,
            borderColor: "rgba(75, 192, 192, 1)",
            tension: 0.1,
          },
          {
            label: "Nombre total de matchs",
            data: Object.values(matchesByDate),
            fill: false,
            borderColor: "rgba(192, 75, 192, 1)",
            tension: 0.1,
          },
        ],
      };

      setChartData(chartData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    // Fonction pour récupérer les données depuis le backend
    fetchData();
  }, []);

  if (!chartData) {
    return null;
  }
  return <Line options={options} data={chartData} />;
};

export default LineChart;

import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

const BarChart = () => {
  const [userData, setUserData] = useState([]);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  useEffect(() => {
    // Fonction pour récupérer les données des utilisateurs depuis le backend
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Compter le nombre de créations par mois
  const countCreationsByMonth = () => {
    const monthCounts = Array(12).fill(0);

    userData.forEach((user) => {
      const creationDate = new Date(user.createdAt);
      const monthIndex = creationDate.getMonth();
      monthCounts[monthIndex]++;
    });

    return monthCounts;
  };

  // Obtenir les étiquettes des mois de l'année
  const getMonthLabels = () => {
    const monthLabels = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ];

    return monthLabels;
  };

  // Préparer les données pour le graphique
  const data = {
    labels: getMonthLabels(),
    datasets: [
      {
        label: "Nombre de créations",
        data: countCreationsByMonth(),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        stepSize: 1,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;

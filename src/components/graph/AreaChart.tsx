import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const AreaChart = ({ userId }) => {
  const [likeData, setLikeData] = useState([]);

  useEffect(() => {
    // Fonction pour récupérer les données des likes depuis le backend pour un utilisateur spécifique
    const fetchLikeData = async () => {
      try {
        const response = await fetch(`/api/likes?userId=${userId}`);
        const data = await response.json();
        setLikeData(data);
      } catch (error) {
        console.error("Failed to fetch like data:", error);
      }
    };

    fetchLikeData();
  }, [userId]);

  // Compter le nombre de likes par mois pour un utilisateur spécifique
  const countLikesByMonth = () => {
    const monthCounts = Array(12).fill(0);

    likeData.forEach((like) => {
      const likeDate = new Date(like.date);
      const monthIndex = likeDate.getMonth();
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
        label: "Nombre de likes",
        data: countLikesByMonth(),
        // fill: true,
        // backgroundColor: "rgba(75, 192, 192, 0.6)",
        // borderColor: "rgba(75, 192, 192, 1)",
        // borderWidth: 1,
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

  return <Line data={data} options={options} />;
};

export default AreaChart;

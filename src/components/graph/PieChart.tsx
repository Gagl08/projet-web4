import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

const PieChart = () => {
  const [userData, setUserData] = useState([]);
  ChartJS.register(ArcElement, Tooltip, Legend);

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

  // Compter le nombre de chaque genre
  const countGenders = () => {
    const genders = {
      MALE: 0,
      FEMALE: 0,
      OTHER: 0,
      UNKNOWN: 0,
    };

    userData.forEach((user) => {
      if (user.gender in genders) {
        genders[user.gender]++;
      }
    });

    return Object.values(genders);
  };

  // Préparer les données pour le chart
  const data = {
    labels: ["Homme", "Femme", "Autre", "Inconnu"],
    datasets: [
      {
        data: countGenders(),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#C0C0C0"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#C0C0C0"],
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart;

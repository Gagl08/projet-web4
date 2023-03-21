import CardUser from "../components/CardUser";

export default function Test_card() {
  const user = {
    lastName: "dujardin",
    firstName: "jean",
    age: 19,
    aPropos: "Je suis une personne fictive, pas tres fictive",
    images: ["401446.webp"],
    passions: ["Sport", "Piscine", "Formule1"],
  };

  //faudra faire une requete sur la BD pour chaque utilisateurs

  return <CardUser user={user} />;
}

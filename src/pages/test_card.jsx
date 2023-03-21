import CardUser from "../components/CardUser";

export default function Test_card(){

    const user = {
        name: "dujardin",
        surname: "jean",
        age:19,
        aPropos: "Je suis une personne fictive, pas tres fictive",
        images: [
            "401446.webp"
        ],
        passions : [
            "Sport",
            "Piscine",
            "Formule1",
        ]
    }

    return(
        <CardUser user={user}/>
    )
}
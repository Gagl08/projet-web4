const { PrismaClient } = require("@prisma/client");

const birthDateFromAge = (age) => {
  const ageMillis = age * 365 * 24 * 60 * 60 * 1000;
  return new Date(new Date().getTime() - ageMillis);
};

const get = async (req, res) => {
  const {
    preferences: preferencesList,
    excludedId,
    userLikes,
    userDislikes,
  } = req.query;

  const preferences = preferencesList.split(",");

  const prefGender = preferences[0];
  const dateAgeMin = birthDateFromAge(preferences[1]);
  const dateAgeMax = birthDateFromAge(preferences[2]);

  // pas utilisé pour le moment
  const distance = preferences[3];

  let userLikesList = userLikes.split(",");
  let userDislikesList = userDislikes.split(",");
  if (userLikesList[0] === "") {
    userLikesList = [];
  }
  if (userDislikesList[0] === "") {
    userDislikesList = [];
  }

  const excludedIdArray = [excludedId, ...userLikesList, ...userDislikesList];
  const prisma = new PrismaClient();
  // a terme mettre l'age, la distance
  const users = await prisma.user
    .findMany({
      where: {
        AND: [
          { gender: { equals: prefGender } },
          {
            birthdate: {
              lte: dateAgeMin.toISOString(),
              gte: dateAgeMax.toISOString(),
            },
          },
          { images: { isEmpty: false } },
          { id: { notIn: excludedIdArray } },
        ],
      },
    })
    .catch((e) => {
      return [];
    });
  if (users.length === 0 || users === undefined || users === null) {
    return res.status(500).send({ error: "Aucun profil trouvé" });
  }
  return res.status(200).send({ users });
};

// faire une API pour ajouter un like / dislike

export default (req, res) => {
  req.method === "GET"
    ? get(req, res)
    : res.status(404).send({ message: "Wrong method, please use GET" });
};

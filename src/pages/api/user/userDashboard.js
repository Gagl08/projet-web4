const { PrismaClient } = require("@prisma/client");

const birthDateFromAge = (age) => {
  const ageMillis = age * 365 * 24 * 60 * 60 * 1000;
  return new Date(new Date().getTime() - ageMillis);
};

const get = async (req, res) => {
  const { userID } = req.query;

  const prisma = new PrismaClient();

  const userInfo = await prisma.user
    .findUnique({
      where: {
        id: userID,
      },
      select: {
        UserLikesID: true,
        UserDislikesID: true,
        distance: true,
        ageMax: true,
        ageMin: true,
        prefGender: true,
      },
    })
    .catch((e) => {
      return [];
    });

  const dateAgeMin = birthDateFromAge(userInfo.ageMin);
  const dateAgeMax = birthDateFromAge(userInfo.ageMax);

  const excludedIdArray = [
    userID,
    ...userInfo.UserDislikesID,
    ...userInfo.UserLikesID,
  ];

  // a terme mettre l'age, la distance
  const users = await prisma.user
    .findMany({
      where: {
        AND: [
          { gender: { equals: userInfo.prefGender } },
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
      return null;
    });
  if (users.length === 0 || users === undefined || users === null) {
    return res.status(200).send({ users: [], message: "Aucun profil trouvé" });
  }
  return res.status(200).send({ users: users, message: "Profil(s) trouvé(s)" });
};

// faire une API pour ajouter un like / dislike

export default (req, res) => {
  req.method === "GET"
    ? get(req, res)
    : res.status(404).send({ message: "Wrong method, please use GET" });
};

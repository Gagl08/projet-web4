import { error } from "console";

const { PrismaClient } = require("@prisma/client");

const get = async (req, res) => {
  const { preference, excludedId, userLikes, userDislikes } = req.query;

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
          { gender: { equals: preference } },
          { images: { isEmpty: false } },
          { id: { notIn: excludedIdArray } },
        ],
      },
    })
    .catch((e) => {
      return e;
    });
  if (!users) {
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

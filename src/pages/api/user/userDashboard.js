const { PrismaClient } = require("@prisma/client");

const get = async (req, res) => {
  const { preference, excludedId } = req.query;
  const prisma = new PrismaClient();
  // a terme mettre l'age, la distance
  const users = await prisma.user
    .findMany({
      where: {
        AND: [
          { gender: { equals: preference } },
          { images: { isEmpty: false }, NOT: { id: { equals: excludedId } } },
        ],
      },
    })
    .catch((e) => {
      return null;
    });
  if (!users) {
    return res.status(500).send({ message: "Internal server error" });
  }
  return res.status(200).send({ users });
};

// faire une API pour ajouter un like / dislike

export default (req, res) => {
  req.method === "GET"
    ? get(req, res)
    : res.status(404).send({ message: "Wrong method, please use GET" });
};

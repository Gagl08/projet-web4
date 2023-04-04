const { PrismaClient } = require("@prisma/client");

const get = async (req, res) => {
  const { preference, excludedId } = req.query;
  const prisma = new PrismaClient();
  // a terme mettre l'age, la distance
  const users = await prisma.user.findMany({
    where: {
      AND: [
        { gender: { equals: preference } },
        { images: { isEmpty: false }, NOT: { id: { equals: excludedId } } },
      ],
    },
  });
  res.status(200).send(users);
};

export default (req, res) => {
  req.method === "GET"
    ? get(req, res)
    : res.status(404).send({ message: "Wrong method, please use GET" });
};

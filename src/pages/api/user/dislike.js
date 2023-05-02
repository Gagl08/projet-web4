const { PrismaClient } = require("@prisma/client");

const post = async (req, res) => {
  const { idUser, idUserDisliked } = req.body;

  const prisma = new PrismaClient();
  try {
    await prisma.user.update({
      where: {
        id: idUser,
      },
      data: {
        UserDislikes: {
          connect: {
            id: idUserDisliked,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "disliked",
      userDisliked: idUserDisliked,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
      message: "Error",
    });
  }
};

export default (req, res) => {
  req.method === "POST"
    ? post(req, res)
    : res.status(404).send({ message: "Wrong method, please use POST" });
};

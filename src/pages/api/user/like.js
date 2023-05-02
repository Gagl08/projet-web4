const { PrismaClient } = require("@prisma/client");
import { NotificationType } from "@prisma/client";

const post = async (req, res) => {
  const { idUser, idUserLiked } = req.body;

  const prisma = new PrismaClient();

  try {
    const likedByList = await prisma.user.findUnique({
      where: {
        id: idUser,
      },
      select: {
        OtherUserLikesID: true,
      },
    });

    const match = likedByList.OtherUserLikesID.includes(idUserLiked);

    //faire une notification mais faut qu'on regarde un meilleur moyen dans la BD

    await prisma.user.update({
      where: {
        id: idUser,
      },
      data: {
        UserLikes: {
          connect: {
            id: idUserLiked,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Liked",
      match: match,
      userLiked: idUserLiked,
    });
  } catch (err) {
    console.log(err);
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

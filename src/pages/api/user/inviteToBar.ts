import { log } from "console";

const { PrismaClient } = require("@prisma/client");

const post = async (req: any, res: any) => {
  const prisma = new PrismaClient();

  const { idUser, idUserMatched, bar } = req.body;

  try {
    const chat = await prisma.chat.findFirst({
      where: {
        AND: [
          { User: { some: { id: idUser } } },
          { User: { some: { id: idUserMatched } } },
        ],
      },
      include: {
        User: true,
      },
    });

    const message = await prisma.message.create({
      data: {
        text: `<!lon=${bar.geo_point_2d.lon},lat=${bar.geo_point_2d.lat},name=${bar.name}!>`,
        Chat: {
          connect: {
            id: chat.id,
          },
        },
        User: {
          connect: {
            id: idUser,
          },
        },
      },
    });

    res
      .status(200)
      .json({ message: "invitation envoyée", message_sent: message });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong", error: error });
  } finally {
    await prisma.$disconnect();
  }
};

export default (req: any, res: any) => {
  req.method === "POST"
    ? post(req, res)
    : res.status(404).send({ message: "Wrong method, please use POST" });
};

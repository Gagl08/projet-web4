const { PrismaClient } = require("@prisma/client");

const patch = async (req: any, res: any) => {
  const prisma = new PrismaClient();

  const { notificationId, salute } = req.body;

  try {
    const notification = await prisma.notification.update({
      where: {
        id: notificationId,
      },
      data: {
        hasBeenConsulted: true,
      },
    });

    let chat = null;
    if (!salute) {
      res.status(200).json({
        message: "notification has been consulted",
        notification: notification,
      });
    } else {
      chat = await prisma.chat.findFirst({
        where: {
          AND: [
            { User: { some: { id: notification.MatchedUserID } } },
            { User: { some: { id: notification.UserID } } },
          ],
        },
        include: {
          User: true,
        },
      });

      res.status(200).json({
        message: "notification has been consulted",
        notification: notification,
        chat: chat,
      });
    }
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  } finally {
    await prisma.$disconnect();
  }
};

export default (req: any, res: any) => {
  req.method === "PATCH"
    ? patch(req, res)
    : res.status(404).send({ message: "Wrong method, please use POST" });
};

const { PrismaClient } = require("@prisma/client");

const patch = async (req: any, res: any) => {
  const prisma = new PrismaClient();

  const { notificationId } = req.body;

  try {
    const notification = await prisma.notification.update({
      where: {
        id: notificationId,
      },
      data: {
        hasBeenConsulted: true,
      },
    });

    res.status(200).json(notification);
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

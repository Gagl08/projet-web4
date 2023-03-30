const fs = require("fs");

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};

const deleteImage = async (req, res) => {
  const body = await JSON.parse(req.body);
  await fs.unlinkSync(`./public/imageUsers/${body.fileName}`);
  res.status(200).send("image deleted");
};

export default (req, res) => {
  req.method === "DELETE" ? deleteImage(req, res) : res.status(404).send("");
};

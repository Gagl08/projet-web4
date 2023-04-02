const fs = require("fs");
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

const post = async (req, res) => {
  const form = new formidable.IncomingForm({
    maxFileSize: 5 * 1024 * 1024,
    uploadDir: "./public/imageUsers",
    keepExtensions: true,
  });
  form.parse(req, async function (err, fields, files) {
    if (err) {
      res.status(500).json({ error: err });
      res.end();
      return;
    }
    saveFile(files.file);
    return res.status(201).send({ message: "File uploaded", file: files.file });
  });
};

const saveFile = async (file) => {
  const newPath = `./public/imageUsers/${file.newFilename}`; //nom donnée par formidable (pas utile ici)
  const finalPath = `./public/imageUsers/${file.originalFilename}`; //nom avec l'id de l'utilisateur
  const data = await fs.readFileSync(newPath);
  fs.writeFileSync(finalPath, data);
  await fs.unlinkSync(newPath);
  return;
};
export default (req, res) => {
  req.method === "POST" ? post(req, res) : res.status(404).send("");
};

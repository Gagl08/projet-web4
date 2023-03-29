import fs from "fs";
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
    saveFile(files.file);
    return res.status(201).send("image saved");
  });
};

const saveFile = async (file) => {
  const data = fs.readFileSync(file.path);
  fs.writeFileSync(`./public/imageUsers/${file.name}`, data);
  await fs.unlinkSync(file.path);
  return;
};

const deleteImage = async (req, res) => {
  const body = req.body;
  await fs.unlinkSync(`./public/imageUsers/${body.name}`);
  res.status(200).send("image deleted");
};

export default (req, res) => {
  req.method === "POST"
    ? post(req, res)
    : req.method === "PUT"
    ? console.log("PUT")
    : req.method === "DELETE"
    ? deleteImage(req, res)
    : req.method === "GET"
    ? console.log("GET")
    : res.status(404).send("");
};

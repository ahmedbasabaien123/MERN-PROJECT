
const UserModel = require("./user.controller");
const fs = require("fs");
const { uploadErrors } = require("../utils/errors.utils");
const sharp = require("sharp");

module.exports.uploadProfil = async (req, res) => {
  const fileName = req.body.name +".jpg"; 
  try {
    if (
      req.file.mimetype != "image/jpg" &&
      req.file.mimetype != "image/png" &&
      req.file.mimetype != "image/jpeg"
    )
      throw Error("invalid file");

    if (req.file.size > 500000) throw Error("max size");
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(201).json({ errors });
  }

  try {
    await sharp(req.file.buffer)
      .resize({ width: 150, height: 150 }) 
      .toFile(`${__dirname}/../client/public/uploads/profil/${fileName}`
      );
    res.status(201).send("Photo de profil chargé avec succés");
  } catch (err) {
    res.status(400).send(err);
  }

  try {
    await UserModel.findByIdAndUpdate(
      req.body.userId,
      { $set : {picture: "./uploads/profil/" + fileName}},
      { net: true, upsert: true, setDefaultsOnInsert: true},
    )
    .then((docs) => res.status(201).send(docs))
    .catch((err) => res.status(400).send({ message: err }));
  }
  catch (err) {
  }
}

const Joi = require("joi"); //traigo a joi

//Acá solo creo los campos que voy a validar
const title = Joi.string().min(3).max(15).label("title"); //no acepta espacios por alphanum
const description = Joi.string().min(10).max(255).label("description");
const price = Joi.number().integer().min(10);
const category = Joi.string().valid("1", "2", "3", "4", "5");
// const images = Joi.string().valid("https://placeimg.com/640/480/any"); //uri creo que valida si es la url de una imagen
const imageExtentions = ["image/png", "image/jpg", "image/jpeg"];

//Los datos que van a recibir el create, update y get(o delete)
const createProductSchema = Joi.object({
  title: title.required(),
  price: price.required(),
  description: description.required(),
  category: category.required(),
  // images: images.required(),
  images: Joi.any()
    .custom(function (file, { error }) {
      if (!file[0]) {
        return error("file.required");
      }

      if (!imageExtentions.includes(file[0].type)) {
        return error("file.invalid");
      }

      return file;
    })
    .messages({
      "file.required": "File is required",
      "file.invalid": "The file must be one of the following png, jpg or jpeg.",
    }),
});

module.exports = { createProductSchema };

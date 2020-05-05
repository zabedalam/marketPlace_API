const express = require("express");
const fs = require("fs-extra");
const path = require("path"); //from nodejs
const uuid = require("uuid4");
const router = express.Router();
const { getProducts, getReviews, writeReviews } = require("../data");

// const filePath = path.join(__dirname, "../data/reviews.json");

// const readFile = async () => {
//   const buffer = await fs.readFile(filePath);
//   return JSON.parse(buffer.toString());
// };

// const readProductsFile = async () => {
//   const buffer = await fs.readFile(
//     path.join(__dirname, "../data/products.json")
//   );
//   return JSON.parse(buffer.toString());
// };

router.get("/", async (req, res) => {
  // console.log(filePath);
  try {
    // res.send(await readFile());
    res.send(await getReviews());
  } catch (error) {
    res.send(error);
  }
  // res.send(await readProductsFile())
});

router.get("/:id", async (req, res) => {
  //   try{
  // const reviews=await readFile()
  // const product= reviews.find(prod=>prod._id===req.params.id)
  // res.send(product)

  //   }
  //   catch(error){
  //       res.send(error)
  //   }

  // const reviews = await readFile();
  const reviews = await getReviews();
  const product = reviews.find((prod) => prod._id === req.params.id);
  if (product) res.send(product);
  else res.status(404).send("Not found");
});

router.post("/", async (req, res) => {
  //Is there any product with the given elementId?
  // const products = await readProductsFile();
  const products = await getProducts();
  const product = products.find((x) => x._id === req.body.elementId);
  if (!product) return res.status(404).send("Element not found");
  const addProd = {
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date(),
    _id: uuid(),
  };
  // const reviews = await readFile();
  const reviews = await getReviews();
  //   console.log(reviews)
  reviews.push(addProd);
  //   console.log(addProd)
  // await fs.writeFile(filePath, JSON.stringify(reviews));
  await writeReviews(filePath, reviews);
  res.send(addProd);
});

router.delete("/:id", async (req, res) => {
  // const reviews = await readFile();
  const reviews = await getReviews();
  const afterDelete = reviews.filter((x) => x._id !== req.params.id);
  if (reviews.length === afterDelete.length)
    res.status(404).send("Not Deleted");
  else {
    // await fs.writeFile(filePath, JSON.stringify(afterDelete));
    await writeReviews(filePath, afterDelete);
    res.send("Deleted");
  }
});

router.put("/:id", async (req, res) => {
  //Is there any product with the given elementId?
  // const products = await readProductsFile();
  const products = await getProducts();
  if (req.body.elementId && !products.find((x) => x._id === req.body.elementId))
    return res.status(404).send("Element not found");
  const reviews = await readFile();
  const review = reviews.find((x) => x._id === req.params.id);
  if (review) {
    delete req.body._id;
    delete req.body.createdAt;
    req.body.updateAt = new Date();
    const updatedVersion = Object.assign(review, req.body);
    const index = reviews.indexOf(review);
    reviews[index] = updatedVersion;
    // await fs.writeFile(filePath, JSON.stringify(updatedVersion));
    await writeReviews(filePath, updatedVersion);
    res.send(updatedVersion);
  } else res.status(404).send("Not Found");
});

module.exports = router;

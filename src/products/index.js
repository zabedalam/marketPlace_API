const express = require("express");
const fs = require("fs-extra");
const path = require("path"); //from nodejs
const uuid = require("uuid/v4");
const router = express.Router();
const filePath = path.join(__dirname, "../data/products.json");

const readFile = async () => {
  const buffer = await fs.readFile(filePath);
  return JSON.parse(buffer.toString());
};

router.get("/", async (req, res) => {
  console.log(filePath);
  try {
    res.send(await readFile());
  } catch (error) {
    res.send(error);
  }
});

router.get("/:id", async (req, res) => {
  //   try{
  // const products=await readFile()
  // const product= products.find(prod=>prod._id===req.params.id)
  // res.send(product)

  //   }
  //   catch(error){
  //       res.send(error)
  //   }

  const products = await readFile();
  const product = products.find((prod) => prod._id === req.params.id);
  if (product) res.send(product);
  else res.status(404).send("Not found");
});

router.post("/", async (req, res) => {
  //   res.send(req.body)
  const addProd = {
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date(),
    _id: uuid(),
  };
  const products = await readFile();
  products.push(addProd);
  await fs.writeFile(filePath, JSON.stringify(products));
  res.send(addProd);
});

router.delete("/:id", async (req, res) => {
  const products = await readFile();
  const afterDelete = products.filter((x) => x._id !== req.params.id);
  if (products.length === afterDelete.length)
    res.status(404).send("Not Deleted");
  else {
    await fs.writeFile(filePath, JSON.stringify(afterDelete));
    res.send("Deleted");
  }
});

router.put("/:id", async(req, res) => {
    const products=await readFile()
    const product =products.find(x=>x._id === req.params.id)
    if(product){
        delete req.body._id
        delete req.body.createdAt
        req.body.updateAt=new Date()
        const updatedVersion=Object.assign(product,req.body)
        const index =products.indexOf(product)
        products[index]=updatedVersion
        await fs.writeFile(filePath,JSON.stringify(updatedVersion))
         res.send(updatedVersion)
    }
    else
    res.status(404).send("Not Found")
});

module.exports = router;

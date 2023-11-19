const router = require('express').Router();

// Our sequelize models / tables need to be imported from the models directory.
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// The include statements in the following code represent join statements with the tables / models specified.

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
  const categoryData = await Category.findAll({
    include: [{ model: Product }],
  });
  res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json(err);
}
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const { id } = req.params;
    const categoryId = await Category.findByPk(id, {
      include: [{ model: Product }]
    });
    res.status(200).json(categoryId);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    console.info(req.body);
    const categoryCreated = await Category.create(req.body);
    res.status(200).json(categoryCreated);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const { id } = req.params;
    const categoryUpdate = await Category.update(req.body, {
      where: {
        id: id,
      },
    });
    res.status(200).json(categoryUpdate);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const { id } = req.params;
    const categoryDelete = await Category.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).send(`The category with an id of ${id} has been removed from the database.`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

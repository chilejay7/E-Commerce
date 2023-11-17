const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const categoryData = await Category.findAll({
    include: [{ model: Product }],
  });
  res.status(200).json(categoryData);
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const { id } = req.params;
  const categoryId = await Category.findByPk(id, {
    include: [{ model: Product }]
  });
  res.status(200).json(categoryId);

});

router.post('/', async (req, res) => {
  // create a new category
  console.info(req.body);
  const categoryCreated = await Category.create(req.body);
  res.status(200).json(categoryCreated);
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const { id } = req.params;
  const categoryUpdate = await Category.update(req.body, {
    where: {
      id: id,
    },
  });
  res.status(200).json(categoryUpdate);
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const { id } = req.params;
  const categoryDelete = await Category.destroy({
    where: {
      id: id,
    },
  });
  res.status(200).json(categoryDelete);
});

module.exports = router;

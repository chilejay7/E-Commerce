const router = require('express').Router();

// Our sequelize models / tables need to be imported from the models directory.
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// The include statements in the following code represent join statements with the tables / models specified.

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{
        model: Product,
        through: ProductTag,
      }]
    })
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const { id } = req.params;
    console.log(id);
    const tagId = await Tag.findByPk(id, {
      include: [{
        model: Product,
        through: ProductTag,
      }]
    })
    res.status(200).json(tagId);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    console.info(req.body);
    const createTag = await Tag.create(req.body);
    res.status(200).json(createTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    console.info(req.body);
    const { id } = req.params;
    const { tag_name } = req.body;
    const updateTagName = await Tag.update(req.body, {
      where: {
        id: id,
      }
    })
    res.status(200).send(`Tag name of tag #${id} updated to ${tag_name}`);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const { id } = req.params;
    const deleteProductTag = await ProductTag.destroy({
      where: {
        tag_id: id,
      }
    })
      .then(async () => {
        const deleteTag = await Tag.destroy({
          where: {
            id: id,
          }
        })
      })
    res.status(200).send(`The tag with an id of ${id} has been deleted.`)
  } catch (err) {
    res.status(500).json(err);
  }
}
);

module.exports = router;

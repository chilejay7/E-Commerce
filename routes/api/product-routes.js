const router = require('express').Router();

// Our sequelize models / tables need to be imported from the models directory.
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint
// The include statements in the following code represent join statements with the tables / models specified.

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  // This is a SELECT * statement joining the product, tag and product_tag tables.
  // The include property is an array of objects.  When mulitple tables are needed and one uses an intermediary such as the Tag model, a new object should
  // be added to the array.
  console.info(req.body);
  try {
    const productData = await Product.findAll({
      include: [
      {
        model: Category,
      },
      {
        model: Tag,
        through: ProductTag,
      },
      ],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const { id } = req.params;
    const productId = await Product.findByPk(id, {
      include: [
        {
          model: Category,
        },
        {
          model: Tag,
          through: ProductTag,
        }
      ]
    });
    res.status(200).json(productId);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
 console.log(req.body)
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {

        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });

          // figure out which ones to remove
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const { id } = req.params;
    const productTagDelete = await ProductTag.destroy({
      where: {
        product_id: id,
      }
    })
    .then(async () => {
      const productDelete = await Product.destroy({
      where: {
        id: id,
      }
      })
    });
    res.status(200).json(`The product has been deleted.`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

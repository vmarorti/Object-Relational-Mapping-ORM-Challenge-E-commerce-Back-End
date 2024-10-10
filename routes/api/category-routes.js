const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const data = await Category.findAll({
      include: [Product]
    })
    res.json(data)
  } catch (err) {
    res.status(500).json(err.message)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const data = await Category.findByPk(req.params.id, {
      include: [Product]
    })
    res.json(data)
  } catch (err) {
    res.status(500).json(err.message)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const data = await Category.create(req.body)
    res.json(data)
  } catch (err) {
    res.status(500).json(err.message)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found'});
    }

    category.category_name = req.body.category_name;
    await category.save();
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message});
  }
});


router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const data = await Category.destroy({
      where: {
        id: req.params.id,
      }
    })
    res.json(data)
  } catch (err) {
    res.status(500).json(err.message)
  }
});

module.exports = router;

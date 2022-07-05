const router = require('express').Router();
const { Tag } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({});
    if (tagData.length === 0) {
      res.status(404).json({ message: 'No tags to show.' });
      return;
    }
    res.status(200).json(tagData);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findOne({
      where: { id: req.params.id },
    });
    if (tagData.length === 0) {
      res.status(404).json({ message: 'Tag does not exist' });
      return;
    }
    res.status(200).json(tagData);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post('/', withAuth, async (req, res) => {
  if (req.session) {
    try {
      const tagData = await Tag.create({
        ...req.body,
        user_id: req.session.user_id
      });
      console.log(tagData);
      res.status(201).json(tagData);
    } catch (e) {
      res.status(400).json(e);
    }
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }

    res.status(200).json(tagData);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
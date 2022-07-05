const router = require('express').Router();
const { Bookmark, User, BookmarkTag } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const bookmarkData = await Bookmark.findAll({
      attributes: ['id', 'title', 'URL', 'created_at'],
      order: [['created_at', 'ASC']],
      include: [
        {
          model: BookmarkTag,
          attributes: [
            'id',
            'bookmark_id',
            'tag_id',
            'tag_title',
          ],
          include: { model: User, attributes: ['username'] },
        },
        { model: User, attributes: ['username'] },
      ],
    });
    console.log(bookmarkData);
    res.status(200).json(bookmarkData);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const bookmarkData = await Bookmark.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'title', 'URL', 'created_at'],
      order: [['created_at', 'ASC']],
      include: [
        {
          model: BookmarkTag,
          attributes: [
            'id',
            'bookmark_id',
            'tag_id',
            'tag_title',
          ],
          include: { model: User, attributes: ['username'] },
        },
        { model: User, attributes: ['username'] },
      ],
    });
    if (!bookmarkData) {
      res.status(404).json({ message: 'No record found!' });
      return;
    }

    res.status(200).json(bookmarkData);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const bookmarkData = await Bookmark.create({
      ...req.body,
      user_id: req.session.user_id
    });
    res.status(201).json(bookmarkData);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedBookmark = await Bookmark.update(
      {
        title: req.body.title,
        URL: req.body.URL
      },
      {
        where: {
          id: req.params.id,
        },
      },
    );
    if (!updatedBookmark) {
      res.status(404).json({ message: 'No matching record found!' });
      return;
    }

    res.status(200).json(updatedBookmark);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const bookmarkData = await Bookmark.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!bookmarkData) {
      res.status(404).json({ message: 'No matching record found!' });
      return;
    }

    res.status(200).json(bookmarkData);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
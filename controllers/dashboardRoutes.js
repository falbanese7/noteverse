const router = require('express').Router();
const { Bookmark, User, Tag } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const bookmarkData = await Bookmark.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: Tag,
          attributes: ['id', 'tag_name'],
        },
        { model: User, attributes: ['username'] },
      ],
    });
    // Serialize data so the template can read it
    const bookmarks = bookmarkData.map((bookmark) =>
      bookmark.get({ plain: true })
    );

    // Pass serialized data and session flag into template
    res.render('dashboard', {
      bookmarks,
      logged_in: req.session.logged_in,
      username: req.session.username,
    });
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get('/create/', withAuth, async (req, res) => {
  try {
    const bookmarkData = await Bookmark.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ['id', 'URL', 'title', 'created_at'],
      include: [
        {
          model: Tag,
          attributes: ['id', 'tag_name'],
        },
        { model: User, attributes: ['username'] },
      ],
    });

    const bookmarks = bookmarkData.map((bookmark) =>
      bookmark.get({ plain: true })
    );

    res.render('newBookmark', {
      bookmarks,
      logged_in: true,
    });
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get('/create-tag/', withAuth, async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      attributes: ['id', 'tag_name'],
    });

    const tags = tagData.map((tag) => tag.get({ plain: true }));

    res.render('newTag', {
      tags,
      logged_in: true,
    });
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const bookmarkData = await Bookmark.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'URL', 'title', 'created_at'],
      include: [
        {
          model: Tag,
          attributes: ['id', 'tag_name'],
        },
        { model: User, attributes: ['username'] },
      ],
    });

    if (!bookmarkData) {
      res.status(404).json({ message: 'No record found' });
      return;
    }

    const bookmark = bookmarkData.get({ plain: true });

    res.render('edit-bookmark', {
      bookmark,
      logged_in: true,
    });
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;

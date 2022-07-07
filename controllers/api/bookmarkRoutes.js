const router = require('express').Router();
const { Bookmark, User, Tag } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const bookmarkData = await Bookmark.findAll({
      attributes: ['id', 'title', 'URL', 'created_at'],
      order: [['created_at', 'ASC']],
      include: [
        {
          model: Tag,
          attributes: ['id', 'tag_name'],
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
          model: Tag,
          attributes: ['id', 'tag_name'],
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
      user_id: req.session.user_id,
    });
    res.status(201).json(bookmarkData);
  } catch (e) {
    res.status(400).json(e);
  }
  // Bookmark.create(req.body)
  //   .then((bookmark) => {
  //     if (req.body.tagIds.length) {
  //       const bookmarkTagIdArr = req.body.tagIds.map((tag_id) => {
  //         return {
  //           bookmark_id: bookmark.id,
  //           tag_id,
  //         };
  //       });
  //       return BookmarkTag.bulkCreate(bookmarkTagIdArr);
  //     }
  //     res.status(200).json(bookmark);
  //   })
  //   .then((bookmarkTagIds) => res.status(200).json(bookmarkTagIds))
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(400).json(err);
  //   });
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedBookmark = await Bookmark.update(
      {
        title: req.body.title,
        URL: req.body.URL,
      },
      {
        where: {
          id: req.params.id,
        },
      }
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

/* eslint-disable no-unused-vars */
const sequelize = require('../config/connection');
const { User, Bookmark, Tag, BookmarkTag} = require('../models');

const userData = require('./userData.json');
const bookmarkData = require('./bookmarkData.json');
const tagData = require('./tagData.json');
const bookmarkTagData = require('./bookmarkTagData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const bookmarks = await Bookmark.bulkCreate(bookmarkData, {
    individualHooks: true,
    returning: true,
  });

  const tags = await Tag.bulkCreate(tagData, {
    individualHooks: true,
    returning: true,
  });

  const bookmarkTags = await BookmarkTag.bulkCreate(bookmarkTagData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
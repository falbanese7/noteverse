const User = require('./User');
const Bookmark = require('./Bookmark');
const Tag = require('./Tag');
const BookmarkTag = require('./BookmarkTag');

User.hasMany(Bookmark, {
  foreignKey: 'user_id'
});

Bookmark.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'cascade'
});

Bookmark.belongsToMany(Tag, {through: BookmarkTag, foreignKey: 'bookmark_id'});

Tag.belongsToMany(Bookmark, {through: BookmarkTag, foreignKey: 'tag_id'});

module.exports = { User, Bookmark, Tag, BookmarkTag };
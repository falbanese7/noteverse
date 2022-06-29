const User = require('./User');
const Bookmark = require('./Bookmark');

User.hasMany(Bookmark, {
  foreignKey: 'user_id'
});

Bookmark.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'cascade'
});

module.exports = { User, Bookmark };
module.exports = (sequelize, DataTypes) => {
  const Joke = sequelize.define('Joke', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  return Joke;
};

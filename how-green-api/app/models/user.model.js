module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      name: {
        type: Sequelize.STRING,
        required: Sequelize.required
      },
      email: {
        type: Sequelize.STRING,
        unique: Sequelize.unique,
        required: Sequelize.required
      },
      password: {
        type: Sequelize.STRING,
        required: Sequelize.required
      }
    });
    return User;
};

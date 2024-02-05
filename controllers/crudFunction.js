async function destroyData(model, condition, force = false) {
  if (condition) {
    await model.destroy({
      where: condition,
      force: force,
    });
  }
}

module.exports = {
  destroyData,
};

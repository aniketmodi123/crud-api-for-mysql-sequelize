const dataTable = require('../models/dataTable');

exports.getAllUsers = async (req, res) => {
  try {
    const alldata = await dataTable.findAll();
    res.json(alldata);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.createUser = async (req, res) => {
  try {
    const dta = req.body;
    const saveBlog = await dataTable.create(dta);
    res.send("Data posted successfully");
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const update_data = req.body;

    const [updatedRowCount] = await dataTable.update(update_data, { where: { id: id } });

    if (updatedRowCount === 0) {
      await dataTable.create(update_data);
    }

    const alldata = await dataTable.findAll();
    res.json(alldata);
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  await dataTable.destroy({
    where: {
      id: id,
    },
  });
  const alldata = await dataTable.findAll();
  res.json(alldata);
};

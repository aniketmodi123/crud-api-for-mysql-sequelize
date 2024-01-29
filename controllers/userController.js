const sequelize = require("../config/database");
const { Sequelize, DataTypes } = require("sequelize");
const dataTable = require("../models/dataTable");

//find all users in the database
exports.getAllUsers = async (req, res) => {
  try {
    const alldata = await dataTable.findAll();
    res.json(alldata);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
};

//filter users by genre
exports.getUsersByGenre = async (req, res) => {
  try {
    const genre = req.params.genre;
    const userdata = await dataTable.findAll({ where: { genre: genre } });
    res.json(userdata);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
};

//filteruser by genre and rating
exports.getUsersByGenreAndRating = async (req, res) => {
  try {
    const genre = req.params.genre;
    const rating = req.params.rating;
    console.log(genre, rating);

    const userdata = await dataTable.findAll({
      where: { genre: genre, rating: { [Sequelize.Op.gte]: rating } },
    });
    res.json(userdata);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
};

//shorting data table
//it take to parameters where first is by which col. you want to short and second one is in which order ascending or descending
//exp=> http://localhost:7000/shorting/rating/DESC

exports.getUsersAfterShorting = async (req, res) => {
  const shortBy = req.params.shortBy;
  const arrange = req.params.arrange;
  // console.log(shortBy);
  try {
    const alldata = await dataTable.findAll({ order: [[shortBy, arrange]] });
    res.json(alldata);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
};

/* pagination of data table where two parameter are requeired
 (1) page(page number)
 (2) size(how many items we want to show on a single page)
*/
exports.getUsersAfterPagination = async (req, res) => {
  try {
    const pageAsNumber = Number.parseInt(req.query.page);       //query is use to direct input some data we can use params but for that we have to insert data in url
    //for query exp=> http://localhost:7000/pagination?page=3&size=6
    //for parmas exp=> http://localhost:7000/pagination/:page/:size

    const sizeAsNumber = Number.parseInt(req.query.size);

    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }

    let size = 10;
    if (
      !Number.isNaN(sizeAsNumber) &&
      !(sizeAsNumber > 10) &&
      !(sizeAsNumber < 1)
    ) {
      size = sizeAsNumber;
    }

    const usersWithCount = await dataTable.findAndCountAll({
      limit: size,
      offset: page * size,
    });
    res.send({
      content: usersWithCount.rows,
      totalPages: Math.ceil(usersWithCount.count / Number.parseInt(size)),
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
};

//create user in database
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

//update user details in database  through id
exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const update_data = req.body;

    const [updatedRowCount] = await dataTable.update(update_data, {
      where: { id: id },
    });

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

//delete user details in database through id
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

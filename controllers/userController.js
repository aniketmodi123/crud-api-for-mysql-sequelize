const sequelize = require("../config/database");
const {
  Sequelize,
  DataTypes,
  ValidationError,
  Association,
} = require("sequelize");
const { dataTable, movieCastTable } = require("../dataTableJunction");
const { isDate } = require("lodash");

exports.getWelcomePage = async (req, res) => {
  try {
    res.send("welcome to aniket modi's api");
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
};

//find all users in the database
exports.getAllUsers = async (req, res) => {
  try {
    const alldata = await dataTable.findAll();
    const genreCounts = await dataTable.findAll({
      attributes: [
        "genre",
        [Sequelize.fn("COUNT", Sequelize.col("genre")), "genreCount"],
      ],
      group: ["genre"],
      raw: true,
    });
    const genreCountsLength = "there are " + genreCounts.length + " genre";
    res.json({ alldata, genreCountsLength, genreCounts });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getAllMoviesCasting = async (req, res) => {
  try {
    const alldata = await movieCastTable.findAll();
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

/*shorting data table
it take to parameters where first is by which col. you want to short and second one is in which order ascending or descending
exp=> http://localhost:7000/movies/shorting/rating/DESC
*/
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
    const pageAsNumber = Number.parseInt(req.query.page); //query is use to direct input some data we can use params but for that we have to insert data in url
    //for query exp=> http://localhost:7000/movies/pagination?page=3&size=6
    //for parmas exp=> http://localhost:7000/movies/pagination/:page/:size

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
/*Association one to one
def=>  in one to one association a table row data is connected to another table row data and throw associations we connect them to each other so we get the big data that is saprented into difrent table
*/
exports.getOneToOne = async (req, res) => {
  try {
    console.log("getOneToOne");
    const alldata = await dataTable.findAll({
      include: [
        {
          model: movieCastTable,
          attributes: { exclude: ["createdAt", "updatedAt", "title", "id"] }, // Exclude attributes here
        },
      ],
    });

    res.json(alldata);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
};

// by soft delete findall method don't show the deleted data so this is for that
exports.getDeletedData = async (req, res) => {

  const deletedMovies = await dataTable.findAll({
    paranoid: false, // Include soft-deleted records
    where: {
      soft_delete: { [Sequelize.Op.ne]: null }, // Filter only soft-deleted records
    },
  
  });
  res.json(deletedMovies);

};

// restoring deleted data 
exports.restoredata = async (req, res) => {
  const id = req.params.id;
  await dataTable.restore({
    where: {
      id: id,
    },
  });
  const alldata = await dataTable.findAll();
  res.json(alldata);

};




//create user in database
exports.createUser = async (req, res) => {
  var messages = {};
  try {
    const dta = req.body;
    const saveBlog = await dataTable.create(dta);
    // res.send("Data posted successfully");
    res.status(500).json({ data: saveBlog });
  } catch (error) {
    let message;
    error.errors.forEach((error) => {
      // validation of right data format like date and rating is correct or not
      if (error.validatorKey) {
        if (error.validatorKey == "isDate") {
          message = "please enter a valid date";
          console.log(message);
        } else if (error.validatorKey == "isFloat") {
          message = "please enter a valid rating";
        } else {
          // Handle non-validation errors
          console.error("Non-Validation Error:", error.message);
        }
        messages[error.path] = message;
      }
    });
    
    res.status(500).json({ message: messages });
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
//it has a parenoid facility so if i delete something through it item will be deleted and not show in findall function but in database it will store in softdeleted column 
exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  await dataTable.destroy({
    where: {
      id: id,
    },
    // force: true                              //if i want to delete it permanently we have to use it
  });
  const alldata = await dataTable.findAll();
  res.json(alldata);
};


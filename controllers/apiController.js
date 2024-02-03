const sequelize = require("../config/database");
const {
  Sequelize,
  DataTypes,
  ValidationError,
  Association,
} = require("sequelize");
const {
  moviestable,
  movieCastTable,
  movieAuthorTable,
  storemovieCastTable,
} = require("../moviestableJunction");
const { isDate } = require("lodash");

exports.getWelcomePage = async (req, res) => {
  try {
    res.send("welcome to aniket modi's api");
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
};

//find all Movies in the database
exports.getAllMovies = async (req, res) => {
  try {
    const alldata = await moviestable.findAll();
    const genreCounts = await moviestable.findAll({
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

//filter Movies by genre
exports.getMoviesByGenre = async (req, res) => {
  try {
    const genre = req.params.genre;
    const userdata = await moviestable.findAll({ where: { genre: genre } });
    res.json(userdata);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
};

//filteruser by genre and rating
exports.getMoviesByGenreAndRating = async (req, res) => {
  try {
    const genre = req.params.genre;
    const rating = req.params.rating;
    console.log(genre, rating);

    const userdata = await moviestable.findAll({
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
exports.getMoviesAfterShorting = async (req, res) => {
  const shortBy = req.params.shortBy;
  const arrange = req.params.arrange;
  // console.log(shortBy);
  try {
    const alldata = await moviestable.findAll({ order: [[shortBy, arrange]] });
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
exports.getMoviesAfterPagination = async (req, res) => {
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

    const MoviesWithCount = await moviestable.findAndCountAll({
      limit: size,
      offset: page * size,
    });
    res.send({
      content: MoviesWithCount.rows,
      totalPages: Math.ceil(MoviesWithCount.count / Number.parseInt(size)),
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
};
/*Association one to many
def=>  in one to one association a table row data is connected to another table row data and throw associations we connect them to each other so we get the big data that is saprented into difrent table
*/
exports.getOneToMany = async (req, res) => {
  try {
    const alldata = await moviestable.findAll({
      // use it if movie -> moviecasttable
      //           movie -> movieauthortable

      // where: {movieid:39},
      include: [
        {
          //where: {actorid:40},
          model: movieCastTable,
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "title",
              "soft_delete",
            ],
          }, // Exclude attributes here
        },
        {
          //where: {authorid:40},
          model: movieAuthorTable,
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "title",
              "soft_delete",
            ],
          }, // Exclude attributes here
        },
      ],
    });

/*
note ==   remember in creating data id will auto increment and all tables are sapreate so some time all table get differnt id number but its not a big deal all tables are association with each other with common detail so it will never lose it
*/


     // use it if movie -> moviecasttable -> movieauthortable

    // const alldata = await moviestable.findAll({         
    //   include: [
    //     {
    //       model: movieCastTable,
    //       attributes: {
    //         exclude: ["createdAt","updatedAt","title","actorid","soft_delete",]}, // Exclude attributes here
    //       include: [
    //         {
    //           model: movieAuthorTable,
    //           attributes: { exclude: ["createdAt","updatedAt","title","authorid","soft_delete",]}, // Exclude attributes here
    //         },
    //       ],
    //     },
    //   ],
    // });

    res.json(alldata);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
};

// by soft delete findall method don't show the deleted data so this is for that
exports.getDeletedData = async (req, res) => {
  const deletedMovies = await moviestable.findAll({
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
  await moviestable.restore({
    where: {
      id: id,
    },
  });
  const alldata = await moviestable.findAll();
  res.json(alldata);
};

//create user in database
exports.createUser = async (req, res) => {
  var messages = {};
  try {
    const dta = req.body;
    const saveBlog = await moviestable.create(dta);
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

//create movie and casting in database at same time
exports.createMoiveAndSubTabels = async (req, res) => {
  var messages = {};
  try {
    const dta = req.body;

    let castdata;
    // console.log(dta);
    const saveBlog = await moviestable.create(dta, {
      include: [
        {
          model: movieCastTable,
        },
        {
          model: movieAuthorTable,
        },
      ],
    });

    //const saveBlog = await moviestable.create(dta);
    // if(saveBlog && saveBlog.id) {
    //   castdata = await movieCastTable.create(dta.movieCastTables[0])
    // };
    // if (castdata && castdata.id) {
    // return res.status(201).json({
    //   success: true,
    //   message: 'Movie and casting data created successfully',
    //   data: {
    //     movie: saveBlog,
    //     casting: castdata,
    //   },
    // }
    // );
    // }
    return res.status(201).json({
      success: true,
      message: "Movie and casting data created successfully",
      data: saveBlog,
    });
  } catch (error) {
    let message;
    if (error.errors) {
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
    }

    res.status(500).json({ message: messages });
  }
};

//update user details in database  through id
exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const update_data = req.body;

    const [updatedRowCount] = await moviestable.update(update_data, {
      where: { id: id },
    });

    if (updatedRowCount === 0) {
      await moviestable.create(update_data);
    }

    const alldata = await moviestable.findAll();
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
  await moviestable.destroy({
    where: {
      id: id,
    },
    // force: true                              //if i want to delete it permanently we have to use it
  });
  const alldata = await moviestable.findAll();
  res.json(alldata);
};

use clients_details;
create database clients_details;

show tables;

select movieid from moviestable group by movieid;

select * from moviestable order by movieid Asc;
select * from moviecasttable order by actorid desc;
select * from movieauthortable order by authorid deSC;
drop table moviestable;
delete from moviestable where movieid>=32;
delete from moviecasttable where actorid>=32;
delete from movieauthortable where authorid;

INSERT INTO movieCastTable (actorId, title, leadActor) VALUES
(1, 'The Shining', 'Jack Nicholson'),
(2, 'Jurassic Park', 'Sam Neill'),
(3, 'The Godfather: Part II', 'Al Pacino'),
(4, 'Back to the Future', 'Michael J. Fox'),
(5, 'The Avengers', 'Robert Downey Jr.'),
(6, 'The Lion King', 'Matthew Broderick'),
(7, 'Eternal Sunshine of the Spotless Mind', 'Jim Carrey'),
(8, 'The Social Network', 'Jesse Eisenberg'),
(9, 'Interstellar', 'Matthew McConaughey'),
(10, 'The Princess Bride', 'Cary Elwes'),
(11, 'The Big Lebowski', 'Jeff Bridges'),
(12, 'The Sixth Sense', 'Bruce Willis'),
(13, 'The Terminator', 'Arnold Schwarzenegger'),
(14, 'The Grand Budapest Hotel', 'Ralph Fiennes'),
(15, 'Casablanca', 'Humphrey Bogart'),
(16, 'The Matrix Reloaded', 'Keanu Reeves'),
(17, 'The Revenant', 'Leonardo DiCaprio'),
(18, 'Avatar', 'Sam Worthington'),
(19, 'Inglourious Basterds', 'Brad Pitt'),
(20, 'The Great Gatsby', 'Leonardo DiCaprio'),
(21, 'The Silence of the Lambs', 'Jodie Foster'),
(22, 'The Big Short', 'Christian Bale'),
(23, 'The Martian', 'Matt Damon'),
(24, 'Blade Runner', 'Harrison Ford'),
(25, 'The Departed', 'Leonardo DiCaprio'),
(26, 'La La Land', 'Ryan Gosling'),
(27, 'Django Unchained', 'Jamie Foxx'),
(28, 'The Wolf of Wall Street', 'Leonardo DiCaprio'),
(29, 'Harry Potter and the Sorcerer\'s Stone', 'Daniel Radcliffe'),
(30, 'Harry Potter and the Chamber of Secrets', 'Daniel Radcliffe'),
(31, 'Harry Potter and the Prisoner of Azkaban', 'Daniel Radcliffe');


INSERT INTO moviestable (movieid, title, genre, rating, publicationYear) VALUES
(1, 'The Shining', 'Horror', 4.3, 1977),
(2, 'Jurassic Park', 'Sci-Fi', 4.6, 1993),
(3, 'The Godfather: Part II', 'Crime', 4.8, 1974),
(4, 'Back to the Future', 'Adventure', 4.7, 1985),
(5, 'The Avengers', 'Action', 4.5, 2012),
(6, 'The Lion King', 'Animation', 4.6, 1994),
(7, 'Eternal Sunshine of the Spotless Mind', 'Romance', 4.4, 2004),
(8, 'The Social Network', 'Biography', 4.5, 2010),
(9, 'Interstellar', 'Sci-Fi', 4.9, 2014),
(10, 'The Princess Bride', 'Adventure', 4.5, 1987),
(11, 'The Big Lebowski', 'Comedy', 4.2, 1998),
(12, 'The Sixth Sense', 'Thriller', 4.4, 1999),
(13, 'The Terminator', 'Sci-Fi', 4.5, 1984),
(14, 'The Grand Budapest Hotel', 'Comedy', 4.6, 2014),
(15, 'Casablanca', 'Romance', 4.8, 1942),
(16, 'The Matrix Reloaded', 'Sci-Fi', 4.2, 2003),
(17, 'The Revenant', 'Adventure', 4.7, 2015),
(18, 'Avatar', 'Sci-Fi', 4.6, 2009),
(19, 'Inglourious Basterds', 'War', 4.5, 2009),
(20, 'The Great Gatsby', 'Drama', 4.0, 2013),
(21, 'The Silence of the Lambs', 'Thriller', 4.6, 1991),
(22, 'The Big Short', 'Drama', 4.3, 2015),
(23, 'The Martian', 'Sci-Fi', 4.9, 2015),
(24, 'Blade Runner', 'Sci-Fi', 4.4, 1982),
(25, 'The Departed', 'Crime', 4.7, 2006),
(26, 'La La Land', 'Musical', 4.5, 2016),
(27, 'Django Unchained', 'Western', 4.4, 2012),
(28, 'The Wolf of Wall Street', 'Biography', 4.8, 2013),
(29, 'Harry Potter and the Sorcerer\'s Stone', 'Fantasy', 4.7, 2001),
(30, 'Harry Potter and the Chamber of Secrets', 'Fantasy', 4.8, 2002),
(31, 'Harry Potter and the Prisoner of Azkaban', 'Fantasy', 4.9, 2004);

INSERT INTO movieauthortable (title, author)
VALUES
('The Shining', 'Stephen King'),
('Jurassic Park', 'Michael Crichton'),
('The Godfather: Part II', 'Francis Ford Coppola'),
('Back to the Future', 'Robert Zemeckis'),
('The Avengers', 'Joss Whedon'),
('The Lion King', 'Roger Allers, Rob Minkoff'),
('Eternal Sunshine of the Spotless Mind', 'Charlie Kaufman'),
('The Social Network', 'Aaron Sorkin'),
('Interstellar', 'Christopher Nolan'),
('The Princess Bride', 'William Goldman'),
('The Big Lebowski', 'Joel Coen, Ethan Coen'),
('The Sixth Sense', 'M. Night Shyamalan'),
('The Terminator', 'James Cameron'),
('The Grand Budapest Hotel', 'Wes Anderson'),
('Casablanca', 'Michael Curtiz'),
('The Matrix Reloaded', 'The Wachowskis'),
('The Revenant', 'Alejandro G. Iñárritu'),
('Avatar', 'James Cameron'),
('Inglourious Basterds', 'Quentin Tarantino'),
('The Great Gatsby', 'Baz Luhrmann'),
('The Silence of the Lambs', 'Jonathan Demme'),
('The Big Short', 'Adam McKay'),
('The Martian', 'Andy Weir'),
('Blade Runner', 'Ridley Scott'),
('The Departed', 'Martin Scorsese'),
('La La Land', 'Damien Chazelle'),
('Django Unchained', 'Quentin Tarantino'),
('The Wolf of Wall Street', 'Martin Scorsese'),
('Harry Potter and the Sorcerer\'s Stone', 'J.K. Rowling'),
('Harry Potter and the Chamber of Secrets', 'J.K. Rowling'),
('Harry Potter and the Prisoner of Azkaban', 'J.K. Rowling');


select * from moviestable where id = 11;
SELECT * FROM moviestable WHERE genre = 'Fantasy';

SELECT title FROM moviestable;
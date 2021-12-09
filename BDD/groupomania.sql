/* Table Users */

CREATE TABLE Users (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(500) NOT NULL,
    email VARCHAR(250) NOT NULL,
    grade TINYINT UNSIGNED NOT NULL,
    firstname VARCHAR(50) NULL,
    lastname VARCHAR(50) NULL,
    job VARCHAR(50) NULL,
    birthdate DATE NULL,
    isActive BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (id)
)
ENGINE=INNODB;

/* Table Posts */

CREATE TABLE Posts (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    body LONGTEXT NOT NULL,
    image VARCHAR(300) NULL,
    date_post DATE NOT NULL,
    userid BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (id)
)
ENGINE=INNODB;

/* Clef étrangère de la table Posts */

ALTER TABLE Posts
ADD CONSTRAINT fk_posts_userid FOREIGN KEY (userid) REFERENCES Users(id)

/* Table Coms */

CREATE TABLE Coms (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    body LONGTEXT NOT NULL,
    date_coms DATE NOT NULL,
    userid BIGINT UNSIGNED NOT NULL,
    postid BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (id)
)
ENGINE=INNODB;

/* Clef étrangère de la table Coms */

ALTER TABLE Coms
ADD CONSTRAINT fk_coms_userid FOREIGN KEY (userid) REFERENCES Users(id)

ALTER TABLE Coms 
ADD CONSTRAINT fk_coms_postid FOREIGN KEY (postid) REFERENCES Posts(id)

/* Table Reaction */

CREATE TABLE Reaction (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    userid BIGINT UNSIGNED NOT NULL,
    postid BIGINT UNSIGNED NOT NULL,
    type BIGINT NULL,
)

/* Clef étrangère de la table Reaction */

ALTER TABLE Coms
ADD CONSTRAINT fk_reaction_userid FOREIGN KEY (userid) REFERENCES Users(id)

ALTER TABLE Coms 
ADD CONSTRAINT fk_reaction_postid FOREIGN KEY (postid) REFERENCES Posts(id)
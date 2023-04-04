CREATE DATABASE IF NOT EXISTS photo_album_test;

use photo_album_test;

CREATE TABLE photo (
	id INT PRIMARY KEY AUTO_INCREMENT,
    path VARCHAR(255)
);
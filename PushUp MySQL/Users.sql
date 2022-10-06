/*CREATE DATABASE PushUp;*/


/*CREATE TABLE Users 
(UserID INT NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
Username VARCHAR(50) NOT NULL UNIQUE,
Password VARCHAR(50) NOT NULL,
RegisterDate DATE NOT NULL
)*/

-- INSERT INTO Users VALUES (NULL,'danyalutsevich','test',CURDATE());

-- test values
/*
INSERT INTO Users VALUES (NULL,'Maskarel','test',CURDATE());
INSERT INTO Users VALUES (NULL,'DoubliX','test',CURDATE());
INSERT INTO Users VALUES (NULL,'Emendems','test',CURDATE());
INSERT INTO Users VALUES (NULL,'DDDDDDf','test',CURDATE());
INSERT INTO Users VALUES (NULL,'Losaret','test',CURDATE());
INSERT INTO Users VALUES (NULL,'fdsfdsfff','test',CURDATE());
INSERT INTO Users VALUES (NULL,'MupuHDa','test',CURDATE());
INSERT INTO Users VALUES (NULL,'KimzoR','test',CURDATE());
INSERT INTO Users VALUES (NULL,'UtyNutY','test',CURDATE());
INSERT INTO Users VALUES (NULL,'dedast','test',CURDATE());
INSERT INTO Users VALUES (NULL,'Kaninhen','test',CURDATE());
INSERT INTO Users VALUES (NULL,'RaIVeN','test',CURDATE());
INSERT INTO Users VALUES (NULL,'KuccyJI9','test',CURDATE());
INSERT INTO Users VALUES (NULL,'S_PAIN','test',CURDATE());
*/




SELECT * FROM mysql.user;


-- get profile
-- SELECT 
-- 	U.Username,
-- 	P.PushUpsMade,
-- 	P.PushUpDate 
-- FROM PushUps P 
-- JOIN Users U ON P.Id = U.UserID 
-- WHERE U.Username = 'danyalutsevich'
-- 
-- 




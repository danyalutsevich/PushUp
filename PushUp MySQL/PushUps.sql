-- CREATE TABLE PushUps(
-- Id INT NOT NULL,
-- PushUpsMade INT NOT NULL,
-- PushUpDate DATETIME NOT NULL
-- )
-- 


-- INSERT INTO PushUps VALUES(
-- (SELECT UserID FROM Users WHERE Username = 'danyalutsevich'),
-- 21,
-- NOW()
-- );

-- DROP TABLE PushUps;

--  SELECT * FROM PushUps;
-- 


-- get global score 
-- SELECT 
-- 	U.Username,
-- 	SUM(P.PushUpsMade),
-- 	AVG(P.PushUpsMade)
-- FROM 
-- 	PushUps P 
-- 	JOIN Users U ON P.Id = U.UserID 
-- GROUP BY U.Username 
-- ORDER BY 2 DESC



-- get user's followings score

-- SELECT 
-- UF.Username,
-- P.PushUpsSUM,
-- P.PushUpsAVG
--  FROM Followers F 
--  JOIN Users UU ON F.UserId = UU.UserID 
--  JOIN Users UF ON F.Follows = UF.UserID 
--  JOIN ( 
-- 	SELECT 
-- 		U.Username `PU`,
-- 		SUM(P.PushUpsMade) `PushUpsSUM`, 
-- 		AVG(P.PushUpsMade) `PushUpsAVG` 
-- 	FROM PushUps P  
-- 	JOIN Users U ON P.Id = U.UserID 
-- 	GROUP BY U.Username 
-- 	) P ON UF.Username = P.PU 
-- 	WHERE UU.Username ='JoeBiden' ORDER BY 2 DESC
-- 

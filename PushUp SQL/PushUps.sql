CREATE TABLE PushUps(
Id UNIQUEIDENTIFIER,
PushUpsMade INT,
PushUpDate DATETIME
)

INSERT INTO PushUps VALUES(
(SELECT Id FROM Users WHERE Login = 'danyalutsevich'),
22,
CAST(CURRENT_TIMESTAMP AS DATETIME)
)

SELECT * FROM PushUps


SELECT
U.Login,
SUM(P.PushUpsMade)
FROM PushUps P 
JOIN Users U ON P.Id = U.Id
GROUP BY U.Login
ORDER BY 2 DESC


SELECT
U.Login,
P.PushUpsMade,
P.PushUpDate
FROM PushUps P
JOIN Users U ON P.Id = U.Id
WHERE U.Login = 'danyalutsevich'

SELECT U.Login,P.PushUpsMade,P.PushUpDate FROM PushUps P JOIN Users U ON P.Id = U.Id WHERE U.Login = 'danyalutsevich'



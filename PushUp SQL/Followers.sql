CREATE TABLE Followers(
UserId UNIQUEIDENTIFIER,
Follows UNIQUEIDENTIFIER,
FollowingStarted DATETIME
)


INSERT INTO Followers VALUES(
(SELECT ID FROM Users WHERE Login = 'dedast'),
(SELECT ID FROM Users WHERE Login = 'SANOR'),
CAST(CURRENT_TIMESTAMP AS DATETIME)
)

SELECT * FROM Followers


SELECT 
UU.Login,
UF.Login
FROM Followers F
JOIN Users UU ON F.UserId = UU.Id
JOIN Users UF ON F.Follows = UF.Id
WHERE UU.Login ='DDDDDDf'



SELECT 
UF.Login,
P.PushUpsSUM,
P.PushUpsAVG
FROM Followers F
JOIN Users UU ON F.UserId = UU.Id
JOIN Users UF ON F.Follows = UF.Id
JOIN (
SELECT
U.Login[PU],
SUM(P.PushUpsMade) [PushUpsSUM],
AVG(P.PushUpsMade) [PushUpsAVG]
FROM PushUps P 
JOIN Users U ON P.Id = U.Id
GROUP BY U.Login

) P ON UF.Login = P.PU
WHERE UU.Login ='danyalutsevich'
ORDER BY 2 DESC





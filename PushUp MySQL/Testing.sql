SELECT U.Username, P.PushUpsMade, P.PushUpDate FROM PushUps P JOIN Users U ON P.Id = U.UserID WHERE U.Username = 'danyalutsevich'
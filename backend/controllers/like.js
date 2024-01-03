import { db } from "../connect.js";
import jwt from "jsonwebtoken"
import moment from "moment"

export const getLikes = (req, res) =>{
    const q = `SELECT userId from likes WHERE postId = ?`;
  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.map(like=>like.userId));
  });
}

export const addLike = (req, res) => {
    //login stuff
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in");
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("token is not valid");
  
      const q ="INSERT INTO likes (`userId`, `postId`) VALUES (?)";
      const values = [
        userInfo.id,
        req.body.postId,
      ];
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Post has been Liked");
      });
    });
  };

  export const deleteLike = (req, res) => {
    //login stuff
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in");
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("token is not valid");
  
      const q = "DELETE from likes WHERE `userId` = ? AND `postId` = ?";
      const values = [
        userInfo.id,
        req.query.postId,
      ];
      db.query(q, [...values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Post has been unliked");
      });
    });
  };
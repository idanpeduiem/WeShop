import RequestHandler from "express";
import * as admin from "firebase-admin";
export async function validateToken(
  req: RequestHandler.Request,
  res: RequestHandler.Response,
  next: RequestHandler.NextFunction
) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const idToken = authHeader.split(" ")[1];
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(function (decodedToken) {
        req.userId = decodedToken.user_id;
        next();
      })
      .catch(function (error) {
        console.log(error);
        res.sendStatus(403);
      });
  } else {
    res.sendStatus(401);
  }
}

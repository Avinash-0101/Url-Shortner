import { getUser } from "../service/auth.js";

//

export async function restrictedToLoggedInUser(req, res, next) {
    try {
        const userUid = req.cookies?.uid;

        if (!userUid) return res.redirect("/login");

        const user =  await getUser(userUid);

        if (!user) return res.redirect("/login");

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in restrictedToLoggedInUser:", error);
        res.status(500).send("Internal Server Error");
    }
}

export async function checkAuth(req, res, next) {
    try {
        const userUid = req.cookies?.uid;
        // console.log("cookie log in checkAuth", userUid )

        if (!userUid) {
            req.user = null;
        } else {
            const user =await getUser(userUid);
            console.log("user after get user",user);
            req.user = user;
        }

        next();
    } catch (error) {
        console.error("Error in checkAuth:", error);
        res.status(500).send("Internal Server Error");
    }
}
const passport = require('passport');

// exports.isAuth = (req, res, done) => {
//     console.log("JWT", passport.authenticate('jwt'));

//     return passport.authenticate('jwt')

// }


exports.isAuth = (req, res, done) => {
    console.log("hello");

    return passport.authenticate('jwt');
};
exports.sanitizeUser = (user) => {
    // console.log("user sanitizeUser", user);

    return { id: user.id, role: user.role };
};

exports.cookieExtractor = function (req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
        // console.log(req.cookies['jwt']);

        /////////////////1st// token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNWEyNTJmMzgzYmY2OWIxOThkZjk5MSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzg0MzgwNDY0fQ.xvSanaGw5DU5pY5Xi2JXU6pa9v6K68BRNY7xvoa8slo"
        ///////2nd // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNTBkZTk0YWQ4ZjgzZGQwMjAyMGIyYSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzg4ODY2NDcyfQ._h1ztd03s0ACErvFPVPlrpsN5JG-Nhn7bAhuvNWOIpg"
    }
    // console.log("token :- ", token);

    return token;
};
//
// exports.sanitizeUser = (user) => {
//     return { id: user.id, role: user.role }
// }

// //
// exports.cookieExtractor = function (req) {
//     let token = null;
//     if (req && req.cookies) {
//         token = req.cookies['jwt'];
//     }
//     /////////// TODO : this is temporary token for testing without cookies
//     token = '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNWEyNTJmMzgzYmY2OWIxOThkZjk5MSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzg0MjkyNjU1fQ.mx6AXUQ-6CArxPpaIhQ3Bt8Zyhvsv_EyRlKAYRQFQAs"'
//     return token;
// };
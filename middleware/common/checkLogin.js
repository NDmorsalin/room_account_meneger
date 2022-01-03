// external dependency
const jwt = require('jsonwebtoken');

const checkLogin = (req, res, next) => {
    const cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
    if (cookies) {
       
        try {
            const token = cookies[process.env.COOKIE_NAME];

            const decoder = jwt.verify(token, process.env.JWT_SECRET);
            req.member = decoder;

            if (res.locals.html) {
                res.locals.member = decoder;
            }
            next();
        } catch (err) {
            if (res.locals.html) {
                console.log(err);
                res.redirect('/login');
            } else {
                res.status(500).json({
                    errors: {
                        common: {
                            msg: err.message, // Authorisation failed
                        },
                    },
                });
            }
        }
    } else if (res.locals.html) {
        res.redirect('/login');
    } else {
        res.status(500).json({
            errors: {
                common: {
                    msg: 'Authorisation failed', // Authorisation failed
                },
            },
        });
    }
};

const redirectLogIn = (req, res, next) => {
    const cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
    if (!cookies) {
        next();
        //console.log(cookies);
    } else {
        //console.log(cookies);

        res.redirect('/');
    }
};

module.exports = { checkLogin, redirectLogIn };

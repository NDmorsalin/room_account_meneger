// 404 not found

function notFound(req, res, next) {
    res.render('notFound');
}

// Default error handler
function errorsHandler(err, req, res, next) {
    console.log(err);
    res.status(500).json({
        errors: {
            common: {
                msg: err.message,
            },
        },
    });
}

module.exports = {
    notFound,
    errorsHandler,
};

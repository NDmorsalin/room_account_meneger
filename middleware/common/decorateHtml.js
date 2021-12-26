const decorateHtml = (pageTitle) => (req, res, next) => {
    res.locals.errors = {};
    res.locals.data = {};
    res.locals.member = {};
    res.locals.pageTitle = process.env.APP_NAME + pageTitle;
    res.locals.html = true;
    next();
};

module.exports = decorateHtml;

'use strict';

function handle404(req, res, next){
    let object = {
        status: 404,
        message: "404 nothing here"
    };
    res.status(404).json(object);
}

module.exports = handle404;
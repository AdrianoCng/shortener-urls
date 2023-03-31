const { body } = require("express-validator");

module.exports = {
    post: [
        body('originalUrl').isURL({ require_protocol: true })
    ]
}
const controllers = require('../controllers/url')

const validate = require('../middlewares/validate')

const rules = require('../validations/urls')

const urlRouter = require('express').Router();

urlRouter.get('/:urlID', controllers.getUrl)

urlRouter.post('/', validate(rules.post), controllers.postUrl)

module.exports = urlRouter
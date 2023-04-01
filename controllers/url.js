const { nanoid } = require('nanoid')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')

const Url = require('../models/Urls');

const getUrl = async (req, res) => {
    try {
        const urlID = req.params?.urlID;

        if (!urlID) {
            return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST)
        }

        const url = await Url.findOne({ where: { urlID } })

        if (!url) {
            return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND)
        }

        url.increment('clicks');

        res.redirect(url.dataValues.originalUrl)
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR)
    }

}

const postUrl = async (req, res) => {
    try {
        const originalUrl = req.body?.originalUrl;

        if (!originalUrl) {
            return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST)
        }

        const url = await Url.findOne({
            where: {
                originalUrl
            }
        })

        if (url) {
            return res.status(StatusCodes.OK).json(url)
        }

        const urlID = nanoid();
        const shortUrl = `${process.env.BASE_URL}/${urlID}`

        const newUrl = await Url.create({
            urlID,
            originalUrl,
            shortUrl,
            clicks: 0
        })

        if (!newUrl) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
        }

        res.status(StatusCodes.CREATED).json(newUrl)
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    getUrl,
    postUrl
}
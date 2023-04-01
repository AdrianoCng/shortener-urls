const { nanoid } = require('nanoid')

const Url = require('../models/Urls');

const getUrl = async (req, res) => {
    const urlID = req.params?.urlID;

    if (!urlID) {
        return res.status(400)
    }

    const url = await Url.findOne({ where: { urlID } })

    if (!url) {
        return res.status(404).send('Not found')
    }

    url.increment('clicks');

    res.redirect(url.dataValues.originalUrl)
}

const postUrl = async (req, res) => {
    const originalUrl = req.body?.originalUrl;

    if (!originalUrl) {
        return res.status(400)
    }

    const url = await Url.findOne({
        where: {
            originalUrl
        }
    })

    if (url) {
        return res.json(url)
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
        return res.status(500);
    }

    res.json(newUrl)
}

module.exports = {
    getUrl,
    postUrl
}
const axios = require('axios').default
const cheerio = require('cheerio')
const nkiriDB = require('../models/nkiri')

const nkiriFetch = async (dt, bot) => {
    try {
        let url = 'http://nkiri.com/'
        let html = await axios.get(url)
        let $ = cheerio.load(html.data)

        let dramas = $('#eael-post-grid-7643917 article')

        dramas.each(async (i, el) => {
            if (i < 3) {
                let dramaName = $('.eael-entry-header h2 a', el).text()
                let link = $('.eael-entry-header h2 a', el).attr('href')
                let id = $(el).attr('data-id')

                //check if notified
                let ch = await nkiriDB.findOne({ id, dramaName })
                if (!ch) {
                    await nkiriDB.create({ id, dramaName })
                    let txt = `<b>🆕 ${dramaName}</b>`
                    await bot.api.sendMessage(-1002079073174, txt, { parse_mode: 'HTML', reply_markup: {inline_keyboard: [[{text: 'Home', url}, {text: 'Drama', url: link}]]} })
                } else {
                    console.log('No new drama found')
                    let ms = await bot.api.sendMessage(dt.shd, 'No new drama', {disable_notification: true})
                    setTimeout(()=>{
                        bot.api.deleteMessage(dt.shd, ms.message_id)
                        .catch(e => console.log(e.message))
                    }, 1000*60*5)
                }
            }
        })

    } catch (err) {
        console.log(err.message, err)
        await bot.api.sendMessage(-1002079073174, err.message)
    }
}

module.exports = {
    nkiriFetch
}
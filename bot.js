const { Telegraf } = require('telegraf')
const mongoose = require('mongoose')
require('dotenv').config()
const dramaModel = require('./models/botdramas')
const episodesModel = require('./models/botepisodes')
const nextEpModel = require('./models/botnextEp')
const usersModel = require('./models/botusers')
const dramasModel = require('./models/vue-new-drama')
const bot = new Telegraf(process.env.BOT_TOKEN)

//TELEGRAPH
const telegraph = require('telegraph-node')
const ph = new telegraph()

//important middlewares
const if_function_for_buttons = require('./functions/buttons')
const postEpisodesInChannel = require('./functions/postEpisodeInChannel')
const sendToDramastore = require('./functions/sendToDramastore')
const startBot = require('./functions/start')
const naomymatusi = require('./functions/naomymatusi')

mongoose.connect(`mongodb+srv://${process.env.DUSER}:${process.env.DPASS}@nodetuts.ngo9k.mongodb.net/dramastore?retryWrites=true&w=majority`).then(() => {
    console.log('Connection is successfully')
}).catch((err) => {
    console.log(err)
})


// function to send any err in catch block
function anyErr(err) {
    bot.telegram.sendMessage(741815228, err.message)
}

// important field
const dt = {
    ds: process.env.DRAMASTORE_CHANNEL,
    databaseChannel: -1001239425048,
    shd: 741815228,
    htlt: 1473393723,
    naomy: 1006615854,
    jacky: 1937862156,
    loading: 1076477335,
    divineCh: process.env.divineCh,
    link: process.env.BOT_LINK
}

//divine
bot.command('todivine', async ctx => {
    let dramas = await dramasModel.find({ 'telegraph': { '$exists': true } }).sort('createdAt').sort('year')
    dramas.forEach((drama, index) => {
        let txt = `<a href="${drama.telegraph}">🇰🇷 </a><b><u>${drama.newDramaName}</u></b>`
        let link = `https://t.me/+${drama.tgChannel.split('tg://join?invite=')[1]}`
        setTimeout(() => {
            bot.telegram.sendMessage(dt.divineCh, txt, {
                parse_mode: 'HTML',
                disable_notification: true,
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: '⬇ DOWNLOAD THIS DRAMA', url: link }
                        ],
                        [
                            { text: '📞 Admin', url: 'https://t.me/Itzbabie' },
                            { text: '🔍 Find drama', url: 'http://www.dramastore.net/list-of-dramastore-dramas' }
                        ]
                    ]
                }
            })
        }, 10000 * index)
    })
})


// - starting the bot
// - points deduction
startBot(bot, dt, anyErr)

//help command
bot.help(ctx => {
    ctx.reply(`If you have issues regarding using me please contact my developer @shemdoe\n\nIf you run out of points open this link https://www.dramastore.net/user/${ctx.chat.id}/boost to increase your points.`)
})


// -post to dramastore callback action
// -check points balance
// - Get episode by user
sendToDramastore(bot, dt, anyErr)

//posting episodes
// sendPoll
postEpisodesInChannel(bot, dt, anyErr);

naomymatusi(bot, dt, anyErr)


bot.launch()
    .then(() => console.log('Bot started'))
    .catch((err) => console.log(err))

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

process.on('unhandledRejection', (reason, promise) => {
    bot.telegram.sendMessage(1473393723, reason + ' It is an unhandled rejection.')
    console.log(reason)
})

//caught any exception
// we removed process.exit() because we dont want bot to terminate the process
process.on('uncaughtException', (err) => {
    console.log(err.message)
    bot.telegram.sendMessage(741815228, err.message + ' - It is ana uncaught exception.')
})


    // start to save new users with points, send video & update users
    // command to get all episodes with to delete button
    // new dramastore, just index with scrollable div for all drama and boostrap modal scrollable for episodes & channel link

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
    whats: process.env.WHATS,
    shd: 741815228,
    htlt: 1473393723,
    naomy: 1006615854,
    jacky: 1937862156,
    loading: 1076477335,
    airt: 1426255234,
    divineCh: process.env.divineCh,
    link: process.env.BOT_LINK
}

bot.command('kenge', async ctx => {
    let txt = ctx.message.text
    let uj = txt.split('/kenge ')[1]
    if (txt.includes('#')) {
        let ujNid = uj.split('#')
        uj = ujNid[0]
        let rplyId = Number(ujNid[1])
        bot.telegram.sendMessage(dt.naomy, uj, {
            reply_to_message_id: rplyId,
            parse_mode: 'HTML'
        })
    }
    else {
        bot.telegram.sendMessage(dt.naomy, uj)
    }
})

bot.command('block', async ctx => {
    let txt = ctx.message.text
    let id = Number(txt.split('/block ')[1])

    await usersModel.updateOne({ userId: id }, { blocked: true })
    ctx.reply(`The user with id ${id} is blocked successfully`)
})

bot.command('unblock', async ctx => {
    let txt = ctx.message.text
    let id = Number(txt.split('/unblock ')[1].trim())

    await usersModel.updateOne({ userId: id }, { blocked: false })
    ctx.reply(`The user with id ${id} is unblocked successfully`)
    if (id == dt.naomy || id == dt.airt) {
        bot.telegram.sendMessage(id, "Unabahati @shemdoe kakuombea msamaha 😏... Unaweza kunitumia sasa.")
    }
    else {
        bot.telegram.sendMessage(id, `Good news! You're unblocked from using me, you can now request episodes`)
    }
})

// bot.command('all', ctx=> {
//     usersModel.updateMany({}, {$set: {blocked: false}})
//     .then(()=> console.log('Done'))
//     .catch((err)=> console.log(err.message))
// })

bot.command('nigeria', async ctx => {
    let users = await usersModel.find()

    try {
        users.forEach((user, index) => {
            setTimeout(() => {
                bot.telegram.sendMessage(user.userId, `Hello <b>${user.fname}</b>, this is dramastore bot. \n\nAre you from Nigeria?, If yes I have an offer for you... Open the link below, complete the offer and you will be rewarded with 50 Points 😍 for downloading dramas.`, {
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: 'Complete the offer now',
                                    url: `www.dramastore.net/reward/50/${user.userId}`
                                }
                            ]
                        ]
                    }
                })
                console.log('Sent')
            }, 50 * index)
        })
    } catch (err) {
        console.log('Failed')
    }
})


// - starting the bot
// - points deduction
startBot(bot, dt, anyErr)

//help command
bot.help(ctx => {
    ctx.reply(`If you have issues regarding using me please contact my developer @shemdoe\n\nIf you run out of points open this link https://font5.net/blog/post.html?id=62cd8fbe9de0786aafdb98b7#adding-points-dramastore-userid=DS${ctx.chat.id}  to increase your points.\n\nIf the above link not working then use this one http://www.dramastore.net/user/${ctx.chat.id}/boost`)
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

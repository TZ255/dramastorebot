const { Telegraf } = require('telegraf')
const mongoose = require('mongoose')
require('dotenv').config()
const dramaModel = require('./models/botdramas')
const episodesModel = require('./models/botepisodes')
const nextEpModel = require('./models/botnextEp')
const usersModel = require('./models/botusers')
const dramasModel = require('./models/vue-new-drama')
const homeModel = require('./models/vue-home-db')
const { nanoid } = require('nanoid')
const bot = new Telegraf(process.env.BOT_TOKEN)

let rp = require('request-promise')
let cheerio = require('cheerio')

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
    hotel_king: -1001425392198,
    hotel_del_luna: -1001457093470,
    dr_stranger: -1001199318533,
    romance_book: -1001175513824,
    my_love_from_star: -1001220805172,
    tale: -1001167737100,
    fiery: -1001315216267,
    hwarang: -1001182807060,
    divineCh: process.env.divineCh,
    link: process.env.BOT_LINK
}

const other_channels = [dt.hotel_del_luna, dt.hotel_king, dt.dr_stranger, dt.romance_book, dt.my_love_from_star, dt.tale, dt.fiery, dt.hwarang]

bot.command('kenge', async ctx => {
    if (ctx.chat.id == dt.shd || ctx.chat.id == dt.htlt) {
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
    }

})

bot.command('block', async ctx => {
    if (ctx.chat.id == dt.shd || ctx.chat.id == dt.htlt) {
        let txt = ctx.message.text
        let id = Number(txt.split('/block ')[1])

        await usersModel.updateOne({ userId: id }, { blocked: true })
        ctx.reply(`The user with id ${id} is blocked successfully`)
    }

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

bot.command('/broadcast', async ctx => {
    let myId = ctx.chat.id
    let txt = ctx.message.text
    let msg_id = Number(txt.split('/broadcast-')[1].trim())
    if (myId == dt.shd || myId == dt.htlt) {
        try {
            let all_users = await usersModel.find()

            all_users.forEach((u, index) => {
                setTimeout(() => {
                    if (index == all_users.length - 1) {
                        ctx.reply('Done sending offers')
                    }
                    bot.telegram.copyMessage(u.userId, dt.databaseChannel, msg_id)
                        .then(() => console.log('Offer sent to ' + u.userId))
                        .catch((err) => {
                            if (err.message.includes('blocked')) {
                                usersModel.findOneAndDelete({ userId: u.userId })
                                    .then(() => { console.log(u.userId + ' is deleted') })
                            }
                        })
                }, index * 40)
            })
        } catch (err) {
            console.log(err.message)
        }
    }

})

// bot.command('/update', async ctx=> {
//     let all = await dramasModel.find()

//     for (let drama of all) {
//         let id = nanoid(5)
//         await drama.updateOne({nano: id})
//         console.log(drama.newDramaName + ' updated')
//     }
// })


// - starting the bot
// - points deduction
startBot(bot, dt, anyErr)

//help command
bot.help(ctx => {
    ctx.reply(`If you have issues regarding using me please contact my developer @shemdoe`)
})


// -post to dramastore callback action
// -check points balance
// - Get episode by user
sendToDramastore(bot, dt, anyErr, other_channels)

//posting episodes
// sendPoll
postEpisodesInChannel(bot, dt, anyErr, rp, cheerio, ph, dramasModel, homeModel, other_channels);

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

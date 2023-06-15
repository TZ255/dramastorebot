const { Telegraf } = require('telegraf')
const mongoose = require('mongoose')
require('dotenv').config()
const dramaModel = require('./models/botdramas')
const episodesModel = require('./models/botepisodes')
const nextEpModel = require('./models/botnextEp')
const usersModel = require('./models/botusers')
const dramasModel = require('./models/vue-new-drama')
const homeModel = require('./models/vue-home-db')
const analytics = require('./models/analytics')
const { nanoid } = require('nanoid')
const bot = new Telegraf(process.env.BOT_TOKEN)
    .catch((err) => console.log(err.message))

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

mongoose.set('strictQuery', false)
mongoose.connect(`mongodb://${process.env.DUSER}:${process.env.DPASS}@nodetuts-shard-00-00.ngo9k.mongodb.net:27017,nodetuts-shard-00-01.ngo9k.mongodb.net:27017,nodetuts-shard-00-02.ngo9k.mongodb.net:27017/dramastore?ssl=true&replicaSet=atlas-pyxyme-shard-0&authSource=admin&retryWrites=true&w=majority`)
    .then(() => {
        console.log('Bot connected to the database')
    }).catch((err) => {
        console.log(err)
        bot.telegram.sendMessage(741815228, err.message)
    })


// function to send any err in catch block
function anyErr(err) {
    bot.telegram.sendMessage(741815228, err.message)
}

// important field
const dt = {
    ds: process.env.DRAMASTORE_CHANNEL,
    databaseChannel: -1001239425048,
    subsDb: '-1001570087172',
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

//delaying
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

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

bot.command('stats', async ctx => {
    let anas = await usersModel.countDocuments()
    ctx.reply(`Total bot's users are ${anas.toLocaleString('en-us')}`)
})

bot.command('add', async ctx => {
    let txt = ctx.message.text

    if (ctx.chat.id == dt.shd || ctx.chat.id == dt.htlt) {
        try {
            let arr = txt.split('-')
            let id = Number(arr[1])
            let pts = Number(arr[2])
            let param = arr[3]

            let updt = await usersModel.findOneAndUpdate({ userId: id }, { $inc: { points: pts } }, { new: true })

            if (param == 'e') {
                let t1 = `Shemdoe just added ${pts} points to you. Your new points balance is ${updt.points} points.`
                await bot.telegram.sendMessage(id, t1)
            }

            else if (param == 's') {
                let t2 = `Shemdoe amekuongezea points ${pts}. Sasa umekuwa na jumla ya points ${updt.points}... Karibu sana! 😉.`
                await bot.telegram.sendMessage(id, t2)
            }

            await ctx.reply(`Added, she has now ${updt.points}`)
        } catch (err) {
            console.log(err.message)
            ctx.reply(err.message)
        }
    }
})

bot.command('/update_episodes', async ctx=> {
    try {
        let id = ctx.chat.id
        if(id == dt.shd) {
            let txt = ctx.message.text
            let dname = txt.split('/update_episodes ')
            let d_data = dname[1].split(' | ')
            let dramaName = d_data[0]
            let new_eps = d_data[1]

            let dd = await dramasModel.findOneAndUpdate({newDramaName: dramaName}, {noOfEpisodes: new_eps}, {new: true})
            await ctx.reply(`${dd.newDramaName} episodes updated to ${dd.noOfEpisodes}`)
        }
    } catch (err) {
        await ctx.reply(err.message)
    }
})

bot.command('admin', async ctx=> {
    try {
        if(ctx.chat.id == dt.shd) {
            await bot.telegram.copyMessage(dt.shd, dt.databaseChannel, 5444)
        }
    } catch (err) {
        console.log(err.message)
        await ctx.reply(err.message)
    }
})


// - starting the bot
// - points deduction
startBot(bot, dt, anyErr)

//help command
bot.help(ctx => {
    let ptsUrl = `http://dramastore.net/user/${ctx.chat.id}/boost/`
    let ptsKeybd = [
        { text: '🥇 My Points', callback_data: 'mypoints' },
        { text: '➕ Add points', url: ptsUrl }
    ]

    ctx.reply(`If you have issues regarding using me please contact my developer @shemdoe`, {
        reply_markup: {
            inline_keyboard: [ptsKeybd]
        }
    })
})


// -post to dramastore callback action
// -check points balance
// - Get episode by user
sendToDramastore(bot, dt, anyErr, other_channels)

//posting episodes
// sendPoll
postEpisodesInChannel(bot, dt, anyErr, rp, cheerio, ph, dramasModel, homeModel, other_channels, nanoid, delay);

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

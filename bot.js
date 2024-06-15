const { Bot } = require('grammy')
const { autoRetry } = require("@grammyjs/auto-retry");
const mongoose = require('mongoose')
require('dotenv').config()
const usersModel = require('./models/botusers')
const dramasModel = require('./models/vue-new-drama')
const homeModel = require('./models/vue-home-db')
const { nanoid } = require('nanoid')
const bot = new Bot(process.env.BOT_TOKEN)

const nkiriFetch = require('./functions/nkiri')

let axios = require('axios').default
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
const trendingFunctions = require('./functions/schedulers')

mongoose.set('strictQuery', false)
mongoose.connect(`mongodb://${process.env.DUSER}:${process.env.DPASS}@nodetuts-shard-00-00.ngo9k.mongodb.net:27017,nodetuts-shard-00-01.ngo9k.mongodb.net:27017,nodetuts-shard-00-02.ngo9k.mongodb.net:27017/dramastore?ssl=true&replicaSet=atlas-pyxyme-shard-0&authSource=admin&retryWrites=true&w=majority`)
    .then(() => {
        console.log('Bot connected to the database')
    }).catch((err) => {
        console.log(err)
        bot.api.sendMessage(741815228, err.message)
    })


// function to send any err in catch block
function anyErr(err) {
    bot.api.sendMessage(741815228, err.message)
}

//use auto-retry
bot.api.config.use(autoRetry());
bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`(Dstore): ${err.message}`, err);
});

// important field
const dt = {
    ds: -1001245181784,
    databaseChannel: -1001239425048,
    subsDb: '-1001570087172',
    whats: process.env.WHATS,
    dstore_domain: 'https://dramastore.net',
    main_channel: `https://t.me/+mTx_t-6TBx9hNTc8`,
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
    revenge: -1001863956613,
    divineCh: process.env.divineCh,
    link: process.env.BOT_LINK,
    aliProducts: -1001971329607
}

var trendingRateLimit = []
setInterval(() => { trendingRateLimit.length = 0 }, 15000) //clear every 10 secs

setInterval(() => {
    let d = new Date()
    let date = d.getUTCDate()
    let day = d.getUTCDay()  // 0 to 6 where sunday = 0
    let hours = d.getUTCHours()
    let minutes = d.getUTCMinutes()
    let time = `${hours}:${minutes}`

    if (time == '0:0') {
        trendingFunctions.daily(bot, dt)

        if (day == 1) { trendingFunctions.weekly(bot, dt) } //every monday
        if (date == 1) { trendingFunctions.monthly(bot, dt) } //every trh 1
    }
}, 1000 * 59)

//delaying
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const other_channels = [dt.hotel_del_luna, dt.hotel_king, dt.dr_stranger, dt.romance_book, dt.my_love_from_star, dt.tale, dt.fiery, dt.hwarang, dt.revenge]

bot.command('kenge', async ctx => {
    if (ctx.chat.id == dt.shd || ctx.chat.id == dt.htlt) {
        let txt = ctx.message.text
        let uj = txt.split('/kenge ')[1]
        if (txt.includes('#')) {
            let ujNid = uj.split('#')
            uj = ujNid[0]
            let rplyId = Number(ujNid[1])
            bot.api.sendMessage(dt.naomy, uj, {
                reply_to_message_id: rplyId,
                parse_mode: 'HTML'
            })
        }
        else {
            bot.api.sendMessage(dt.naomy, uj)
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
        bot.api.sendMessage(id, "Unabahati @shemdoe kakuombea msamaha 😏... Unaweza kunitumia sasa.")
    }
    else {
        bot.api.sendMessage(id, `Good news! You're unblocked from using me, you can now request episodes`)
    }
})

bot.command('adult', async ctx => {
    try {
        if (ctx.chat.id == dt.shd) {
            let txt = ctx.message.text
            if (txt.includes('adult=')) {
                let userId = Number(txt.split('adult=')[1])
                let u = await usersModel.findOneAndUpdate({ userId }, { $set: { adult: false } }, { new: true })
                await ctx.reply(`${u.fname} updated to ${u.adult}`)
            } else {
                let all = await usersModel.find({ adult: false })
                let majina = 'Hawa hapa ambao tunaheshimiana\n\n'
                for (let u of all) {
                    majina = majina + `${u.fname} - ${u.adult}\n\n`
                }
                await ctx.reply(majina)
            }
        }
    } catch (error) {
        await ctx.reply(error.message)
    }
})

bot.command('trending_today', async ctx => {
    try {
        let id = ctx.chat.id

        if (!trendingRateLimit.includes(id)) {
            trendingRateLimit.push(id)
            let d = new Date().toUTCString()

            let todays = await dramasModel.find().limit(10).select('newDramaName tgChannel today id').sort('-today')
            let txt = `🔥 <u><b>Trending Today (UTC)</b></u>\n<code>${d}</code>\n\n\n`

            todays.forEach((d, i) => {
                txt = txt + `<b>${i + 1}). ${d.newDramaName}\n🔥 ${d.today.toLocaleString('en-US')}</b>\n📥 ${dt.dstore_domain}/${d.id}\n\n\n`
            })
            await ctx.reply(txt, { parse_mode: 'HTML', disable_web_page_preview: true })
        }
    } catch (err) {
        await ctx.reply(err.message)
    }
})

bot.command('trending_this_week', async ctx => {
    try {
        let id = ctx.chat.id

        if (!trendingRateLimit.includes(id)) {
            trendingRateLimit.push(id)

            let todays = await dramasModel.find().limit(10).select('newDramaName tgChannel thisWeek id').sort('-thisWeek')
            let d = new Date().getDay()
            if (d == 0) { d = 7 }
            let txt = `🔥 <u><b>On Trending This Week (Day ${d})</b></u>\n\n\n`

            todays.forEach((d, i) => {
                txt = txt + `<b>${i + 1}). ${d.newDramaName}\n🔥 ${d.thisWeek.toLocaleString('en-US')}</b>\n📥 ${dt.dstore_domain}/${d.id}\n\n\n`
            })
            await ctx.reply(txt, { parse_mode: 'HTML', disable_web_page_preview: true })
        }
    } catch (err) {
        await ctx.reply(err.message)
    }
})

bot.command('trending_this_month', async ctx => {
    try {
        let id = ctx.chat.id

        if (!trendingRateLimit.includes(id)) {
            trendingRateLimit.push(id)

            let todays = await dramasModel.find().limit(10).select('newDramaName tgChannel thisMonth id').sort('-thisMonth')
            let txt = `🔥 <u><b>On Trending This Month (UTC)</b></u>\n\n\n`

            todays.forEach((d, i) => {
                txt = txt + `<b>${i + 1}). ${d.newDramaName}\n🔥 ${d.thisMonth.toLocaleString('en-US')}</b>\n📥 ${dt.dstore_domain}/${d.id}\n\n\n`
            })
            await ctx.reply(txt, { parse_mode: 'HTML', disable_web_page_preview: true })
        }
    } catch (err) {
        await ctx.reply(err.message)
    }
})

bot.command('all_time', async ctx => {
    try {
        let id = ctx.chat.id

        if (!trendingRateLimit.includes(id)) {
            trendingRateLimit.push(id)

            let todays = await dramasModel.find().limit(25).select('newDramaName tgChannel timesLoaded id').sort('-timesLoaded')
            let txt = `🔥 <u><b>Most Popular Dramas (of All Time)</b></u>\n\n\n`

            todays.forEach((d, i) => {
                txt = txt + `<b>${i + 1}). ${d.newDramaName}\n🔥 ${d.timesLoaded.toLocaleString('en-US')}</b>\n📥 ${dt.dstore_domain}/${d.id}\n\n\n`
            })
            await ctx.reply(txt, { parse_mode: 'HTML', disable_web_page_preview: true })
        }
    } catch (err) {
        await ctx.reply(err.message)
    }
})

bot.command('find_drama', async ctx => {
    let txt = `Hey <b>${ctx.chat.first_name}!</b>\n\nYou can find drama on our website here ${dt.dstore_domain} or join our main Telegram channel and use the search filter to find the drama you need\n\n<b>Our Main Channel:</b>\n${dt.main_channel}\n${dt.main_channel}`
    try {
        await ctx.reply(txt, { parse_mode: 'HTML', disable_web_page_preview: true })
    } catch (err) {
        console.log(err.message)
    }
})

bot.command('broadcast', async ctx => {
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
                    bot.api.copyMessage(u.userId, dt.databaseChannel, msg_id, {
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    { text: '▶ Watch the Video', url: 'https://youtu.be/aqvv_jthtts' }
                                ]
                            ]
                        }
                    }).then(() => console.log('Offer sent to ' + u.userId))
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

    let pps = await usersModel.aggregate([
        { $group: { _id: '$country.name', total: { $sum: 1 } } },
        { $sort: { "total": -1 } }
    ]).limit(20)

    let ttx = `Top 20 countries with most users\n\n`
    for (let u of pps) {
        ttx = ttx + `<b>• ${u._id}:</b> ${u.total.toLocaleString('en-us')} users\n`
    }
    await ctx.reply(ttx, { parse_mode: 'HTML' })
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
                await bot.api.sendMessage(id, t1)
            }

            else if (param == 's') {
                let t2 = `Shemdoe amekuongezea points ${pts}. Sasa umekuwa na jumla ya points ${updt.points}... Karibu sana! 😉.`
                await bot.api.sendMessage(id, t2)
            }

            await ctx.reply(`Added, she has now ${updt.points}`)
        } catch (err) {
            console.log(err.message)
            ctx.reply(err.message)
        }
    }
})

bot.command('update_episodes', async ctx => {
    try {
        let id = ctx.chat.id
        if (id == dt.shd) {
            let txt = ctx.message.text
            let dname = txt.split('/update_episodes ')
            let d_data = dname[1].split(' | ')
            let dramaName = d_data[0]
            let new_eps = d_data[1]

            let dd = await dramasModel.findOneAndUpdate({ newDramaName: dramaName }, { noOfEpisodes: new_eps }, { new: true })
            await ctx.reply(`${dd.newDramaName} episodes updated to ${dd.noOfEpisodes}`)
        }
    } catch (err) {
        await ctx.reply(err.message)
    }
})

bot.command('admin', async ctx => {
    try {
        if (ctx.chat.id == dt.shd) {
            await bot.api.copyMessage(dt.shd, dt.databaseChannel, 5444)
        }
    } catch (err) {
        console.log(err.message)
        await ctx.reply(err.message)
    }
})

bot.on('chat_join_request', async ctx=> {
    try {
        let userid = ctx.chatJoinRequest.from.id
        let chan_id = ctx.chatJoinRequest.chat.id
        //if is drama updates
        if(chan_id == dt.aliProducts) {
            await bot.api.sendMessage(userid, 'Request approved. You can now download the episode.\n\nClick the <b>✅ DONE</b> button above to proceed with your download', {parse_mode: 'HTML'})
            await delay(500)
            await bot.api.approveChatJoinRequest(chan_id, userid)
        } else {
            await bot.api.sendMessage(userid, 'Request approved. You can now download Korean Dramas from Our Channel', {parse_mode: 'HTML'})
            await delay(500)
            await bot.api.approveChatJoinRequest(chan_id, userid)
        }
    } catch (error) {
        console.log(error.message)
        await bot.api.sendMessage(dt.shd, `Join Error: ${error.message}`)
    }
})


// - starting the bot
// - points deduction
startBot(bot, dt, anyErr, trendingRateLimit)

//help command
bot.command('help', ctx => {
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
postEpisodesInChannel(bot, dt, anyErr, axios, cheerio, ph, dramasModel, homeModel, other_channels, nanoid, delay);

naomymatusi(bot, dt, anyErr)

bot.use(async ctx=> {
    try {
        let up_id = ctx.update.update_id
        let bid = ctx.update.business_message.business_connection_id
        let user = ctx.update.business_message.from.id
        let umsgid = ctx.update.business_message.message_id
        let user_msg = ctx.update.business_message.text
        console.log(bid)
        if(user_msg == 'mambo') {
            await bot.api.sendMessage(user, 'Nimeon', {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {text: 'Bonyeza Hapa', callback_data: 'mama'}
                        ]
                    ]
                },
                business_connection_id: bid,
                reply_to_message_id: umsgid
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

//scrap nkiri every five minutes
setInterval(() => {
    nkiriFetch.nkiriFetch(dt, bot)
        .catch(err => {
            bot.api.sendMessage(-1002079073174, err.message)
                .catch(e => console.log(e.message))
        })
}, 1000 * 60 * 5)


bot.start()
    .then(() => console.log('Bot started'))
    .catch((err) => console.log(err))

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

process.on('unhandledRejection', (reason, promise) => {
    bot.api.sendMessage(1473393723, reason + ' It is an unhandled rejection.')
    console.log(reason)
})

//caught any exception
// we removed process.exit() because we dont want bot to terminate the process
process.on('uncaughtException', (err) => {
    console.log(err.message)
    bot.api.sendMessage(741815228, err.message + ' - It is ana uncaught exception.')
})


const http = require('http')
const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" })
    res.end('Karibu, Dramastorebot')
})

server.listen(process.env.PORT || 3000, () => console.log('Listen to port 3000'))

const dramasModel = require('../models/vue-new-drama')
const episodesModel = require('../models/vue-new-episode')
const nextEpModel = require('../models/botnextEp')
const usersModel = require('../models/botusers')

module.exports = (bot, dt, anyErr, trendingRateLimit) => {

    let delay = (ms) => new Promise(reslv => setTimeout(reslv, ms))

    let ujumbe3 = 'You got the file and 2 points deducted from your points balance.\n\n<b>You remained with 8 points.</b>'

    bot.command('start', async (ctx) => {
        let name = ctx.chat.first_name
        let message_id = ctx.message.message_id
        let msg = `Welcome ${name}, Visit Drama Store Website For Korean Series`
        try {
            if (!ctx.match) {
                await ctx.reply(msg, {
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: '🌎 OPEN DRAMA STORE', url: 'www.dramastore.net/list/all' }
                            ]
                        ]
                    }
                })
            }
            else if (ctx.match && !trendingRateLimit.includes(ctx.chat.id)) {
                trendingRateLimit.push(ctx.chat.id)
                let payload = ctx.match
                let pt = 1

                if (payload.includes('2shemdoe')) {
                    pt = 2
                }

                if (payload.includes('marikiID-')) {
                    let ep_doc_id = payload.split('marikiID-')[1]
                    let member = await bot.api.getChatMember(dt.aliProducts, ctx.chat.id)

                    //check if joined sponsor
                    if (member.status == 'left') {
                        //create new invite link
                        // let new_link = await bot.api.createChatInviteLink(dt.aliProducts, {
                        //     name: ctx.chat.id,
                        //     expire_date: ctx.message.date + (60*30), //15 minutes
                        //     creates_join_request: true
                        // })
                        //let sp_ch = new_link.invite_link
                        let sp_ch = 'https://t.me/+waNS0WLblD9lODZk'
                        await ctx.reply(`⚠ You didn't join our notifications channel. \n\nTo get this episode please join the channel through the link below and then click <b>✅ Done</b> button to proceed.\n\n<b>🔗 Join the Channel: 👇\n${sp_ch}\n${sp_ch}</b>\n\n•••`, {
                            parse_mode: 'HTML',
                            link_preview_options: { is_disabled: true },
                            reply_markup: { inline_keyboard: [[{ text: '✅ Done (Joined)', url: `https://t.me/dramastorebot?start=marikiID-${ep_doc_id}` }]] }
                        })
                    } else {
                        //find the document
                        let ep_doc = await episodesModel.findById(ep_doc_id)

                        let txt = `<b>🤖 <u>Confirm download:</u></b>\n\nYou are downloading \n<b>${ep_doc.drama_name} ➜ Episode ${ep_doc.epno}</b>\n\n<code>Confirm 👇</code>`
                        let url = `http://dramastore.net/download/episode?ep_id=${ep_doc._id}&userid=${ctx.chat.id}`

                        //reply with episodes info
                        let epinfo = await ctx.reply(txt, {
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: "⬇ GO TO DOWNLOAD PAGE", url }
                                    ]
                                ]
                            }
                        })

                        //delete episode info
                        setTimeout(() => {
                            ctx.api.deleteMessage(ctx.chat.id, epinfo.message_id)
                                .catch((e) => console.log(e.message))
                        }, 30000)

                        //update channel count
                        await dramasModel.findOneAndUpdate({ chan_id: ep_doc.drama_chan_id }, { $inc: { timesLoaded: 30, thisMonth: 29, thisWeek: 29, today: 29 } })
                        console.log(ep_doc.drama_name + ' 30 loaded added')

                        //check if user available to db
                        let user = await usersModel.findOne({ userId: ctx.chat.id })
                        if (!user) {
                            let fname = ctx.chat.first_name
                            if (ctx.chat.username) {
                                fname = '@' + ctx.chat.username
                            }
                            let blocked = false
                            let country = { name: 'unknown', c_code: 'unknown' }
                            let userId = ctx.chat.id
                            let points = 10
                            let downloaded = 0
                            await usersModel.create({ fname, blocked, country, userId, points, downloaded })
                            console.log('new user from offer added')
                        } else {
                            if (ctx.chat.username) {
                                if (user.fname != `@${ctx.chat.username}`) {
                                    await usersModel.findOneAndUpdate({ userId: ctx.chat.id }, { $set: { fname: `@${ctx.chat.username}` } })
                                }
                            } else {
                                if (user.fname != ctx.chat.first_name) {
                                    await usersModel.findOneAndUpdate({ userId: ctx.chat.id }, { $set: { fname: ctx.chat.first_name } })
                                }
                            }
                        }
                    }
                }

                if (payload.includes('fromWeb')) {
                    let msgId = payload.split('fromWeb')[1].trim()

                    if (msgId.includes('TT')) {
                        let _data = msgId.split('TT')
                        let ep_id = Number(_data[1])
                        let sub_id = Number(_data[2])

                        await bot.api.copyMessage(ctx.chat.id, dt.databaseChannel, ep_id)
                        await delay(500)
                        await bot.api.copyMessage(ctx.chat.id, dt.subsDb, sub_id)
                    } else {
                        await bot.api.copyMessage(ctx.chat.id, dt.databaseChannel, msgId)
                    }
                    console.log('Episode sent from web by ' + ctx.chat.first_name)

                    let userfromWeb = await usersModel.findOneAndUpdate({ userId: ctx.chat.id }, { $inc: { downloaded: 1 } })

                    //if user from web is not on database
                    if (!userfromWeb) {
                        await usersModel.create({
                            userId: ctx.chat.id,
                            points: 10,
                            fname: ctx.chat.first_name,
                            downloaded: 1,
                            blocked: false,
                            country: { name: 'unknown', c_code: 'unknown' }
                        })
                        console.log('From web not on db but added')
                    }
                }

                else if (payload.includes('shemdoe')) {
                    if (payload.includes('nano_') && !payload.includes('nano_AND')) {
                        let nano = payload.split('nano_')[1]
                        nano = nano.split('AND_')[0]

                        let drama = await dramasModel.findOneAndUpdate({ nano }, { $inc: { timesLoaded: 30, thisMonth: 29, thisWeek: 29, today: 29 } }, { new: true })
                        console.log(drama.newDramaName + ' updated to ' + drama.timesLoaded)
                    }
                    let epMsgId = payload.split('shemdoe')[1].trim()

                    let ptsUrl = `http://dramastore.net/user/${ctx.chat.id}/boost/`


                    let ptsKeybd = [
                        { text: '🥇 My Points', callback_data: 'mypoints' },
                        { text: '➕ Add points', url: ptsUrl }
                    ]

                    // add user to database
                    let user = await usersModel.findOne({ userId: ctx.chat.id })

                    //function to send episode
                    const sendEp = async (bot, ctx) => {
                        if (epMsgId.includes('TT')) {
                            let _data = epMsgId.split('TT')
                            let ep_id = Number(_data[1])
                            let sub_id = Number(_data[2])

                            await bot.api.copyMessage(ctx.chat.id, dt.databaseChannel, ep_id)
                            delay(500)
                            await bot.api.copyMessage(ctx.chat.id, dt.subsDb, sub_id)
                        } else {
                            await bot.api.copyMessage(ctx.chat.id, dt.databaseChannel, epMsgId, {
                                reply_markup: { inline_keyboard: [ptsKeybd] }
                            })
                        }
                    }

                    //if user not exist
                    if (!user) {
                        let newUser = await usersModel.create({
                            userId: ctx.chat.id,
                            points: 8,
                            fname: ctx.chat.first_name,
                            downloaded: 1,
                            blocked: false,
                            country: { name: 'unknown', c_code: 'unknown' }
                        })
                        //send episode
                        sendEp(bot, ctx)
                        await delay(1500)
                        let re = await ctx.reply(ujumbe3, { parse_mode: 'HTML' })
                        setTimeout(() => {
                            bot.api.deleteMessage(ctx.chat.id, re.message_id)
                                .catch((err) => console.log(err.message))
                        }, 7000)
                    }

                    //if user exist
                    else {
                        if (user.points > 1) {
                            //send episode
                            sendEp(bot, ctx)

                            let upd = await usersModel.findOneAndUpdate({ userId: ctx.chat.id }, { $inc: { points: -2, downloaded: 1 } }, { new: true })

                            let uj_pts = upd.points
                            let ujumbe1 = `You got the file and 2 points deducted from your points balance.\n\n<b>You remained with ${uj_pts} points.</b>`

                            let ujumbe2 = `You got the file and 2 points deducted from your points balance.\n\n<b>You remained with ${uj_pts} points.</b>`

                            //delay for 2 secs, not good in longer millsecs
                            await delay(1000)
                            if (upd.downloaded >= 32) {
                                let re50 = await ctx.reply(ujumbe2, { parse_mode: 'HTML' })
                                setTimeout(() => {
                                    bot.api.deleteMessage(ctx.chat.id, re50.message_id)
                                        .catch((err) => console.log(err.message))
                                }, 7000)

                            } else if (upd.downloaded < 32) {
                                let re49 = await ctx.reply(ujumbe1, { parse_mode: 'HTML' })
                                setTimeout(() => {
                                    bot.api.deleteMessage(ctx.chat.id, re49.message_id)
                                        .catch((err) => console.log(err.message))
                                }, 7000)

                            }
                        }

                        if (user.points < 2) {
                            await ctx.reply(`You don't have enough points to get this file, you need at least 2 points.\n\nFollow this link to add more http://dramastore.net/user/${ctx.chat.id}/boost or click the button below.`, {
                                reply_markup: { inline_keyboard: [ptsKeybd] }
                            })
                        }
                    }
                }

                else if (payload.includes('on_trending')) {
                    await ctx.reply(`To see what is on trending on dramastore. Use the following commands\n\n🤖 /trending_today - daily top 10 trending dramas.\n\n🤖 /trending_this_week - top 10 trending dramas this week.\n\n🤖 /trending_this_month - top 10 trending dramas this month.\n\n🤖 /all_time - most popular dramas on dramastore.`)
                }

                else if (payload.includes('find_drama')) {
                    await ctx.api.copyMessage(ctx.chat.id, dt.databaseChannel, 12062, {
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    { text: '🔍 Find drama here', url: 'https://dramastore.net/list/all' }
                                ]
                            ]
                        }
                    })
                }
            }
            else if (ctx.match && trendingRateLimit.includes(ctx.chat.id)) {
                await ctx.api.deleteMessage(ctx.chat.id, message_id)
            }

        } catch (err) {
            console.log(err)
            anyErr(err)
            ctx.reply('An error occurred whilst trying give you the file, please forward this message to @shemdoe\n\n' + 'Error: ' + err.message)
        }
    })
}

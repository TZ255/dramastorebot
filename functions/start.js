const dramasModel = require('../models/vue-new-drama')
const episodesModel = require('../models/botepisodes')
const nextEpModel = require('../models/botnextEp')
const usersModel = require('../models/botusers')

module.exports = (bot, dt, anyErr) => {
    bot.start(async (ctx) => {
        let name = ctx.chat.first_name
        let msg = `
    Welcome ${name}, Visit Drama Store Website For Korean Series
    `
        try {
            if (!ctx.startPayload) {
                await ctx.reply(msg, {
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: '🌎 OPEN DRAMA STORE', url: 'www.dramastore.net' }
                            ]
                        ]
                    }
                })
            }
            else {
                let startPayload = ctx.startPayload
                let pt = 1

                if (startPayload.includes('2shemdoe')) {
                    pt = 2
                }

                if (startPayload.includes('fromWeb')) {
                    let msgId = startPayload.split('fromWeb')[1].trim()

                    await bot.telegram.copyMessage(ctx.chat.id, dt.databaseChannel, msgId)
                    console.log('Episode sent from web by ' + ctx.chat.first_name)

                    let userfromWeb = await usersModel.findOneAndUpdate({ userId: ctx.chat.id }, { $inc: { downloaded: 1 } })

                    //if user from web is not on database
                    if (!userfromWeb) {
                        await usersModel.create({
                            userId: ctx.chat.id,
                            points: 10,
                            fname: ctx.chat.first_name,
                            downloaded: 1,
                            blocked: false
                        })
                        console.log('From web not on db but added')
                    }
                }

                else if (startPayload.includes('shemdoe')) {
                    if (startPayload.includes('nano_')) {
                        let nano = startPayload.split('nano_')[1]
                        nano = nano.split('AND_')[0]

                        let drama = await dramasModel.findOneAndUpdate({ nano }, { $inc: { timesLoaded: 30 } }, { new: true })
                        console.log(drama.newDramaName + ' updated to ' + drama.timesLoaded)
                    }
                    let epMsgId = startPayload.split('shemdoe')[1].trim()

                    let ptsUrl = `http://dramastore.net/user/${ctx.chat.id}/boost/`


                    let ptsKeybd = [
                        { text: '🥇 My Points', callback_data: 'mypoints' },
                        { text: '➕ Add points', url: ptsUrl }
                    ]

                    function deleteMsg(bot, ctx, mmid) {
                        setTimeout(() => {
                            bot.telegram.deleteMessage(ctx.chat.id, mmid)
                                .catch((err) => console.log(err.message))
                        }, 7000)
                    }

                    let closeKybd = [
                        { text: '👌 Ok, I understand', callback_data: 'closePtsMsg' }
                    ]

                    // add user to database
                    let user = await usersModel.findOne({ userId: ctx.chat.id })

                    //if user not exist
                    if (!user) {
                        let newUser = await usersModel.create({
                            userId: ctx.chat.id,
                            points: 8,
                            fname: ctx.chat.first_name,
                            downloaded: 1,
                            blocked: false
                        })

                        await bot.telegram.copyMessage(ctx.chat.id, dt.databaseChannel, epMsgId, {
                            reply_markup: { inline_keyboard: [ptsKeybd] }
                        })

                        setTimeout(() => {
                            ctx.reply('You got the file and 2 points deducted from your points balance.\n\n<b>You remained with 8 points.</b>', { parse_mode: 'HTML' })
                                .catch((err) => console.log(err.message))
                                .then((em) => {
                                    deleteMsg(bot, ctx, em.message_id)
                                })
                        }, 1500)
                    }

                    //if user exist
                    else {
                        if (user.points > 1) {
                            await bot.telegram.copyMessage(ctx.chat.id, dt.databaseChannel, epMsgId, {
                                reply_markup: { inline_keyboard: [ptsKeybd] }
                            })

                            let upd = await usersModel.findOneAndUpdate({ userId: ctx.chat.id }, { $inc: { points: -2 } }, { new: true })

                            setTimeout(() => {
                                ctx.reply(`You got the file and 2 points deducted from your points balance.\n\n<b>You remained with ${upd.points} points.</b>`, { parse_mode: 'HTML' })
                                .catch((err)=> console.log(err.message))
                                .then((em)=>{
                                    deleteMsg(bot, ctx, em.message_id)
                                })
                            }, 1500)
                        }

                        else {
                            await ctx.reply(`You don't have enough points to get this file, you need at least 2 points.\n\nFollow this link to add more http://dramastore.net/user/${ctx.chat.id}/boost or click the button below.`, {
                                reply_markup: { inline_keyboard: [ptsKeybd] }
                            })
                        }
                    }
                }
            }

        } catch (err) {
            console.log(err)
            anyErr(err)
            ctx.reply('An error occurred whilst trying give you the file, please forward this message to @shemdoe\n\n' + 'Error: ' + err.message)
        }
    })
}

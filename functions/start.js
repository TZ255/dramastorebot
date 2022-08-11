const dramaModel = require('../models/botdramas')
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
                    setTimeout(() => {
                        ctx.reply(`Option 2 used... no point deducted`, {
                            parse_mode: 'HTML'
                        }).then((yohave) => {
                            setTimeout(() => {
                                bot.telegram.deleteMessage(ctx.chat.id, yohave.message_id)
                                    .catch((err) => {
                                        if (err.description.includes('delete')) {
                                            bot.telegram.sendMessage(dt.shd, err.description)
                                        }
                                    })
                            }, 5000)
                        })
                    }, 1000)
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
                    let epMsgId = startPayload.split('shemdoe')[1].trim()
                    let fontUrl = `https://font5.net/blog/post.html?id=62cd8fbe9de0786aafdb98b7#adding-points-dramastore-userid=DS${ctx.chat.id}`
                    let url = `http://www.dramastore.net/user/${ctx.chat.id}/boost`


                    let ptsKeybd = [
                        { text: '🥇 My Points', callback_data: 'mypoints' },
                        { text: '➕ Add points', url: fontUrl }
                    ]
                    let closeKybd = [
                        { text: '👌 Ok, I understand', callback_data: 'closePtsMsg' }
                    ]

                    // add user to database
                    let user = await usersModel.findOne({ userId: ctx.chat.id })
                    if (!user) {
                        let newUser = await usersModel.create({
                            userId: ctx.chat.id,
                            points: 10,
                            fname: ctx.chat.first_name,
                            downloaded: 1,
                            blocked: false
                        })

                        let txt = `Welcome <b>${ctx.chat.first_name}</b>, this is Drama Store Bot, you were provided with 10 free points\n\n- To get episode file you need to have at least 2 points.\n- Each episode you get will cost you 2 points.\n- You can easily add your points through the "➕ Add points" button`

                        await ctx.reply(txt, { parse_mode: 'HTML' })

                        bot.telegram.copyMessage(ctx.chat.id, dt.databaseChannel, epMsgId, {
                            reply_markup: {
                                inline_keyboard: [ptsKeybd]
                            }
                        })

                        await newUser.updateOne({ $inc: { points: -pt } })
                        setTimeout(() => {
                            ctx.reply(`You got the file and ${pt} point(s) deducted from your points balance.\n\nYou remain with <b>${newUser.points - pt} points</b>`, {
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [closeKybd]
                                }
                            })
                        }, 1000)
                    }

                    if (user && user.blocked == true) {
                        ctx.reply("Nikikutumia iyo episode niite mbwa niko nakusubiri hapa 😏")
                    }

                    if (user && user.points >= 2 && user.blocked != true) {
                        await bot.telegram.copyMessage(ctx.chat.id, dt.databaseChannel, epMsgId, {
                            reply_markup: {
                                inline_keyboard: [ptsKeybd]
                            }
                        })

                        await user.updateOne({ $inc: { points: -pt, downloaded: 1 } })
                        console.log(`Episode sent to ${user.fname}`)

                        setTimeout(() => {
                            ctx.reply(`You got the file and ${pt} point(s) deducted from your points balance.\n\nYou remain with <b>${user.points - pt} points.</b>`, {
                                parse_mode: 'HTML'
                            }).then((yohave) => {
                                setTimeout(() => {
                                    bot.telegram.deleteMessage(ctx.chat.id, yohave.message_id)
                                        .catch((err) => {
                                            if (err.description.includes('delete')) {
                                                bot.telegram.sendMessage(dt.shd, err.description)
                                            }
                                        })
                                }, 10000)
                            })
                        }, 1000)

                    }
                    if (user && user.points < 2 && user.blocked != true) {
                        await ctx.reply(`You don't have enough points to get the file (you need at least 2 points)\n\nYou have <b>${user.points}</b> points... Click <b>"➕ Add points"</b> button below to boost your points.`, {
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [ptsKeybd]
                            }
                        })
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

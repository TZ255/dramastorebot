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
                    await usersModel.findOneAndUpdate({ userId: ctx.chat.id}, {$inc: {downloaded: 1}})
                    return console.log(`Episode sent to ${name} by OPTION 2`)
                }

                let epMsgId = startPayload.split('shemdoe')[1].trim()
                let url = `http://www.dramastore.net/user/${ctx.chat.id}/boost`
                let fontUrl = `https://font5.net/pages/users?userid=DS${ctx.chat.id}`


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
                        downloaded: 1
                    })

                    let txt = ''

                    if (ctx.chat.id == dt.naomy) {
                        txt = `Karibu <b>Zumaridi</b> 😊 bestie yake shemdoe\nUmepata points 10 za bure.\n- Kila episode nitakayokupa nitakukata points 2.\n- Ili nikutumie episode unatakiwa uwe na angalau points 2, chini ya hapo itakupasa kuziongeza kwa kubofya button ya "➕ Add Points."`
                    }
                    else if (ctx.chat.id == dt.jacky) {
                        txt = `Karibu <b>Jacky</b> 😊 rafiki yake shemdoe\nUmepata points 10 za bure.\n- Kila episode nitakayokupa nitakukata points 2.\n- Pia ili nikutumie episode unatakiwa uwe na angalau points 2, chini ya hapo itakupasa kuziongeza kwa kubofya button ya "➕ Add Points."`
                    } else {
                        txt = `Welcome <b>${ctx.chat.first_name}</b>, this is Drama Store Bot, you were provided with 10 free points\n\n- To get episode file you need to have at least 2 points.\n- Each episode you get will cost you 2 points.\n- You can easily add your points through the "➕ Add points" button`
                    }
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
                if (user && user.points >= 2) {
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
                if (user && user.points < 2) {
                    await ctx.reply(`You don't have enough points to get the file (you need at least 2 points)\n\nYou have <b>${user.points}</b> points... Click <b>"➕ Add points"</b> button below to increase your points, alternatively you can follow this link ${url}`, {
                        parse_mode: 'HTML',
                        reply_markup: {
                            inline_keyboard: [ptsKeybd]
                        }
                    })
                }
            }

        } catch (err) {
            console.log(err)
            anyErr(err)
            ctx.reply('An error occurred whilst trying give you the file, please forward this message to @shemdoe\n\n' + 'Error: ' + err.message)
        }
    })
}

const dramaModel = require('../models/botdramas')
const episodesModel = require('../models/botepisodes')
const nextEpModel = require('../models/botnextEp')
const usersModel = require('../models/botusers')
const newDramas = require('../models/vue-new-drama')
const if_function_for_buttons = require('./buttons')

module.exports = (bot, dt, anyErr) => {
    bot.on('callback_query', async ctx => {
        try {
            // check if is callbackquery for updating drama
            if (ctx.callbackQuery.data.includes('push')) {
                let callbackMsgId = ctx.callbackQuery.message.message_id
                let shemdoeReplyMarkup = ctx.callbackQuery.message.reply_markup

                let tgLink = shemdoeReplyMarkup.inline_keyboard[0][0].url

                let divineRM = [
                    [
                        { text: '⬇ DOWNLOAD THIS DRAMA', url: `${tgLink}` }
                    ],
                    [
                        { text: '📞 Admin', url: 'https://t.me/Itzbabie' },
                        { text: '🔍 Find drama', url: 'http://www.dramastore.net/list-of-dramastore-dramas' }
                    ]
                ]

                shemdoeReplyMarkup.inline_keyboard.pop()

                await bot.telegram.copyMessage(dt.ds, ctx.chat.id, callbackMsgId, {
                    reply_markup: shemdoeReplyMarkup
                })
                await bot.telegram.copyMessage(dt.whats, ctx.chat.id, callbackMsgId, {
                    reply_markup: shemdoeReplyMarkup
                })
                await bot.telegram.copyMessage(dt.divineCh, ctx.chat.id, callbackMsgId, {
                    reply_markup: {
                        inline_keyboard: divineRM
                    }
                })

                bot.telegram.deleteMessage(ctx.chat.id, callbackMsgId).catch((err) => {
                    if (err.message.includes(`delete`)) {
                        ctx.answerCbQuery(`Can't close this message.... It's too old, delete it instead.`, {
                            show_alert: true
                        })
                    }
                })
            }

            else if (ctx.callbackQuery.data.includes('getEp')) {
                let epnoMsgId = ctx.callbackQuery.data.split('getEp')[1].trim()

                let dParam = 'shemdoe'

                if (ctx.callbackQuery.data.includes('2getEp')) {
                    dParam = '2shemdoe'
                }

                let cname = ctx.callbackQuery.message.sender_chat.title
                if (cname.includes('Official -')) {
                    let dname = cname.split('Official - ')[1].trim()
                    await newDramas.findOneAndUpdate({ newDramaName: dname }, { $inc: { timesLoaded: 30 } })
                }

                ctx.answerCbQuery('dramastore', {
                    url: `${dt.link}${dParam}${epnoMsgId}`,
                    cache_time: 14400 //4 hours
                })
            }
            else if (ctx.callbackQuery.data.includes('mypoints')) {
                let chatId = ctx.chat.id

                let txt = ''
                let user = await usersModel.findOne({ userId: chatId })

                // for spellings, if remain one remove s
                if (user.points == 1) {
                    txt = `${user.fname}\n\nTotal downloaded episodes: ${user.downloaded}\n\nYou have ${user.points} point.\n\nClick "➕ Add points button" to increase your points.`
                } else {
                    txt = `${user.fname}\n\nTotal downloaded episodes: ${user.downloaded}\n\nYou have ${user.points} points.\n\nClick "➕ Add points button" to increase your points.`
                }


                ctx.answerCbQuery(txt, {
                    show_alert: true,
                    cache_time: 2
                })
            }
            else if (ctx.callbackQuery.data.includes('closePtsMsg')) {
                bot.telegram.deleteMessage(ctx.callbackQuery.message.chat.id, ctx.callbackQuery.message.message_id).catch((err) => {
                    if (err.message.includes('delete')) {
                        ctx.answerCbQuery(`Can't close this message.... It's too old, delete it instead.`, {
                            show_alert: true
                        })
                    }
                })

            }

            else if (ctx.callbackQuery.data.includes('help')) {
                let msg = `THIS IS HOW TO DOWNLOAD\n\n✨ Click "⬇ DOWNLOAD NOW" to open chat with [BOT]\n\n✨ At the bottom of [BOT] click "START" and it'll send you the file.\n\n\n📞 Any problem contact @shemdoe`

                ctx.answerCbQuery(msg, {
                    show_alert: true,
                    cache_time: 14400 //4 hours
                })
            }

            else if (ctx.callbackQuery.data.includes('newHbtn')) {
                let msg = `HOW TO DOWNLOAD\n\n✨ Tap "⬇ DOWNLOAD NOW" to open chat with BOT\n\n✨ At the bottom of BOT click "START" to get the file.\n\n✨Use "OPTION 2" to download without points\n\n📞 Any problem contact @shemdoe`

                ctx.answerCbQuery(msg, {
                    show_alert: true,
                    cache_time: 14400 //4 hours
                })
            }

            else if (ctx.callbackQuery.data.includes('epinfo')) {
                let data = ctx.callbackQuery.data.split('_')
                let epno = data[0].split('epinfo')[1]
                let msg = `Info About This Episode\n\n▶ Ep. No: ${epno}\n\n💾 Size: ${data[1]}\n\n📸 Quality: ${data[2]}`

                ctx.answerCbQuery(msg, {
                    show_alert: true,
                    cache_time: 14400 //4 hours
                })
            }

            else if (ctx.callbackQuery.data.includes('niupendo')) {
                let callbackMsgId = ctx.callbackQuery.message.message_id
                bot.telegram.deleteMessage(ctx.chat.id, callbackMsgId)
                ctx.reply('Nakupenda pia Zumaridi 😍 zaidi ata ya shemdoe')
            }

            else if (ctx.callbackQuery.data.includes('nimekutukana')) {
                let callbackMsgId = ctx.callbackQuery.message.message_id
                bot.telegram.deleteMessage(ctx.chat.id, callbackMsgId)
                ctx.reply('😏 Mxeeew! Lione na domo lako kama la Mr. Paul 😭😂😂')
            }

            else {
                let id = ctx.callbackQuery.id
                let chatId = ctx.callbackQuery.from.id
                let fname = ctx.callbackQuery.from.first_name
                let txt = ''

                if (chatId == dt.naomy) {
                    txt = 'Hii ni dramastore\nKaribu Zumaridi 😂, @shemdoe anakupenda sana'
                }
                else if (chatId == dt.jacky) {
                    txt = 'Hii ni dramastore\nKaribu Jacky, @shemdoe anakupenda sana'
                } else {
                    txt = "Korean Drama Store (@dramastore1)"
                }
                ctx.answerCbQuery(txt, { show_alert: false })
            }
        } catch (err) {
            anyErr(err)
        }
    })
}
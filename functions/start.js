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

                    let url = `http://font5.net/blog/post.html?id=62c17505ff0a4608ebd38b1c#getting-episode-dramaid=${epMsgId}&size=NAN&epno=${ctx.chat.id}`


                    let ptsKeybd = [
                        { text: '🥇 My Points', callback_data: 'mypoints' },
                        { text: '➕ Add points', url: fontUrl }
                    ]

                    let linkKey = [
                        { text: '▶️ OPEN THE EPISODE', url }
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
                    }

                    let txt = 'Preparing the Episode... ⏳'
                    let txt2 = '✅ Episode prepared successfully.'

                    let send = await ctx.reply(txt)
                    setTimeout(()=>{
                        bot.telegram.deleteMessage(ctx.chat.id, send.message_id)
                        .then(()=> {
                            ctx.reply(txt2, {
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [linkKey]
                                }
                            }).catch((err)=> console.log(err))
                        }).catch((err)=> console.log(err))
                    }, 1500)
                }
            }

        } catch (err) {
            console.log(err)
            anyErr(err)
            ctx.reply('An error occurred whilst trying give you the file, please forward this message to @shemdoe\n\n' + 'Error: ' + err.message)
        }
    })
}

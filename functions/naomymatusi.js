module.exports = (bot, dt, anyErr) => {
    bot.on('text', async ctx => {
        try {
            if (ctx.message.reply_to_message && ctx.chat.id == dt.htlt) {
                if (ctx.message.reply_to_message.text) {
                    let myid = ctx.chat.id
                    let my_msg_id = ctx.message.message_id
                    let umsg = ctx.message.reply_to_message.text
                    let ids = umsg.split('id = ')[1].trim()
                    let userid = Number(ids.split('&mid=')[0])
                    let mid = Number(ids.split('&mid=')[1])

                    await bot.telegram.copyMessage(userid, myid, my_msg_id, { reply_to_message_id: mid })

                } else if (ctx.message.reply_to_message.photo) {
                    let my_msg = ctx.message.text
                    let umsg = ctx.message.reply_to_message.caption
                    let ids = umsg.split('id = ')[1].trim()
                    let userid = Number(ids.split('&mid=')[0])
                    let mid = Number(ids.split('&mid=')[1])

                    await bot.telegram.sendMessage(userid, my_msg, { reply_to_message_id: mid })
                }
            } else {
                let userid = ctx.chat.id
                let txt = ctx.message.text
                let username = ctx.chat.first_name
                let mid = ctx.message.message_id

                await bot.telegram.sendMessage(dt.htlt, `<b>${txt}</b> \n\nfrom = <code>${username}</code>\nid = <code>${userid}</code>&mid=${mid}`, { parse_mode: 'HTML', disable_notification: true })
            }
        } catch (err) {
            console.log(err.message, err)
        }
    })
}

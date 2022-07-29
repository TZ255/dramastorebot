module.exports = (bot, dt, anyErr) => {
    bot.on('text', async ctx => {
        try {
            let id = ctx.chat.id
            let msgId = ctx.message.message_id
            let fname = ctx.chat.first_name
            let txt = ctx.message.text
            //let matusi = ['kuma', 'nyoko', 'kumanyoko', 'msenge', 'matako', 'tako', 'mavi', 'mkundu', 'mbwa', 'tombwa', 'kenge', 'makalio', 'kichaa', 'mpuuzi', 'mjinga']
            if (id == dt.naomy) {
               await bot.telegram.sendMessage(dt.htlt, `id={${msgId}} \n${txt}`)
               bot.telegram.sendChatAction(id, "record_voice")
            }
            else {
                ctx.reply(`Hello ${fname}\n I don't understand human language, if you have an issue plz contact @shemdoe to resolve it`, {
                    reply_to_message_id: msgId
                })
            }
        } catch (err) {
            anyErr(err)
        }
    })

    bot.on('voice', ctx => {
        try {
            let msgId = ctx.message.message_id
            let id = ctx.chat.id
    
            if (id == dt.naomy) {
                bot.telegram.sendChatAction(id, 'typing')
                setTimeout(() => {
                    ctx.reply(`😳😳😳🙉🙉🙉 \nZumaridi kwa voice note umeniweza 🥺🥺, siwezi skiliza nikaelewa... \n\nkama umenitusi na ww pia ivo-ivo 😏\n\nkama ni upendo nakuzidishia x100 🥰 \n\nNisaidie kujua apa chini`, {
                        reply_to_message_id: msgId,
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    { text: '🤬 Nimekutukana', callback_data: 'nimekutukana'},
                                    { text: '😍 Niupendo', callback_data: 'niupendo'}
                                ]
                            ]
                        }
                    }, 1500)
                })
            }
        } catch (err) {
            anyErr(err)
        }
    
    })
}

module.exports = (bot, dt, anyErr) => {
    bot.on('text', async ctx => {
        try {
            let id = ctx.chat.id
            let msgId = ctx.message.message_id
            let fname = ctx.chat.first_name
            let txt = ctx.message.text
            let matusi = ['kuma', 'nyoko', 'kumanyoko', 'msenge', 'matako', 'tako', 'mavi', 'mkundu', 'mbwa', 'tombwa', 'kenge', 'makalio', 'kichaa', 'mpuuzi', 'mjinga']
            if (id == dt.naomy) {
               await bot.telegram.sendMessage(dt.htlt, txt)
                for (let [index, tusi] of matusi.entries()) {
                    if (txt.toLowerCase().includes(tusi)) {
                        bot.telegram.sendChatAction(id, 'typing')
                        setTimeout(() => {
                            ctx.reply(`Zumaridi ww ni kasenge 🖕 japo mimi ni kajinga ila najua apo umenitukana mimi <b>${tusi}</b> 😭 nalipiza.\n\n<b>Na ndomana una sura kama tako la Credo 😂😂, kama imekuuma chomoa mjinga ww 😛</b>`, {
                                reply_to_message_id: msgId,
                                parse_mode: 'HTML'
                            })
                        }, 1500)
                        break
                    }

                    else if(!txt.toLowerCase().includes(tusi) && (txt.toLowerCase().includes('babe') || txt.toLowerCase().includes('love') || txt.toLowerCase().includes('penda'))) {
                        ctx.reply('😍😚🤗💓 Wow jmn... Kwaniaba ya shemdoe, Zumaridi nakupenda saaana 😘', {
                            reply_to_message_id: msgId
                        })
                        break;
                    }

                    // tumefanya ivi ili kupisha iteration kwa elements zote kama hamna ndo turun izi code, bila ivo hii code ingerun kwenye iteration ya kwanza
                    else if (!txt.includes(tusi) && (matusi.length -1) == index ) {
                        ctx.reply('🤔')
                    }
                }
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

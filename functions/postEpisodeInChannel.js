module.exports = (bot, dt, anyErr) => {
    bot.use(async (ctx, next) => {
        try {
            // check if it is used in channel
            if (ctx.update.channel_post) {
                // check if it is dramastore database
                if (ctx.update.channel_post.sender_chat.id == dt.databaseChannel) {
                    // check if ni document
                    if (ctx.update.channel_post.document) {
                        let msgId = ctx.update.channel_post.message_id
                        let fileName = ctx.update.channel_post.document.file_name
                        let fileZize = ctx.channelPost.document.file_size
                        let SizeInMB = (fileZize / (1024 * 1024))
                        let netSize = Math.round(SizeInMB * 10) / 10 //round to 1 dp
                        let noEp = ''

                        //document spillited with dramastore
                        if (fileName.includes('dramastore.xyz')) {
                            noEp = fileName.split('[dramastore.xyz] ')[1].substring(0, 3)
                        }
                        else if (fileName.includes('dramastore.net')) {
                            noEp = fileName.split('[dramastore.net] ')[1].substring(0, 3)
                        }
                        else if (fileName.toLowerCase().includes('@dramaost')) {
                            noEp = fileName.toLowerCase().split('@dramaost.')[1].substring(0, 3).toUpperCase()
                        }
                        else if (fileName.toLowerCase().startsWith('e')) {
                            noEp = fileName.toLowerCase().substring(0, 3).toUpperCase()
                        }

                        ctx.reply(`Copy -> <code>uploading_new_episode_${noEp}_S${netSize}_msgId${msgId}</code>`, { parse_mode: 'HTML' })
                    }
                }

                // if is other channels
                else {
                    //check if its text sent to that channel
                    if (ctx.channelPost.hasOwnProperty('text')) {
                        let txt = ctx.channelPost.text
                        if (txt.includes('uploading_new_episode')) {
                            let data = txt.split('_')
                            let ep = data[3].substring(1)
                            let size = data[4].substring(1) + " MB"
                            let epMsgId = data[5].substring(5)
                            let chatId = ctx.channelPost.chat.id
                            let idToDelete = ctx.channelPost.message_id
                            let quality = '540p HDTV'

                            if(txt.includes('540p_WEBDL')) {
                                quality = '540p WEBDL'
                            }
                            else if(txt.includes('480p_WEBDL')) {
                                quality = '480p WEBDL'
                            }
                            else if(txt.includes('720p_WEBDL')) {
                                quality = '720p WEBDL'
                            }

                            else if(txt.includes('720p_HDTV')) {
                                quality = '720p HDTV'
                            }

                            else if(txt.includes('1080p_WEDDL')) {
                                quality = '1080p WEBDL'
                            }

                            await bot.telegram.sendPoll(chatId, `▶ Episode ${ep} | ${quality} | Muxed English Subtitles`, [
                                '👍 Like',
                                '👎 Dislike'
                            ], {
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: `⬇ DOWNLOAD NOW E${ep} (${size})`, callback_data: `getEp${epMsgId}` }
                                        ],
                                        [
                                            { text: '💡 Help', callback_data: 'help' },
                                            { text: '🗞 Info', callback_data: `epinfo${ep}_${size}_${quality}`}
                                        ]
                                    ]
                                }
                            })
                            bot.telegram.deleteMessage(chatId, idToDelete)
                        }
                    }

                }
            }

            // if is not channel
            else { next()}
        }
        catch (err) {
            console.log(err)
            anyErr(err)
        }
    })
}
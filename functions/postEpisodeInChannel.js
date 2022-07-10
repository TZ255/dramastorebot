const vueNewDramaModel = require('../models/vue-new-drama')

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
                        let capQty = '540P HDTV H.264'
                        let muxed = '#English Soft-subbed'
                        let extraParams = ''

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

                        if (fileName.toLowerCase().includes('480p.web')) {
                            capQty = '480P WEBDL'
                            extraParams = '480p_WEBDL'
                        }

                        if (fileName.toLowerCase().includes('480p.hdtv.mp4')) {
                            capQty = '480P HDTV H.264'
                            muxed = '#English Hard-subbed (kissasian)'
                            extraParams = '480p_HDTV_MP4'
                        }

                        else if (fileName.toLowerCase().includes('540p') && fileName.toLowerCase().includes('web')) {
                            capQty = '540P WEBDL'
                            extraParams = '540p_WEBDL'
                        }

                        else if (fileName.toLowerCase().includes('.nk.')) {
                            capQty = '540P HDTV H.265'
                            muxed = '#English Hard-subbed'
                            extraParams = 'NK'
                        }

                        let cap = `<b>Ep. ${noEp.substring(1)} | ${capQty}  \n${muxed}\n\n⭐️ More Telegram K-Drama WWW.DRAMASTORE.NET</b>`
                        if(muxed == '#English Soft-subbed') {
                            cap = `<b>Ep. ${noEp.substring(1)} | ${capQty}  \n${muxed}</b>\n\n<i>- This ep. is soft-subbed, use VLC or MX Player to see subtitles</i>`
                        }

                        await bot.telegram.editMessageCaption(ctx.channelPost.chat.id, msgId, '', cap, { parse_mode: 'HTML' })

                        ctx.reply(`Copy -> <code>uploading_new_episode_${noEp}_S${netSize}_msgId${msgId}_${extraParams}</code>`, { parse_mode: 'HTML' })
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
                            let sizeWeb = data[4].substring(1).trim()
                            let epMsgId = data[5].substring(5)
                            let chatId = ctx.channelPost.chat.id
                            let idToDelete = ctx.channelPost.message_id
                            let quality = '540p HDTV H.264'
                            let subs = '#English Soft-subbed'
                            let totalEps = ''

                            let cname = ctx.channelPost.sender_chat.title
                            if (cname.includes('Official -')) {
                                let dname = cname.split('Official - ')[1].trim()
                                let drama = await vueNewDramaModel.findOne({ newDramaName: dname})
                                if(drama) {
                                    totalEps = `/${drama.noOfEpisodes}`

                                    if(Number(ep) == Number(drama.noOfEpisodes)) {
                                        await drama.updateOne({status: 'Completed'})
                                        console.log(`${drama.newDramaName} is Completed`)
                                    }
                                }
                            }

                            if (txt.includes('540p_WEBDL')) {
                                quality = '540p WEBDL'
                            }
                            else if (txt.includes('480p_WEBDL')) {
                                quality = '480p WEBDL'
                                enc = ''
                            }
                            else if (txt.includes('480p_HDTV_MP4')) {
                                quality = '480p HDTV (kissasian)'
                                enc = ''
                                subs = ''
                            }
                            else if (txt.includes('480p_HDTV_MKV')) {
                                quality = '540p HDTV H.265'
                                enc = ''
                            }
                            else if (txt.includes('NK')) {
                                quality = '540p HDTV H.265'
                                subs = '#English Hard-subbed'
                            }
                            else if (txt.includes('720p_WEBDL')) {
                                quality = '720p WEBDL'
                            }

                            else if (txt.includes('720p_HDTV')) {
                                quality = '720p HDTV'
                            }

                            else if (txt.includes('1080p_WEDDL')) {
                                quality = '1080p WEBDL'
                            }

                            else if (txt.includes('dual')) {
                                ep = ep + '-' + ('0' + (Number(ep) + 1)).slice(-2)
                            }

                            await bot.telegram.sendPoll(chatId, `📺 Ep. ${ep}${totalEps} | ${quality} \n${subs}`, [
                                '👍 Good',
                                '👎 Bad'
                            ], {
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: `⬇ DOWNLOAD NOW (${size})`, callback_data: `2getEp${epMsgId}` }
                                        ],
                                        [
                                            { text: '⬇ OPTION 2', url: `font5.net/pages/telegram?msgid=777shemdoe${epMsgId}777shemdoe${sizeWeb}777shemdoe${ep}`},
                                            { text: '💡 Help', callback_data: 'newHbtn' }
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
            else { next() }
        }
        catch (err) {
            console.log(err)
            anyErr(err)
        }
    })
}
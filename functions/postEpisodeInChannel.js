const vueNewDramaModel = require('../models/vue-new-drama')
const postModel = require('../models/postmodel')

module.exports = (bot, dt, anyErr, rp, cheerio, ph, new_drama, homeModel, other_channels, nanoid) => {
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
                        let netSize = Math.trunc(SizeInMB)
                        let noEp = ''
                        let capQty = '540P HDTV H.264'
                        let muxed = '#English Soft-subbed'
                        let extraParams = ''

                        //document spillited with dramastore
                        if (fileName.includes('dramastore.xyz')) {
                            noEp = fileName.split('[dramastore.xyz] ')[1].substring(0, 3)
                        }
                        else if (fileName.includes('dramastore.net') && !fileName.includes('NK.3.')) {
                            noEp = fileName.split('[dramastore.net] ')[1].substring(0, 3)
                        }
                        else if (fileName.toLowerCase().includes('@dramaost')) {
                            noEp = fileName.toLowerCase().split('@dramaost.')[1].substring(0, 3).toUpperCase()
                        }
                        else if (fileName.toLowerCase().includes('nk.3.mkv')) {
                            noEp = fileName.toLowerCase().split('[dramastore.net]')[1].substring(1, 5).toUpperCase()
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

                        else if (fileName.toLowerCase().includes('540p') && fileName.toLowerCase().includes('webdl')) {
                            capQty = '540P WEBDL'
                            extraParams = '540p_WEBDL'
                        }

                        else if (fileName.toLowerCase().includes('.540p.nk.')) {
                            capQty = '540P HDTV H.265'
                            muxed = '#English Hard-subbed'
                            extraParams = 'NK'
                        }

                        else if (fileName.toLowerCase().includes('.480p.nk.')) {
                            capQty = '480P HDTV H.265'
                            muxed = '#English Hard-subbed'
                            extraParams = 'SOJU'
                        }

                        else if (fileName.toLowerCase().includes('.360p.nk.')) {
                            capQty = '360P HDTV H.264'
                            muxed = '#English Hard-subbed'
                            extraParams = 'KIMOI'
                        }

                        let cap = `<b>Ep. ${noEp.substring(1)} | ${capQty}  \n${muxed}\n\n⭐️ More Telegram K-Dramas <a href="https://t.me/+vfhmLVXO7pIzZThk">@KOREAN_DRAMA_STORE</a></b>`
                        if (muxed == '#English Soft-subbed') {
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
                            let nano = ''

                            let cname = ctx.channelPost.sender_chat.title
                            if (cname.includes('Official -')) {
                                let dname = cname.split('Official - ')[1].trim()
                                let drama = await vueNewDramaModel.findOne({ newDramaName: dname })
                                if (drama) {
                                    totalEps = `/${drama.noOfEpisodes}`
                                    nano = drama.nano

                                    if (Number(ep) == Number(drama.noOfEpisodes)) {
                                        await drama.updateOne({ status: 'Completed' })
                                        console.log(`${drama.newDramaName} is Completed`)
                                    }
                                    
                                    let theep = {no: Number(ep), msg_id: Number(epMsgId), size: Number(data[4].substring(1))}

                                    await drama.updateOne({$push: {episodes: theep}})
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
                            else if (txt.includes('SOJU')) {
                                quality = '480p HDTV H.265'
                                subs = '#English Hard-subbed'
                            }
                            else if (txt.includes('KIMOI')) {
                                quality = '360p HDTV H.264 (kimoiTV)'
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

                            let idadi = await postModel.countDocuments()
                            let rn = Math.floor(Math.random() * idadi)

                            let post = await postModel.findOne().skip(rn)

                            await bot.telegram.sendPoll(chatId, `📺 Ep. ${ep}${totalEps} | ${quality} \n${subs}`, [
                                '👍 Good',
                                '👎 Bad'
                            ], {
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: `⬇ DOWNLOAD EP. ${ep} (${size})`, url: `https://${dt.link}nano_${nano}AND_2shemdoe${epMsgId}` }
                                        ],
                                        [
                                            { text: '⬇ OPTION 2', url: `font5.net/blog/post.html?id=${post._id}#getting-episode-dramaid=${epMsgId}&size=${sizeWeb}&epno=${ep}` },
                                            { text: '💡 Help', callback_data: 'newHbtn' }
                                        ]
                                    ]
                                }
                            })
                            bot.telegram.deleteMessage(chatId, idToDelete)
                        }

                        else if (txt.includes('post_drama')) {
                            let chid = ctx.channelPost.chat.id
                            let info = await bot.telegram.getChat(chid)
                            let arrs = txt.split('=')

                            let invite_link = info.invite_link
                            let url = arrs[1].trim()
                            let dramaid = arrs[2].trim()

                            const html = await rp(url)
                            const $ = cheerio.load(html)
                            let syn = $('.show-synopsis').text()
                            if (syn.includes('(Source: ')) {
                                let arr = syn.split('(Source: ')
                                syn = arr[0].trim()
                            }
                            let genres = $('.show-genres').text().split('Genres: ')[1].trim()
                            let pic_href = $('.row .cover .block').attr('href')
                            let pic_id = pic_href.split('/photos/')[1].trim()
                            let highq_img = `https://i.mydramalist.com/${pic_id}f.jpg`
                            let lowq_img = ''
                            if($('.row .cover .block img').attr('src')) {
                                lowq_img = $('.row .cover .block img').attr('src')
                            } else {
                                lowq_img = $('.row .cover .block img').attr('data-cfsrc')
                            }

                            if(lowq_img.includes(`/cdn-cgi/mirage/`)) {
                                let raw = lowq_img.split('https:')
                                lowq_img = 'https:' + raw[1]
                            }
                            
                            let dramaName = $('.box-header .film-title').text().trim()

                            let no_of_episodes = $('.box-body ul li:nth-child(3)').text().split('Popularity')[0].split('Episodes: ')[1].trim()
                            if (no_of_episodes.length == 1) {
                                no_of_episodes = '0' + no_of_episodes
                            }
                            let aired = $('.box-body ul li:nth-child(4)').text().split('Watchers')[0].split('Aired: ')[1].trim()

                            let page = await ph.createPage(process.env.TOKEN, dramaName, [
                                { tag: 'img', attrs: { src: highq_img } },
                                { tag: 'h3', children: ['Details'] },
                                {
                                    tag: 'ul', children: [
                                        {
                                            tag: 'li', children: [
                                                { tag: 'b', children: ['Drama: '] },
                                                { tag: 'i', children: [dramaName] }
                                            ]
                                        },
                                        {
                                            tag: 'li', children: [
                                                { tag: 'b', children: ['Episodes: '] },
                                                { tag: 'i', children: [no_of_episodes] }
                                            ]
                                        },
                                        {
                                            tag: 'li', children: [
                                                { tag: 'b', children: ['Subtitle: '] },
                                                { tag: 'i', children: ['English'] }
                                            ]
                                        },
                                        {
                                            tag: 'li', children: [
                                                { tag: 'b', children: ['Aired: '] },
                                                { tag: 'i', children: [aired] }
                                            ]
                                        },
                                        {
                                            tag: 'li', children: [
                                                { tag: 'b', children: ['Genre: '] },
                                                { tag: 'i', children: [genres] }
                                            ]
                                        },
                                        {
                                            tag: 'li', children: [
                                                { tag: 'b', children: ['Country: '] },
                                                { tag: 'i', children: ['South Korea'] }
                                            ]
                                        }
                                    ]
                                },
                                { tag: 'h3', children: ['Synopsis'] },
                                {
                                    tag: 'em', children: [
                                        {
                                            tag: 'i', children: [syn]
                                        }
                                    ]
                                }
                            ],
                                {
                                    author_name: '@shemdoe',
                                    author_url: 'https://t.me/shemdoe'
                                })
                            let telegraph_link = page.url
                            let link_id = invite_link.split('/+')[1]


                            await new_drama.create({
                                newDramaName: dramaName,
                                noOfEpisodes: no_of_episodes,
                                genre: genres,
                                aired,
                                subtitle: 'English',
                                id: dramaid,
                                coverUrl: highq_img,
                                synopsis: syn.replace(/\n/g, '<br>'),
                                status: 'Ongoing',
                                tgChannel: `tg://join?invite=${link_id}`,
                                telegraph: telegraph_link,
                                timesLoaded: 1,
                                nano: nanoid(5)
                            })

                            let yearScrap = dramaName.split('(2')[1].split(')')[0]
                            let strYr = `2${yearScrap}`
                            await homeModel.create({
                                idToHome: dramaid,
                                year: Number(strYr),
                                dramaName,
                                imageUrl: lowq_img,
                                episodesUrl: dramaid,
                            })
                            await bot.telegram.sendMessage(dt.shd, `<a href="${telegraph_link}">🇰🇷 </a><u><b>${dramaName}</b></u>`, {
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            {text: '⬇ DOWNLOAD ALL EPISODES', url: invite_link}
                                        ],
                                        [
                                            {text: '📞 Admin', url: 'https://t.me/shemdoe'},
                                            {text: '🔍 Find drama', url: 'www.dramastore.net/list-of-dramastore-dramas'}
                                        ],
                                        [
                                            {text: 'Push to dramastore', callback_data: 'push'}
                                        ]
                                    ]
                                }
                            })
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
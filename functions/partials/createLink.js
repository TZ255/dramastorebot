const inviteModel = require('../../models/invitelink')

//create new invite link and save to database
const createChatInviteLink = async (bot, dt, name, expire) => {
    try {
        let new_link = await bot.api.createChatInviteLink(dt.aliProducts, {
            name, expire_date: expire, creates_join_request: true
        })

        //save link to db
        await inviteModel.create({
            link: new_link.invite_link, channel: 'Ali DB - Backup'
        })
    } catch (error) {
        console.log(error.message)
    }
}


module.exports = {createChatInviteLink}
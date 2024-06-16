const sendToMe = async (ctx, dt) => {
    await ctx.api.sendMessage(dt.htlt, `<b>${ctx.message.text}</b> \n\nfrom = <code>${ctx.chat.first_name}</code>\nid = <code>${ctx.chat.id}</code>&mid=${ctx.message.message_id}`, { parse_mode: 'HTML', disable_notification: true })
}

module.exports = {sendToMe}
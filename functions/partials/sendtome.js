const sendToMe = async (ctx, dt) => {
    const muhimu = [dt.naomy, dt.jacky, dt.airt]
    if (muhimu.includes(ctx.chat.id)) {
        await ctx.api.sendMessage(dt.shd, `<b>${ctx.message.text}</b> \n\nfrom = <code>${ctx.chat.first_name}</code>\nid = <code>${ctx.chat.id}</code>&mid=${ctx.message.message_id}`, { parse_mode: 'HTML', disable_notification: true })
    } else {
        await ctx.api.sendMessage(dt.htlt, `<b>${ctx.message.text}</b> \n\nfrom = <code>${ctx.chat.first_name}</code>\nid = <code>${ctx.chat.id}</code>&mid=${ctx.message.message_id}`, { parse_mode: 'HTML', disable_notification: true })
    }
}

module.exports = { sendToMe }
const dramasModel = require('../models/vue-new-drama')

const dailyFn = async (bot, dt) => {
    try {
        await dramasModel.updateMany({}, { $set: { today: 0 } })
        await bot.api.sendMessage(dt.shd, `Daily Trending Resetted`)
    } catch (err) {
        console.log(err.message, err)
        await bot.api.sendMessage(dt.shd, err.message)
            .catch(e => console.log(e.message))
    }
}

const weeklyFn = async (bot, dt) => {
    try {
        await dramasModel.updateMany({}, { $set: { thisWeek: 0 } })
        await bot.api.sendMessage(dt.shd, `Weekly Trending Resetted`)
    } catch (err) {
        console.log(err.message, err)
        await bot.api.sendMessage(dt.shd, err.message)
            .catch(e => console.log(e.message))
    }
}

const monthlyFn = async (bot, dt) => {
    try {
        await dramasModel.updateMany({}, { $set: { thisMonth: 0 } })
        await bot.api.sendMessage(dt.shd, `Monthly Trending Resetted`)
    } catch (err) {
        console.log(err.message, err)
        await bot.api.sendMessage(dt.shd, err.message)
            .catch(e => console.log(e.message))
    }
}

module.exports = {
    daily: dailyFn, weekly: weeklyFn, monthly: monthlyFn
}
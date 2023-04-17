const mongooose = require("mongoose");
const Schema = mongooose.Schema;

const newEpisodeSchema = new Schema(
  {
    epid: {type: Number},
    epno: {type: Number},
    size: {type: String},
    drama_name: {type: String},
    drama_chan_id: {type: Number},
    poll_msg_id: {type: Number},
  },
  { timestamps: true, strict: false }
);

const model = mongooose.model("new-episode", newEpisodeSchema);
module.exports = model;
import channelsModel from './channels-model.js';

export const createChannel = (channel) => channelsModel.create(channel);

export const findAllChannels = () => channelsModel.find();

export const findChannelByInternalId = (id) => channelsModel.findById(id);

export const findChannelByTwitchId = (twitch_id) => channelsModel.findOne({twitch_id: twitch_id});

export const findChannelByTwitchName = (twitch_name) => channelsModel.findOne({twitch_name: twitch_name});

export const updateChannel = (twitch_id, channel) => channelsModel.updateOne({twitch_id: twitch_id}, {$set: channel});

export const deleteChannel = (twitch_id) => channelsModel.deleteOne({twitch_id: twitch_id});
import * as channelsDao from './channels-dao.js';


const ChannelsController = (app) => {
    app.get('/api/channels', findChannels)
    app.get('/api/channels/:twitch_id', findChannelsByTwitchId)
    app.get('/api/channels/internal/:id', findChannelsByInternalId);

    app.post("/api/channels", createChannel);

    app.delete('/api/channels/:twitch_id', deleteChannel);

    app.put("/api/channels/:twitch_id", update_channel);
}

const findChannels = async (req, res) => {
    const twitch_name = req.body.twitch_name;
    if (twitch_name) {
        const channel = await channelsDao.findChannelByTwitchName(twitch_name);
        if (channel) {
            res.json(channel);
        } else {
            res.sendStatus(404);
        }
    }
    else {
        const channels = await channelsDao.findAllChannels();
        res.json(channels);
    }
}

const findChannelsByTwitchId = async (req, res) => {
    const twitch_id = req.body.twitch_id;
    if (twitch_id) {
        const channel = await channelsDao.findChannelByTwitchId(twitch_id);
        if (channel) {
            res.json(channel);
            return;
        }
    }
    res.sendStatus(404);
}

const findChannelsByInternalId = async (req, res) => {
    const id = req.params.id;
    const user = await channelsDao.findChannelByInternalId(id);
    res.json(user);
}

const createChannel = async (req, res) => {
    const channel = req.body;
    const newChannel = await channelsDao.createChannel(channel);
    res.json(newChannel);
}

const deleteChannel = async (req, res) => {
    const twitch_id = req.params.twitch_id;
    const status = await channelsDao.deleteChannel(twitch_id);
    res.json(status);
}

const update_channel = async (req, res) => {
    const twitch_id = req.params.twitch_id;
    /* check to see if the user exists in the database */
    const channel_in_db = await channelsDao.findChannelByTwitchId(twitch_id);
    const updated_channel = req.body;

    if (channel_in_db) {
        await channelsDao.updateChannel(twitch_id, updated_channel);
        res.json(updated_channel);
        return;
    }
    res.sendStatus(404);
};

export default ChannelsController;
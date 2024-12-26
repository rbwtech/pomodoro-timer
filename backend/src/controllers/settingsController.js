const settingsController = {
    async updateSettings(req, res) {
        const { userId, settings } = req.body;
        await Settings.update(userId, settings);
        res.json({ success: true });
    }
};
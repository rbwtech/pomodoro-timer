const useSettings = () => {
    const [settings, setSettings] = useState(null);

    const updateSettings = async (newSettings) => {
        await settingsService.update(newSettings);
        setSettings(newSettings);
    };

    return { settings, updateSettings };
};
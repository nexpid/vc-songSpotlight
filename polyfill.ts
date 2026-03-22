export function readClipboard(): Promise<string> {
    return IS_DISCORD_DESKTOP ? DiscordNative.clipboard.read() : navigator.clipboard.readText();
}

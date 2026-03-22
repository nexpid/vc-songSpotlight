/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { PluginNative } from "@utils/types";
import { useEffect, useState } from "@webpack/common";
import { RenderSongInfo } from "./api/dist/handlers";
import { Song } from "./api/dist/structs";
import { sid } from "./api/dist/util";

export function useRender(song: Song) {
    const [failed, setFailed] = useState(false);
    const [render, setRender] = useState<RenderSongInfo | null>(null);

    useEffect(() => {
        setFailed(false);
        setRender(null);
        Native.renderSong(song)
            .catch(() => null)
            .then(info => info ? setRender(info) : setFailed(true));
    }, [sid(song)]);

    return { failed, render };
}

export const Native = VencordNative.pluginHelpers.SongSpotlight as PluginNative<typeof import("./native")>;

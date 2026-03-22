/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { ConnectSrc, CspPolicies, ImageSrc } from "@main/csp";
import { type IpcMainInvokeEvent, net } from "electron";
import * as handlers from "./api/dist/handlers";
import type { Song } from "./api/dist/structs";
import { setFetchHandler } from "./api/dist/util";

const MediaSrc = [...ImageSrc, "media-src"];

Object.assign(CspPolicies, {
    "dc.songspotlight.nexpid.xyz": ConnectSrc, // Song Spotlight API
    "*.scdn.co": MediaSrc, // Spotify cover art/audio preview CDN
    "*.sndcdn.com": MediaSrc, // Soundcloud cover art/audio preview CDN
    "*.mzstatic.com": ImageSrc, // Apple Music cover art CDN
    "audio-ssl.itunes.apple.com": MediaSrc, // Apple Music audio preview CDN
    "*.tidal.com": MediaSrc, // Tidal cover art/audio preview CDN
});

setFetchHandler(net.fetch as unknown as typeof fetch);

export async function parseLink(_: IpcMainInvokeEvent, link: string) {
    return handlers.parseLink(link);
}
export async function renderSong(_: IpcMainInvokeEvent, song: Song) {
    return handlers.renderSong(song);
}
export async function validateSong(_: IpcMainInvokeEvent, song: Song) {
    return handlers.validateSong(song);
}

export function clearCache() {
    return handlers.clearCache();
}

import { ISpeedDialItem } from "./speedDialItem";

export interface StyleData {
    background?: string;
    showForkRibbon?: boolean;
    headerBackground?: string;
    logo?: string;
}
export interface SearchOptions {
    title: boolean;
    url: boolean;
    tags: boolean;
}
export const DEFAULT_STYLEDATA = {
    background: '#FFFFFF',
    headerBackground: undefined,
    showForkRibbon: true,
    logo: undefined
}
export const DEFAULT_SEARCHOPTIONS = {
    title: true,
    url: true,
    tags: true
}
export const DEFAULT_SPEED_DIAL_DATA = {
    title: "",
    style: DEFAULT_STYLEDATA,
    searchOptions: DEFAULT_SEARCHOPTIONS,
    data: [],
    openInNewTab: false
}
export interface SpeedDialData {
    title: string;
    style?: StyleData;
    searchOptions?: SearchOptions;
    data: ISpeedDialItem[];
    openInNewTab: boolean;
}

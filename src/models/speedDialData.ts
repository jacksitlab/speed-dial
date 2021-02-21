import { ISpeedDialItem } from "./speedDialItem";

export interface StyleData {
    background?: string;
    showForkRibbon?: boolean;
    headerBackground?: string;
    logo?: string;
}

export const DEFAULT_STYLEDATA = {
    background: '#FFFFFF',
    headerBackground: undefined,
    showForkRibbon: true,
    logo: undefined
}
export const DEFAULT_SPEED_DIAL_DATA = {
    title: "",
    style: DEFAULT_STYLEDATA,
    data: [],
    openInNewTab: false
}
export interface SpeedDialData {
    title: string;
    style?: StyleData;
    data: ISpeedDialItem[];
    openInNewTab: boolean;
}

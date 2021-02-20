import { ISpeedDialItem } from "./speedDialItem";

export interface SpeedDialData {
    title: string;
    background: string;
    showForkRibbon: boolean;
    data: ISpeedDialItem[];
}
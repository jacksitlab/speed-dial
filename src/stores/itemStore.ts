import { EventEmitter } from "events";
import dispatcher from "flux/dispatcher";
import { IAction } from "flux/actions";
import SpeedDialItem from "models/speedDialItem";
import ItemActions from "actions/itemActions";
import { DEFAULT_SPEED_DIAL_DATA, DEFAULT_STYLEDATA, SpeedDialData } from "models/speedDialData";

class ItemStore extends EventEmitter {

    private data: SpeedDialData | null;
    private items: SpeedDialItem[] | null;
    public constructor() {
        super();
    }
    public handleAction(action: IAction) {
        switch (action.type) {
            case ItemActions.ACTION_LOADED:
                this.data = action.data;
                console.log(`data loaded: ${JSON.stringify(this.data)}`)
                if (this.data) {
                    this.items = SpeedDialItem.load(this.data.data);
                }
                this.emit("change");
        }
    }
    public getData(): SpeedDialItem[] | null {
        return this.items;
    }
    public getTitle(): string {
        return this.data?.title || DEFAULT_SPEED_DIAL_DATA.title;
    }
    public showForkRibbon(): boolean {
        return this.data?.style?.showForkRibbon || DEFAULT_STYLEDATA.showForkRibbon;
    }
    public getBackground(): string {
        return this.data?.style?.background || DEFAULT_STYLEDATA.background;
    }
    public getHeaderBackground(): string | undefined {
        return this.data?.style?.headerBackground || DEFAULT_STYLEDATA.headerBackground;
    }
    public getHeaderLogo(): string | undefined {
        return this.data?.style?.logo || DEFAULT_STYLEDATA.logo;
    }
    
    public doOpenInNewTab(): boolean {
        return this.data?.openInNewTab || DEFAULT_SPEED_DIAL_DATA.openInNewTab;
    }
}
const itemStore = new ItemStore();
dispatcher.register(itemStore.handleAction.bind(itemStore))
export default itemStore;
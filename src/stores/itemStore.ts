import { EventEmitter } from "events";
import dispatcher from "flux/dispatcher";
import { IAction } from "flux/actions";
import SpeedDialItem from "models/speedDialItem";
import ItemActions from "actions/itemActions";
import { SpeedDialData } from "models/speedDialData";

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
                if (this.data) {
                    this.items = SpeedDialItem.load(this.data.data);
                }
                this.emit("change");
        }
    }
    public getData(): SpeedDialItem[] | null {
        return this.items;
    }
}
const itemStore = new ItemStore();
dispatcher.register(itemStore.handleAction.bind(itemStore))
export default itemStore;
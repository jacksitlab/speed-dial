import { EventEmitter } from "events";
import dispatcher from "flux/dispatcher";
import { IAction } from "flux/actions";
import SpeedDialItem from "models/speedDialItem";
import ItemActions from "actions/itemActions";

class ItemStore extends EventEmitter {

    private data: SpeedDialItem[];
    public constructor() {
        super();
    }
    public handleAction(action: IAction) {
        switch (action.type) {
            case ItemActions.ACTION_LOADED:
                this.data = action.data;
                this.emit("change");
        }
    }
    public getData(): SpeedDialItem[] | null {
        return this.data;
    }
}
const itemStore = new ItemStore();
dispatcher.register(itemStore.handleAction.bind(itemStore))
export default itemStore;
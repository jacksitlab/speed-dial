import dispatcher from "flux/dispatcher";
import SpeedDialItem from "models/speedDialItem";

class ItemActions {
    public static readonly ACTION_LOADED = "DATA_LOADED";


    public static loadData() {

        setTimeout(() => {
            const items = [];
            const subitems: SpeedDialItem[] = [];
            subitems.push(new SpeedDialItem({ id: "3", type: "link", url: "https://github.com/jacksitlab", title: "my github" }));
            subitems.push(new SpeedDialItem({ id: "4", type: "link", url: "https://cloud.jacks-it-lab.de" }));
            items.push(new SpeedDialItem({ id: "1", type: "link", url: "https://github.com" }));
            items.push(new SpeedDialItem({ id: "2", type: "folder", title: "tree1", items: subitems }));
            dispatcher.dispatch({ type: ItemActions.ACTION_LOADED, data: items })
        }, 5000)

    }
}
export default ItemActions;
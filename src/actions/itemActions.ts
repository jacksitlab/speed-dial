import dispatcher from "flux/dispatcher";
import { SpeedDialData } from "models/speedDialData";
import SpeedDialItem from "models/speedDialItem";
import { requestRest } from "services/restService";

class ItemActions {
    public static readonly ACTION_LOADED = "DATA_LOADED";


    public static loadData() {

        requestRest<SpeedDialData>('/assets/content.json', { method: 'GET' }).then((data) => {
            // const subitems: SpeedDialItem[] = [];
            // subitems.push(new SpeedDialItem({ id: "3", type: "link", url: "https://github.com/jacksitlab", title: "my github" }));
            // subitems.push(new SpeedDialItem({ id: "4", type: "link", url: "https://cloud.jacks-it-lab.de" }));
            // items.push(new SpeedDialItem({ id: "1", type: "link", url: "https://github.com" }));
            // items.push(new SpeedDialItem({ id: "2", type: "folder", title: "tree1", items: subitems }));
            dispatcher.dispatch({ type: ItemActions.ACTION_LOADED, data: data.data })

        }).catch((error) => {

            dispatcher.dispatch({ type: ItemActions.ACTION_LOADED, data: null })
        })


    }
}
export default ItemActions;
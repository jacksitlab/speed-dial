import dispatcher from "flux/dispatcher";
import { SpeedDialData } from "models/speedDialData";
import SpeedDialItem from "models/speedDialItem";
import { requestRest } from "services/restService";

class ItemActions {
    public static readonly ACTION_LOADED = "DATA_LOADED";


    public static loadData() {

        requestRest<SpeedDialData>('/content.json', { method: 'GET' }).then((data) => {
            dispatcher.dispatch({ type: ItemActions.ACTION_LOADED, data: data.data })

        }).catch((error) => {

            dispatcher.dispatch({ type: ItemActions.ACTION_LOADED, data: null })
        })


    }
}
export default ItemActions;
import dispatcher from "flux/dispatcher";
import { SpeedDialData, DEFAULT_SPEED_DIAL_DATA } from "models/speedDialData";
import { requestRest } from "services/restService";

class ItemActions {
    public static readonly ACTION_LOADED = "DATA_LOADED";
    
    public static loadData() {

        requestRest<SpeedDialData>('/content.json', { method: 'GET' }).then((data) => {
            dispatcher.dispatch({ type: ItemActions.ACTION_LOADED, data: {...DEFAULT_SPEED_DIAL_DATA,...data.data} })

        }).catch((error) => {

            dispatcher.dispatch({ type: ItemActions.ACTION_LOADED, data: null })
        })


    }
}
export default ItemActions;
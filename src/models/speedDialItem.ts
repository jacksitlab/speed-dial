import { timeStamp } from "console";

export interface ISpeedDialItem {
    id: string;
    url?: string;
    title?: string;
    icon?: string;
    type: "folder" | "link";
    items?: ISpeedDialItem[];
}

class SpeedDialItem {

    public readonly id: string;
    public readonly url: string;
    public readonly title: string;
    public readonly icon: string;
    public readonly type: "folder" | "link";
    public readonly items: SpeedDialItem[];
    public constructor(root: ISpeedDialItem) {
        this.id = root.id;
        this.type = root.type;
        this.items = [];
        this.icon = root.icon || "";
        this.title = root.title || root.url || "";
        if (this.type == "folder") {
            this.url = "";
            if (root.items) {
                root.items.forEach((item) => {
                    this.items.push(new SpeedDialItem(item));
                })
            }
        }
        else {
            this.url = root.url || "";
        }

    }

    public find(path: string): SpeedDialItem | null {
        if (path.length > 0) {
            if (path.startsWith("/")) {
                path = path.substring(1);
            }
            const idx = path.indexOf("/");
            if (idx > 0) {
                const itemKey = path.substring(0, idx);
                for (let i = 0; i < this.items.length; i++) {
                    if (this.items[i].id == itemKey) {
                        return this.items[i].find(path.substring(idx));
                    }
                }
            }
            else {
                if (path == this.id) {
                    return this;
                }
                for (let i = 0; i < this.items.length; i++) {
                    if (this.items[i].id == path) {
                        return this.items[i];
                    }
                }
            }
        }
        return null;
    }
    public static find(items: SpeedDialItem[] | null, id: string): SpeedDialItem[] | null {
        console.log(`try to find item for id ${id}`)
        if (items == null) {
            return null;
        }
        if (id == "0") {
            return items;
        }
        let item: SpeedDialItem | null = null;
        for (let i = 0; i < items.length; i++) {
            item = items[i].find(id);
            if (item != null) {
                break;
            }
        }
        return item ? item.items : null;
    }
}
export default SpeedDialItem;
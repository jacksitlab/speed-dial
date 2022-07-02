export interface ISpeedDialItem {
    id: string;
    url?: string;
    title?: string;
    icon?: string;
    type: "folder" | "link" | "hiddenlink";
    items?: ISpeedDialItem[];
    tags?: string[];
}

class SpeedDialItem {

    public readonly id: string;
    public readonly url: string;
    public readonly title: string;
    public readonly icon: string;
    public readonly type: "folder" | "link" | "hiddenlink";
    public readonly items: SpeedDialItem[];
    public readonly tags: string[];
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
            if (this.url.length > 0 && this.icon == "") {
                const idx = this.url.indexOf("/", 8);
                //this.icon = `${this.url}${this.url.endsWith("/") ? "" : "/"}favicon.ico`
                this.icon = idx > 8 ? (this.url.substring(0, idx) + "/favicon.ico") : (this.url + "/favicon.ico");
            }
        }
        this.tags = root.tags || [];

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

    private searchTag(search: string): boolean {
        return this.tags.filter(e => e.includes(search)).length > 0;
    }
    private search(search: string): SpeedDialItem[] {
        let results: SpeedDialItem[] = [];
        if (this.type == "folder") {
            for (let i = 0; i < this.items.length; i++) {
                results = results.concat(this.items[i].search(search));
            }
        }
        else {
            if (this.title.toLowerCase().includes(search.toLowerCase()) ||
                this.searchTag(search.toLowerCase()) ||
                this.url.toLowerCase().includes(search.toLowerCase())) {
                results.push(this)
            }
        }
        return results;
    }
    public static find(items: SpeedDialItem[] | null, id: string, search = "", showHidden=false): SpeedDialItem[] | null {
        console.log(`try to find item for id ${id} or search ${search}`)
        if (items == null) {
            return null;
        }
        let item: SpeedDialItem | null = null;
        // no search filter
        if (search.length == 0) {
            if (id == "0") {
                return showHidden ? items: items.filter(e => ((e.type == "folder") && e.items.filter(e=>e.type!="hiddenlink").length>0) || e.type=="link");
                //return items.filter(e => e.type=="folder" && e.items.find(e=>e.type!="hiddenlink"));
            }
            for (let i = 0; i < items.length; i++) {
                item = items[i].find(id);
                if (item != null) {
                    break;
                }
            }
            return item ? showHidden? item.items : item.items.filter(e => e.type != "hiddenlink") : null;
        }
        else {
            let ritems: SpeedDialItem[] = [];
            for (let i = 0; i < items.length; i++) {
                const s = items[i].search(search);
                console.log(`search result size=${s.length}`)
                ritems = ritems.concat(s);
            }
            return ritems;
        }

    }
    public static root(): SpeedDialItem {
        return new SpeedDialItem({ id: "0", type: "folder", });
    }
    public static load(items: ISpeedDialItem[]): SpeedDialItem[] {
        const results: SpeedDialItem[] = [];
        for (let i = 0; i < items.length; i++) {
            results.push(new SpeedDialItem(items[i]));
        }
        return results;
    }
}
export default SpeedDialItem;
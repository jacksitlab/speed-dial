function wait<TData>(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export interface ResponseData<T> {
    code: number;
    data: T
}
//export const baseUri = `${window.location.origin}`;
export const baseUri = window.location.origin;//window.location.protocol + '//' + window.location.hostname + (window.location.protocol == "http:" ? "" : "");
export async function requestRestPost<TData>(path: string = '', init: RequestInit = {}, authenticate: boolean = false): Promise<ResponseData<TData | string> | null> {
    init.method = 'POST';
    return requestRest(path, init);
}
export const formEncode = (params: { [key: string]: string | number }) => Object.keys(params).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key].toString());
}).join('&');
export const formEncode2 = (params: any) => Object.keys(params).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key].toString());
}).join('&');

export async function requestRest<TData>(path: string = '', init: RequestInit = {}): Promise<ResponseData<TData>> {

    const uri = path.startsWith("http") ? path : (baseUri) + ('/' + path).replace(/\/{2,}/i, '/');
    init.headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...init.headers
    };
    const result = await fetch(uri, init).catch((error) => {
        throw error;
    });
    if (result) {
        if (result.status >= 200 && result.status < 300) {
            const contentType = result.headers.get("Content-Type") || result.headers.get("content-type");
            const isJson = contentType && contentType.toLowerCase().startsWith("application/json");

            try {
                const data = result.ok && (isJson ? await result.json() : await result.text()) as TData;
                if (data) {
                    return { code: result.status, data: data };
                }
            } catch {
                throw new Error(`invalid response`);
            }

        }
        else {
            const error = await result.text();
            throw new Error(error);
        }
    }
    throw new Error("unknwn response");
}
# speed-dial

## Development

```
npm install
```

```
npm run start
```


## Build 
```
npm run build
```

## Build Docker

```
npm run build
docker build -t speed-dial:latest .
```

## Use docker image

```
docker run -d -v $(pwd)/content.json:/usr/share/nginx/html/content.json speed-dial:latest
```

## content.json

```
{
    "title":"",
    "background":"",
    "data":[]
}
```

|  | |
| ----- | ------------------------------------------------- |
| title |  any string added to header and title of the page |
| backgroun | css color or background-image value, e.g. #1A5FCD or url(https://mysite.com/myimage.png) |
| data | see below DataObject |

DataObject:

```
{
    "id": "2",
    "title": "dir1",
    "icon": "",
    "type": "folder",
    "items": []
}
```
or
```
{
    "id": "1",
    "url": "https://github.com",
    "title": "github",
    "icon": "",
    "type": "link"
}
```

|  | |
| ----- | ------------------------------------------------- |
| id | identifier |
| title | name for the item (if not set and type=="link" url is used |
| icon | background icon for this item (if not set and type=="link" url/favicon.ico is try to be set)
| type | "folder" or "link" |
| items | if type is "folder" an array of subitems |
| url | link to website to go to |


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
docker build -t jacksitlab/speed-dial:latest .
```

## Use docker image

plain docker
```
docker run -d -v $(pwd)/content.json:/usr/share/nginx/html/content.json jacksitlab/speed-dial:latest
```

docker-compose

```
version: '3'

services: 
  server:
    restart: always
    image: jacksitlab/speed-dial
    volumes: 
      - ./config.json:/usr/share/nginx/html/content.json
    ports:
      - 9090:80
```



## content.json

```
{
    "title": "testpage",
    "style": {
        "background": "#1A5FCF",
        "showForkRibbon": true
    },
    "searchOptions":{
        "title":true,
        "url":false,
        "tags":true
    },
    "openInNewTab": true,
    "data":[]
}
```

|  | |
| ----- | ------------------------------------------------- |
| title |  any string added to header and title of the page |
| style.background | css color or background-image value, e.g. #1A5FCD or url(https://mysite.com/myimage.png) |
| style.showForkRibbon | set to false to hide the forkmeongithub-ribbon |
| searchOptions.title | include title of data entry to search |
| searchOptions.url | include url of data entry to search |
| searchOptions.tags | include tags of data entry to search |
| openInNewTab | always open link in new tab |
| data | Array of DataObject |

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
    "type": "link",
    "tags":["git","code","repository"]
 
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
| tags | list of tags for the entry |


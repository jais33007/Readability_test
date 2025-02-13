# interest

## How to use (on Windows)

Double click start.bat

## How to develop

```
$ npm install
$ npm run start
```

## Directory stracture

```
.
├── app
│   ├── assets
│   │   ├── _dist: files generated by webpack
│   │   ├── src
│   │   │   ├── include: common scripts and styles
│   │   │   ├── *.js: page specific scripts and styles
│   │   │   └── ...
│   │   └── static: image, font, etc.
│   └── index.html
├── package-lock.json
├── package.json
└── webpack.config.js
```

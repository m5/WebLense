WebLense
========

## How To:

[✨ Remix on Glitch 🍬](https://glitch.com/edit/#!/remix/weblense)

or

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/clarkhacks/WebLense)

Or

```bash
git clone https://github.com/clarkhacks/WebLense.git
cd WebLense
npm install && npm start
```

_PhantomJS, which is used for generating the screenshots, is installed automagically, but in some [rare cases](https://github.com/Obvious/phantomjs/issues/102) it might fail to and you'll get an `Error: spawn EACCES` error. [Download](http://phantomjs.org/download.html) PhantomJS manually if this occurs._


Then navigate to your Glitch Project Url or http://localhost:3000/

## API

Use `Lense` endpoint for API calls.

|     `GET`     | Required |     Function     |
| ------------- | -------- | ---------------- |
|      url      |    Yes   |  URL To Capture  |
|    width      |     No   |     End Width    |
|    height     |     No   |     End Height   |
|    delay      |     No   | Delay Screenshot |
|     json      |     No   |    Return Json   |


## Examples
__Web__

`https://weblense.glitch.me/lense?url=https://clarkhacks.com/blog&width=1920&height=720`

__jQuery__
```javascript
$.get('https://projectid.glitch.me/lense', { url: 'https://clarkhacks.com' }, function(data) {
    ...
});
```
## Out Of Space?

Glitch Projects are aloud 128mb of space. The WebLense app takes up ~40mb with captured images taking up the rest.

__Options__
 * Clear `sites` Folder
 * Host WebLense somewhere else.

 ---

[💸 Buy Me A Beer 🍺](https://clarkhacks.com/donate)
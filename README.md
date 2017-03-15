### Browser synchronization

For automatic browser synchronization when source code changes you will need to
install the following tools:
* Install [NodeJS](https://nodejs.org/en/download/)
* Install [Browsersync](https://www.browsersync.io/) - run the following command
  in your command line interface (terminal):
  ```
  $ npm install
  ```

Run browser synchronization via one on the following commands:
```
$ node_modules/.bin/browser-sync start --server --files "index.html,*.js"
```
or
```
$ npm start
```

### Changing model
To change loaded model update the value of __src__ attribute in __index.html__
```html
<script src="model.js" type="text/javascript"></script>
```

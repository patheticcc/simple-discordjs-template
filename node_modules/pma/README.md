# pma
Package manager abstraction with a very lame name.

## Usage
```js
var pma = require('pma');
var command = pma('yum', 'install', 'redis'); // => ['yum', '-y', 'install', 'redis']
```

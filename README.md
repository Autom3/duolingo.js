# duolingo.js
A simple node module to query the duolingo API

## Installation

This module is installed via npm:

```
npm install --save duolingo.js
```

## Usage

``` js
var duo = require('duolingo.js');
duo.userByUsername('HelpfulDuo')
    .then(function(user) {
        console.log(user.id);
    })
    .catch(function(error) {
        console.err(error);
    });
```
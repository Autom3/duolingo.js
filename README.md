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
duo('HelpfulDuo')
    .then(function(user) {
        console.log(user.id);
    })
    .catch(function(error) {
        console.error(error);
    });
```

## Documentation

### User

user.id

user.username

user.duoname

user.avatarURL

### Language

user.language.learningCode

user.language.learningString

user.language.level

user.language.skillsLearned

user.language.totalSkills

### Streak

user.streak.currentAmount

user.streak.extendedToday

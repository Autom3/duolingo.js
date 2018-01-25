var duo = require('./index.js');
duo.userByUsername('HelpfulDuo')
    .then(function(user) {
        if (user.id === 98212660) {
            console.log('Test passed successfully!');
        } else {
            console.log('User id is wrong: ' + user.id);
        }
    })
    .catch(function(error) {
        console.err(error);
    });
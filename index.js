var request = require('request-promise-native');

var baseUrl = 'https://www.duolingo.com';

function requestDuolingo(endpoint) {
    return request({
        uri: baseUrl + endpoint,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    });
}

function requestUserByUsername(username) {
    return requestDuolingo('/users/' + username);
}
function requestUserById(id) {
    return requestDuolingo('/2017-06-30/users/' + id);
}
// Need to be logged in for this, so it seems
// function requestSubscriptions(id) {
    // return requestDuolingo('/2017-06-30/users/' + id + '/subscriptions');
// }
// function requestSubscribers(id) {
    // return requestDuolingo('/2017-06-30/users/' + id + '/subscribers');
// }

module.exports = {
    userByUsername: requestUserByUsername,
    userById: requestUserById,
    // subscriptions: requestSubscriptions,
    // subscribers: requestSubscribers
}
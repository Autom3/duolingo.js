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

function getSmallUser(id) {
    return requestDuolingo('/2017-06-30/users/' + id);
}
function getLargeUser(username) {
    return requestDuolingo('/users/' + username);
}

function User(rawSmallUser, rawLargeUser) {
    this._rawSmallUser = rawSmallUser;
    this._rawLargeUser = rawLargeUser;
    
    this.id = rawLargeUser.id;
    this.username = rawLargeUser.username;
    this.duoname = this.username;
    this.avatarURL = 'https:' + rawLargeUser.avatar + '/xlarge';
    
    this.language = {};
    this.language.learningCode = rawLargeUser['learning_language'];
    this.language.learningString = rawLargeUser['learning_language_string'];
    this.language.learning = rawLargeUser['language_data'][this.language.learningCode];
    this.language.level = this.language.learning.level;
    this.language.skillsLearned = this.language.learning['num_skills_learned'];
    this.language.totalSkills = this.language.learning.skills.length;
    
    this.streak = {};
    this.streak.currentAmount = this.language.learning.streak;
    this.streak.extendedToday = rawLargeUser['streak_extended_today'];
	
	/*this.getName = function () {
		return this.name;
	};*/
}

module.exports = function (identification) {
    return new Promise((resolve, reject) => {
        let rawSmallUser = null;
        let rawLargeUser = null;
    
        if (typeof(identification) === 'number') {
            getSmallUser(identification)
                .then((rawSmallUser) => {
                    getLargeUser(rawSmallUser.username)
                        .then((rawLargeUser) => {
                            resolve(new User(rawSmallUser, rawLargeUser));
                        })
                        .catch((error) => {
                            reject(error);
                        });
                })
                .catch((error) => {
                    reject(error);
                });
        } else {
            getLargeUser(identification)
                .then((rawLargeUser) => {
                    // getSmallUser(rawLargeUser.id)
                        // .then((rawSmallUser) => {
                            // resolve(new User(rawSmallUser, rawLargeUser));
                        // })
                        // .catch((error) => {
                            // reject(error);
                        // });
                    resolve(new User(null, rawLargeUser));
                })
                .catch((error) => {
                    reject(error);
                });
        }
    });
}

/***************************
_achievements
    streak: Wildfire
    completion: Champion
    spending: Big Spender
    items: /
    time: Overtime
    clubs: /
    social: Friendly
    gold_skills: Shiny
    xp: Overachiever
    perfect: Sharpshooter
hasPlus
***************************/
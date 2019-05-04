const duo = require('./index.js');

let firstStartTime = new Date();
duo('HelpfulDuo')
    .then(function(user) {
        let firstEndTime = new Date();
        if (user.id === 98212660) {
            console.log('User id is correct');
        } else {
            console.log('User id is wrong: ' + user.id);
        }
        if (user.username === 'HelpfulDuo') {
            console.log('User username is correct');
        } else {
            console.log('User username is wrong: ' + user.username);
        }
        if (user.duoname === 'HelpfulDuo') {
            console.log('User duoname is correct');
        } else {
            console.log('User duoname is wrong: ' + user.duoname);
        }
        if (user.avatarURL === 'https://duolingo-images.s3.amazonaws.com/avatars/98212660/qA51lqRF1i/xlarge') {
            console.log('User avatarURL is correct');
        } else {
            console.log('User avatarURL is wrong: ' + user.avatarURL);
        }
        if (user.language.learningCode === 'fr') {
            console.log('User language learningCode is correct');
        } else {
            console.log('User language learningCode is wrong: ' + user.language.learningCode);
        }
        if (user.language.learningString === 'French') {
            console.log('User language learningString is correct');
        } else {
            console.log('User language learningString is wrong: ' + user.language.learningString);
        }
        if (user.language.level === 1) {
            console.log('User language level is correct');
        } else {
            console.log('User language level is wrong: ' + user.language.level);
        }
        if (user.language.skillsLearned === 1) {
            console.log('User language skillsLearned is correct');
        } else {
            console.log('User language skillsLearned is wrong: ' + user.language.skillsLearned);
        }
        if (user.language.totalSkills === 78) {
            console.log('User language totalSkills is correct');
        } else {
            console.log('User language totalSkills is wrong: ' + user.language.totalSkills);
        }
        if (user.streak.currentAmount === 0) {
            console.log('User streak.currentAmount is correct');
        } else {
            console.log('User streak.currentAmount is wrong: ' + user.streak.currentAmount);
        }
        if (user.streak.extendedToday === false) {
            console.log('User streak extendedToday is correct');
        } else {
            console.log('User streak extendedToday is wrong: ' + user.streak.extendedToday);
        }
        if (user.achievements.bigSpender.maxedOut === false) {
            console.log('User achievements bigSpender maxedOut is correct');
        } else {
            console.log('User achievements bigSpender maxedOut is wrong: ' + user.achievements.bigSpender.maxedOut);
        }
        if (user.achievements.shiny.tier === 2) {
            console.log('User achievements shiny tier is correct');
        } else {
            console.log('User achievements shiny tier is wrong: ' + user.achievements.shiny.tier);
        }
        let secondStartTime = new Date();
        duo('HelpfulDuo').then(function(user) {
            let secondEndTime = new Date();
            let firstDelta = firstEndTime.getTime() - firstStartTime.getTime();
            let secondDelta = secondEndTime.getTime() - secondStartTime.getTime();
            console.log('Timing before cache: ' + firstDelta + 'ms');
            console.log('Timing after cache: ' + secondDelta + 'ms');
            console.log('Delta timgins check ' + (secondDelta < firstDelta ? 'passed' : 'failed'));
        });
    })
    .catch(function(error) {
        console.error(error);
    });

var duo = require('./index.js');
duo('HelpfulDuo')
    .then(function(user) {
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
    })
    .catch(function(error) {
        console.error(error);
    });
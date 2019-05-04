const request = require('request-promise-native')

const achievementTranslation = {
  streak: 'wildfire',
  completion: 'champion',
  spending: 'bigSpender',
  time: 'overtime',
  social: 'friendly',
  gold_skills: 'shiny',
  xp: 'overachiever',
  perfect: 'sharpshooter'
}
const achievementDisplay = {
  streak: 'Wildfire',
  completion: 'Champion',
  spending: 'Big Spender',
  time: 'Overtime',
  social: 'Friendly',
  gold_skills: 'Shiny',
  xp: 'Overachiever',
  perfect: 'Sharpshooter'
}
const baseUrl = 'https://www.duolingo.com'

let userCache = {
  byNumber: {},
  byName: {}
}

function lookupInCache (identification) {
  if (typeof (identification) === 'number') {
    return userCache.byNumber[identification]
  } else {
    return userCache.byName[identification]
  }
}

function addUserToCache (user) {
  userCache.byNumber[user.id] = user
  userCache.byName[user.username] = user
}

function requestDuolingo (endpoint) {
  return request({
    uri: baseUrl + endpoint,
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  })
}

function arrayToObject (array, keyField) {
  return array.reduce((obj, item) => {
    obj[item[keyField]] = item
    return obj
  }, {})
}

function getSmallUser (id) {
  return requestDuolingo('/2017-06-30/users/' + id)
}
function getLargeUser (username) {
  return requestDuolingo('/users/' + username)
}

function User (rawSmallUser, rawLargeUser) {
  this._rawSmallUser = rawSmallUser
  this._rawLargeUser = rawLargeUser

  this.id = rawLargeUser.id
  this.username = rawLargeUser.username
  this.duoname = this.username
  this.avatarURL = 'https:' + rawLargeUser.avatar + '/xlarge'
  this.originalLanguage = rawSmallUser.fromLanguage
  this.hasPlus = rawSmallUser.hasPlus

  this.courses = arrayToObject(rawSmallUser.courses, 'id')
  this.courseId = rawSmallUser.currentCourseId
  this.course = this.courses[this.courseId]

  this.language = {}
  this.language.learningCode = rawLargeUser['learning_language']
  this.language.learningCodeUniversal = rawSmallUser.learningLanguage
  this.language.learningString = rawLargeUser['learning_language_string']
  this.language.learning = rawLargeUser['language_data'][this.language.learningCode]
  this.language.level = this.language.learning.level
  this.language.nextLevel = this.language.learning['next_level']
  this.language.levelLeft = this.language.learning['level_left']
  this.language.levelProgress = this.language.learning['level_progress']
  this.language.levelPercent = this.language.learning['level_percent']
  this.language.levelXP = this.language.learning['level_points']
  this.language.totalXP = this.language.learning.points
  this.language.skillsLearned = this.language.learning['num_skills_learned']
  this.language.totalSkills = this.language.learning.skills.length
  this.language.crowns = this.course.crowns

  this.streak = {}
  this.streak.currentAmount = this.language.learning.streak
  this.streak.extendedToday = rawLargeUser['streak_extended_today']

  this.achievements = {}
  rawSmallUser['_achievements'].forEach(achievement => {
    let translated = achievementTranslation[achievement.name]
    if (!translated) {
      return
    }
    this.achievements[translated] = {
      tier: achievement.tier,
      count: achievement.count,
      tierCounts: achievement.tierCounts,
      name: achievement.name,
      displayName: achievementDisplay[achievement.name],
      nextTierCount: achievement.tierCounts[achievement.tier - 1],
      maxedOut: achievement.count >= achievement.tierCounts[achievement.tierCounts.length - 1]
    }
  })

  addUserToCache(this)
}

module.exports = function (identification) {
  let user = lookupInCache(identification)
  if (user) {
    return new Promise((resolve, reject) => resolve(user))
  }
  return new Promise((resolve, reject) => {
    let rawSmallUser = null
    let rawLargeUser = null

    if (typeof (identification) === 'number') {
      getSmallUser(identification)
        .then((rawSmallUser) => {
          getLargeUser(rawSmallUser.username)
            .then((rawLargeUser) => {
              resolve(new User(rawSmallUser, rawLargeUser))
            })
            .catch((error) => {
              reject(error)
            })
        })
        .catch((error) => {
          reject(error)
        })
    } else {
      getLargeUser(identification)
        .then((rawLargeUser) => {
          getSmallUser(rawLargeUser.id)
            .then((rawSmallUser) => {
              resolve(new User(rawSmallUser, rawLargeUser))
            })
            .catch((error) => {
              reject(error)
            })
        })
        .catch((error) => {
          reject(error)
        })
    }
  })
}

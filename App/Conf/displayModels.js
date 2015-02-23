/**
 * Created by stevezheng on 15/1/13.
 */
var User = require('../Lib/AVModel/UserModel');
var Game = require('../Lib/AVModel/GameModel');
var Team = require('../Lib/AVModel/TeamModel');

module.exports = {
  'User': {
    displayName: '用户'
    , model: User
  },
  'Game': {
    displayName: '比赛'
    , model: Game
  },
  'Team': {
    displayName: '球队'
    , model: Team
  },
};

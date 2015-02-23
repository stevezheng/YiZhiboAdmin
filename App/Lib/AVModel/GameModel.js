var Game = AV.Object.extend('Game', {
  displayFields: [
    {
      field: 'game_time'
      , display: '比赛时间'
      , require: true
      , show: true
      , type: 'datetime'
    },
    {
      field: 'home_team'
      , display: '主队'
      , require: true
      , show: true
    },
    {
      field: 'guest_team'
      , display: '客队'
      , require: true
      , show: true
    },
    {field: 'createdAt', display: '创建时间'},
    {field: 'updatedAt', display: '更新时间'},
  ]
});

module.exports = Game;

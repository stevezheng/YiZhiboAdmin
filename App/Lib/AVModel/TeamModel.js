var Team = AV.Object.extend('Team', {
  displayFields: [
    {
      field: 'name'
      , display: '队名'
      , require: true
      , show: true
    }
  ]
});

module.exports = Team;

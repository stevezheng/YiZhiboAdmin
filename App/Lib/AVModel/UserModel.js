/**
 * Created by stevezheng on 15/1/13.
 */
var User = AV.User.extend({
  displayFields: [
    {field: 'username',
      display: '用户名称',
      require: true,
      show: true},
    {field: 'email', display: '邮箱', require: true, show: true},
    {field: 'password', display: '密码', require: true, show: true, type: 'password'},
    {field: 'createdAt', display: '创建时间'},
    {field: 'updatedAt', display: '更新时间'},
  ],
  login: function(username, password, cb) {
    AV.User.logIn(username, password, {
      success: function(user) {
        cb(user);
      },

      error: function(error) {
        cb(error);
      }
    })
  }
});

module.exports = User;

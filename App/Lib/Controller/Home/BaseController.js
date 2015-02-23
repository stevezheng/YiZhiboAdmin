/**
 * 项目里的Controller基类
 * 这里做一些通用的处理逻辑，其他Controller继承该类
 * @param  {[type]} 
 * @return {[type]}         [description]
 */
module.exports = Controller(function(){
  'use strict';
  return {
    init: function(http){
      this.super("init", http);
    },
    __before: function(){
      var self = this;
      //登录页面不检测用户是否已经登录
      if(this.http.action === 'login'){
        return;
      }
      return this.session("admin").then(function(admin){
        //用户信息为空
        if(isEmpty(admin)){
          //ajax访问返回一个json的错误信息
          if(self.isAjax()){
            return self.error(403, "用户未登录，不能访问")
          }else{
            //跳转到登录页
            return self.redirect("/index/login");
          }
        }else{
          //用户已经登录
          self.admin = admin;
          self.assign("admin", admin);
        }
      })
    }
  }
});
/**
 * controller
 * @return 
 */
var UserModel = require('../../AVModel/UserModel');
var displayModels = require('../../../Conf/displayModels');
var utils = require('../../Extend/utils');
var fields = require('../../../Conf/fields');
module.exports = Controller("Home/BaseController", function(){
  "use strict";
  return {
    indexAction: function(){
      //render View/Home/index_index.html file
      this.redirect('/index/manage?model=User&type=list');
    },

    loginAction: function() {
      var self = this;
      self.assign('title', '登陆系统');

      if (self.isGet()) {
        self.assign('error', false);
        self.display();
      }

      if (self.isPost()) {
        var username = self.post('username');
        var password = self.post('password');
        var userModel = new UserModel();
        userModel.login(username, password, function(res) {
          if (res.id) {
            self.session('admin', res);
            return self.redirect('/index/index');
          } else {
            self.assign('error', '用户名密码不正确');
            return self.display();
          }
        });
      }
    },

    logoutAction: function() {
      var self = this;
      self.session().then(function() {
        return self.redirect('/index/login');
      })
    },
    
    manageAction: function() {
      var self = this;
      //Model和操作类型
      var _model = self.param('model');
      var type = self.param('type');

      //边栏链接
      var links = [];
      var linksName = [];
      for (var displayModel in displayModels) {
        links.push(displayModels[displayModel]);
        linksName.push(displayModel);
      }

      //标题
      var title = displayModels[_model].displayName
        + fields.common[type]
        + '管理';
      var _modelName =  displayModels[_model].displayName;
      var Model = displayModels[_model].model;

      self.assign('title', title);
      self.assign('result', false);
      self.assign('_model', _model);
      self.assign('_modelName', _modelName);
      self.assign('links', links);
      self.assign('linksName', linksName);

      if (self.isGet()) {

        if (type == 'list') {
          var model = new Model();
          var displayFields = model.displayFields;
          self.assign('displayFields', displayFields);
          model.page({page: 0, row: 20},function(res) {
            self.assign('res', res);
            self.display();
          })
        }

        if (type == 'del') {
          var id = self.get('id');
          var model = new Model();
          var displayFields = model.displayFields;
          self.assign('displayFields', displayFields);

          model.id = id;

          model.destroy({
            success: function() {
              model.page({page: 0, row: 20},function(res) {
                self.assign('res', res);
                self.display();
              })
            },
            error: function() {
              model.page({page: 0, row: 20},function(res) {
                self.assign('result', '删除失败');
                self.assign('res', res);
                self.display();
              })
            }
          })
        }

        if (type == 'add') {
          var model = new Model();
          var displayFields = model.displayFields;

          self.assign('displayFields', displayFields);
          self.display('home:index:add');
        }

        if (type == 'edit') {
          var model = new Model();
          var displayFields = model.displayFields;
          var id = self.get('id');

          model.id = id;
          var query = new AV.Query(model.className);
          query.get(id, {
            success: function(res) {
              self.assign('displayFields', displayFields);
              self.assign('res', res);
              self.assign('config', {av_id: C('av_id'), av_key: C('av_key')});
              self.display('home:index:edit');
            },
            error: function() {
              self.error(100, '');
            }
          })
        }
      }
      
      if (self.isPost()) {
        //Model和操作类型
        if (type == 'add') {
          var model = new Model();
          var displayFields = model.displayFields;
          self.assign('displayFields', displayFields);

          var data = self.http.post;
          delete data.type;
          delete data.model;

          var relations = displayModels[_model].relations;

          if (relations) {
            for (var i = 0; i < relations.length; i++) {
              var relation = relations[i];
              var r = relation.charAt(0).toLowerCase() + relation.slice(1, relation.length);
              var relationModel = displayModels[relation].model;
              var relationModelInstance = new relationModel();
              relationModelInstance.id = data[r];
              data[r] = relationModelInstance;
            }
          }

          data = utils.format_datetime(data, displayFields);

          model.save(data, {
            success: function() {
              self.assign('result', '新增成功');
              return self.display('home:index:add');
            },
            error: function(error) {
              self.assign('result', '新增失败');
              return self.display('home:index:add');
            }
          });
        }

        if (type == 'edit') {
          var id = self.post('id');
          var model = new Model();
          var displayFields = model.displayFields;
          self.assign('displayFields', displayFields);

          var data = self.http.post;
          delete data.type;
          delete data.model;

          var relations = displayModels[_model].relations;

          if (relations) {
            for (var i = 0; i < relations.length; i++) {
              var relation = relations[i];
              var r = relation.charAt(0).toLowerCase() + relation.slice(1, relation.length);
              var relationModel = displayModels[relation].model;
              var relationModelInstance = new relationModel();
              relationModelInstance.id = data[r];
              data[r] = relationModelInstance;
            }
          }
          data = utils.format_datetime(data, displayFields);

          for(var key in data){
            model.set(key, data[key]);
          }
          model.set('id', id);
          model.save(null, {
            success: function() {
              return self.redirect('/index/manage?model=' + _model + '&type=list');
            },
            error: function(error) {
              return self.redirect('/index/manage?model=' + _model + '&type=list');
            }
          });
        }
      }
    },

    relationAction: function() {
      var self = this;
      self.assign('title', '');
    
      if (self.isGet()) {
        var _model = self.param('model');
        var Model = displayModels[_model].model;

        var model = new Model();
        var query = new AV.Query(model.className);
        query.find({
          success: function(data) {
            self.success(data);
          }
        })
      }
      
      if (self.isPost()) {}
    },
    
    testAction: function() {
      var self = this;
      self.assign('title', 'test');

      if (self.isGet()) {
        var Province = displayModels['Province']['model'];
        var City = displayModels['City']['model'];

        var province = new Province();
        province.set('name', '福建');

        var city = new City();
        city.set('province', province);
        city.set('name', '厦门');

        city.save({
          success: function(res) {
            self.success(res);
          },

          error: function (error) {
            self.error(500, error);
          }
        });
      }

      if (self.isPost()) {}
    }
  };
});
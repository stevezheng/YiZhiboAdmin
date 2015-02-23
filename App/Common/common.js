//这里定义一些全局通用的函数，该文件会被自动加载
var AV = require('avoscloud-sdk').AV;
var _ = require('avoscloud-sdk')._;
var moment = require('moment');
AV.initialize(C('av_id'), C('av_key'), C('av_master'));

global.AV = AV;

_.extend(AV.Object.prototype, {
  page : function(options, cb) {
    var orderBy = options.orderBy || 'createdAt';
    var orderType = options.Type || 'des';
    var page = options.page || 0;
    var row = options.row || 10;
    var query = new AV.Query(this.className);

    if (orderType == 'des') {
      query.descending(orderBy);
    } else if (orderType == 'asc') {
      query.ascending(orderBy);
    }
    query.limit(row);
    query.skip(page * row);
    if (this.include) {
        query.include(this.include);
    }
    query.find({
      success: function (res) {
        if (res.length > 0) {
          res.forEach(function(r) {
            r.createdAt = moment(r.createdAt).format('YYYY-MM-DD HH:mm:ss');
            r.updatedAt = moment(r.createdAt).format('YYYY-MM-DD HH:mm:ss');
          });
        }
        cb(res);
      },
      error: function (error) {
        cb(error);
      }
    })
  }
});

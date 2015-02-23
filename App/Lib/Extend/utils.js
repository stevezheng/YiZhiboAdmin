var _ = require('underscore');
var moment = require('moment');
module.exports = {
  /**
   * 格式化新增和编辑的数据中的日期数据
   * @param data 需要格式化的数据
   * @param display_fields model的字段信息
   */
  format_datetime: function(data, display_fields) {
    var _display_fields = _.where(display_fields, {type: 'datetime'});
    _.each(_display_fields, function(_display_field) {
      var val = data[_display_field.field];
      data[_display_field.field] = new Date(val);
    });

    return data;
  }
};

/**
 * 初始化房屋管理详情对话框
 */
var TbHouseInfoDlg = {
    tbHouseInfoData : {}
};

/**
 * 清除数据
 */
TbHouseInfoDlg.clearData = function() {
    this.tbHouseInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
TbHouseInfoDlg.set = function(key, val) {
    this.tbHouseInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
TbHouseInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
TbHouseInfoDlg.close = function() {
    parent.layer.close(window.parent.TbHouse.layerIndex);
}

/**
 * 收集数据
 */
TbHouseInfoDlg.collectData = function() {
    this
    .set('id')
    .set('houseUser')
    .set('houseAddress')
    .set('houseDate')
    .set('houseDesc');
}

/**
 * 提交添加
 */
TbHouseInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/tbHouse/add", function(data){
        Feng.success("添加成功!");
        window.parent.TbHouse.table.refresh();
        TbHouseInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.tbHouseInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
TbHouseInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/tbHouse/update", function(data){
        Feng.success("修改成功!");
        window.parent.TbHouse.table.refresh();
        TbHouseInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.tbHouseInfoData);
    ajax.start();
}

$(function() {

});

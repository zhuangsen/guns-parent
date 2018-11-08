/**
 * 房屋管理管理初始化
 */
var TbHouse = {
    id: "TbHouseTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
TbHouse.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
        {title: '房屋编号', field: 'id', visible: true, align: 'center', valign: 'middle'},
        {title: '业主名称', field: 'houseUser', visible: true, align: 'center', valign: 'middle'},
        {title: '房屋地址', field: 'houseAddress', visible: true, align: 'center', valign: 'middle'},
        {title: '房屋交接时间', field: 'houseDate', visible: true, align: 'center', valign: 'middle'},
        {title: '房屋描述', field: 'houseDesc', visible: true, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
TbHouse.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        TbHouse.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加房屋管理
 */
TbHouse.openAddTbHouse = function () {
    var index = layer.open({
        type: 2,
        title: '添加房屋管理',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/tbHouse/tbHouse_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看房屋管理详情
 */
TbHouse.openTbHouseDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '房屋管理详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/tbHouse/tbHouse_update/' + TbHouse.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除房屋管理
 */
TbHouse.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/tbHouse/delete", function (data) {
            Feng.success("删除成功!");
            TbHouse.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("tbHouseId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询房屋管理列表
 */
TbHouse.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    TbHouse.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = TbHouse.initColumn();
    var table = new BSTable(TbHouse.id, "/tbHouse/list", defaultColunms);
    table.setPaginationType("client");
    TbHouse.table = table.init();
});

package com.stylefeng.guns.modular.housemanager.controller;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.stylefeng.guns.core.base.controller.BaseController;
import com.stylefeng.guns.core.util.ToolUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;
import com.stylefeng.guns.core.log.LogObjectHolder;
import org.springframework.web.bind.annotation.RequestParam;
import com.stylefeng.guns.modular.system.model.TbHouse;
import com.stylefeng.guns.modular.housemanager.service.ITbHouseService;

/**
 * 房屋管理控制器
 *
 * @author fengshuonan
 * @Date 2018-11-08 15:10:23
 */
@Controller
@RequestMapping("/tbHouse")
public class TbHouseController extends BaseController {

    private String PREFIX = "/housemanager/tbHouse/";

    @Autowired
    private ITbHouseService tbHouseService;

    /**
     * 跳转到房屋管理首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "tbHouse.html";
    }

    /**
     * 跳转到添加房屋管理
     */
    @RequestMapping("/tbHouse_add")
    public String tbHouseAdd() {
        return PREFIX + "tbHouse_add.html";
    }

    /**
     * 跳转到修改房屋管理
     */
    @RequestMapping("/tbHouse_update/{tbHouseId}")
    public String tbHouseUpdate(@PathVariable Integer tbHouseId, Model model) {
        TbHouse tbHouse = tbHouseService.selectById(tbHouseId);
        model.addAttribute("item",tbHouse);
        LogObjectHolder.me().set(tbHouse);
        return PREFIX + "tbHouse_edit.html";
    }

    /**
     * 获取房屋管理列表
     */
    @RequestMapping(value = "/list")
    @ResponseBody
    public Object list(String condition) {
        // 判断condition是否有值
        if(ToolUtil.isEmpty(condition)){
            //如果没有值，则表示查询全部
            return tbHouseService.selectList(null);
        }else{
            // 如果有值，则认为是按业务名称进行模糊查询
            EntityWrapper<TbHouse> entityWrapper = new EntityWrapper<>();
            Wrapper<TbHouse> wrapper = entityWrapper.like("house_user", condition);
            return tbHouseService.selectList(wrapper);
        }
    }

    /**
     * 新增房屋管理
     */
    @RequestMapping(value = "/add")
    @ResponseBody
    public Object add(TbHouse tbHouse) {
        tbHouseService.insert(tbHouse);
        return SUCCESS_TIP;
    }

    /**
     * 删除房屋管理
     */
    @RequestMapping(value = "/delete")
    @ResponseBody
    public Object delete(@RequestParam Integer tbHouseId) {
        tbHouseService.deleteById(tbHouseId);
        return SUCCESS_TIP;
    }

    /**
     * 修改房屋管理
     */
    @RequestMapping(value = "/update")
    @ResponseBody
    public Object update(TbHouse tbHouse) {
        tbHouseService.updateById(tbHouse);
        return SUCCESS_TIP;
    }

    /**
     * 房屋管理详情
     */
    @RequestMapping(value = "/detail/{tbHouseId}")
    @ResponseBody
    public Object detail(@PathVariable("tbHouseId") Integer tbHouseId) {
        return tbHouseService.selectById(tbHouseId);
    }
}

package cn.geobeans.controller;


import cn.geobeans.bean.Power;
import cn.geobeans.service.PowerService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

/**
 * Created by Administrator on 2016/10/26.
 */
@Controller
@RequestMapping("/power")
public class PowerController {

    @Autowired
    PowerService service;

    ObjectMapper mapper = new ObjectMapper();
    /*
       权限信息查询
     */
    @RequestMapping("/queryPowerData")
    public void  queryPowerData(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,String powerName,String powerAction,
                            int rows, int page,String sort,String order) throws IOException {
        //String departmentName = new String(httpServletRequest.getParameter("departmentName").getBytes("ISO8859-1"), "UTF-8");
        Map<String, Object> map = new HashMap<String, Object>();
        Map<String, Object> resultMap = null;
        List sorts = new ArrayList();
        List orders = new ArrayList();
        if(sort==null){

            sorts.add("powerName");
            orders.add("ASC");
        }
        else{
             sorts = Arrays.asList(sort.split(","));
             orders = Arrays.asList(order.split(","));
        }
        map.put("startNum", rows * (page - 1));
        map.put("pageSize",rows);
        map.put("sorts",sorts);
        map.put("orders",orders);
        map.put("powerName",powerName);
        map.put("powerAction",powerAction);
        resultMap = service.queryPowerData(map);

        httpServletResponse.getWriter().write(mapper.writeValueAsString(resultMap));

    }
    /*
       权限信息添加
     */
    @RequestMapping("/addPowerData")
    public void addPowerData (HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,Power power)throws IOException{
        httpServletRequest.setCharacterEncoding("UTF-8");
        httpServletResponse.setCharacterEncoding("UTF-8");
        Map map = new HashMap();
        System.out.println(power);
        int flag = service.addPowerData(power);
        httpServletResponse.getWriter().write(mapper.writeValueAsString(flag));
    }
    /*
    修改权限信息
     */
    @RequestMapping("/updatePowerData")
    public void updatePowerData (HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,Power power)throws IOException{
        httpServletRequest.setCharacterEncoding("UTF-8");
        httpServletResponse.setCharacterEncoding("UTF-8");
        Map map = new HashMap();
        int flag = service.updatePowerData(power);
        httpServletResponse.getWriter().write(mapper.writeValueAsString(flag));
    }
    /*
    删除权限信息（可批量）
     */
    @RequestMapping("/removePowerData")
    public void removePowerData (HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,String powerids,int count)throws IOException{
        httpServletRequest.setCharacterEncoding("UTF-8");
        httpServletResponse.setCharacterEncoding("UTF-8");

        List<Integer> list = new ArrayList();
        String[] ids = powerids.split(",");
        for(int i=0; i<ids.length; i++){
            list.add(Integer.parseInt(ids[i]));
        }
        String msg = "成功删除"+count+"条数据！" ;

        if(service.removePowerData(list)==0){
            msg = "错误！！！";
        }

        httpServletResponse.getWriter().write(mapper.writeValueAsString(msg));
    }

}

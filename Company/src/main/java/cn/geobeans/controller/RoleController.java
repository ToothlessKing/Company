package cn.geobeans.controller;

import cn.geobeans.bean.Role;
import cn.geobeans.service.RoleService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

/**
 * Created by Administrator on 2016/10/31.
 */
@Controller
@RequestMapping("/role")
public class RoleController {
    @Autowired
    RoleService service;

    ObjectMapper mapper = new ObjectMapper();
    /*
       角色信息查询
     */
    @RequestMapping("/queryRoleData")
    public void  queryRoleData(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,String roleName,String roleId,
                                int rows, int page,String sort,String order) throws IOException {
        Map<String, Object> map = new HashMap<String, Object>();
        Map<String, Object> resultMap = null;
        List sorts = new ArrayList();
        List orders = new ArrayList();
        if(sort==null){

            sorts.add("roleId");
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
        map.put("roleName",roleName);
        map.put("roleId",roleId);
        resultMap = service.queryRoleData(map);

        httpServletResponse.getWriter().write(mapper.writeValueAsString(resultMap));

    }
    /*
       角色信息添加
     */
    @RequestMapping("/addRoleData")
    public void addRoleData (HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,Role role)throws IOException{
        httpServletRequest.setCharacterEncoding("UTF-8");
        httpServletResponse.setCharacterEncoding("UTF-8");
        Map map = new HashMap();
        System.out.println(role);
        int flag = service.addRoleData(role);
        httpServletResponse.getWriter().write(mapper.writeValueAsString(flag));
    }
    /*
    角色权限信息
     */
    @RequestMapping("/updateRoleData")
    public void updateRoleData (HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,Role role)throws IOException{
        httpServletRequest.setCharacterEncoding("UTF-8");
        httpServletResponse.setCharacterEncoding("UTF-8");
        Map map = new HashMap();
        int flag = service.updateRoleData(role);
        httpServletResponse.getWriter().write(mapper.writeValueAsString(flag));
    }
    /*
    删除角色信息（可批量）
     */
    @RequestMapping("/removeRoleData")
    public void removeRoleData (HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,String roleids,int count)throws IOException{
        httpServletRequest.setCharacterEncoding("UTF-8");
        httpServletResponse.setCharacterEncoding("UTF-8");

        List<Integer> list = new ArrayList();
        String[] ids = roleids.split(",");
        for(int i=0; i<ids.length; i++){
            list.add(Integer.parseInt(ids[i]));
        }
        String msg = "成功删除"+count+"条数据！" ;

        if(service.removeRoleData(list) == 0){
            msg = "错误！！！";
        }

        httpServletResponse.getWriter().write(mapper.writeValueAsString(msg));
    }
    @RequestMapping("/queryAll")
    public void queryAll(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws IOException{
        httpServletRequest.setCharacterEncoding("UTF-8");
        httpServletResponse.setCharacterEncoding("UTF-8");
        List<Role> list = service.getAll();
        httpServletResponse.getWriter().write(mapper.writeValueAsString(list));
    }





}

package cn.geobeans.controller;


import cn.geobeans.bean.Department;
import cn.geobeans.service.DepartmentService;
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
@RequestMapping("/department")
public class DepartmentController {
    @Autowired
    DepartmentService service;

    ObjectMapper mapper = new ObjectMapper();

    /*
       部门信息查询
       @param departmentNo 部门号
       @param departmentName 部门名
       @param rows 行数
       @parame page 页数
       @return json数据
     */
    @RequestMapping("/queryDepartmentData")
    public void queryDepartmentData(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, String departmentNo, String departmentName,String companyId,
                                    int rows, int page, String sort, String order) throws IOException {
        //String departmentName = new String(httpServletRequest.getParameter("departmentName").getBytes("ISO8859-1"), "UTF-8");
        departmentName = java.net.URLDecoder.decode(departmentName, "UTF-8");
        Map<String, Object> map = new HashMap<String, Object>();
        Map<String, Object> resultMap = null;
        List sorts = new ArrayList();
        List orders = new ArrayList();
        if (sort == null) {
            sorts.add("departmentId");
            orders.add("ASC");
        } else {
            sorts = Arrays.asList(sort.split(","));
            orders = Arrays.asList(order.split(","));
        }
        System.out.println(departmentNo + " : " + departmentName + " : " + sort);
        map.put("startNum", rows * (page - 1));
        map.put("pageSize", rows);
        map.put("sorts", sorts);
        map.put("orders", orders);
        map.put("department_id", departmentNo);
        map.put("department_name", departmentName);
        map.put("companyId",companyId);
        resultMap = service.queryDepartmentData(map);

        httpServletResponse.getWriter().write(mapper.writeValueAsString(resultMap));

    }

    /*
       部门信息添加
       @param departmentName 部门名
       @param department_describe 部门说明
       @return int
     */
    @RequestMapping("/addDepartmentData")
    public void addDepartmentData(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Department department) throws IOException {
        httpServletRequest.setCharacterEncoding("UTF-8");
        httpServletResponse.setCharacterEncoding("UTF-8");
        Map map = new HashMap();
        System.out.println(department);
        int flag = service.addDepartmentData(department);
        httpServletResponse.getWriter().write(mapper.writeValueAsString(flag));
    }

    /*
    修改部门信息
     */
    @RequestMapping("/updateDepartmentData")
    public void updateDepartmentData(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Department department) throws IOException {
        httpServletRequest.setCharacterEncoding("UTF-8");
        httpServletResponse.setCharacterEncoding("UTF-8");
        Map map = new HashMap();
        int flag = service.updateDepartmentData(department);
        httpServletResponse.getWriter().write(mapper.writeValueAsString(flag));
    }

    /*
    删除部门信息（可批量）
     */
    @RequestMapping("/removeDepartmentData")
    public void removeDepartmentData(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, String departmentids, int count) throws IOException {
        httpServletRequest.setCharacterEncoding("UTF-8");
        httpServletResponse.setCharacterEncoding("UTF-8");

        List<Integer> list = new ArrayList();
        String[] ids = departmentids.split(",");
        for (int i = 0; i < ids.length; i++) {
            list.add(Integer.parseInt(ids[i]));
        }
        String msg = "成功删除" + count + "条数据！";

        if (service.removeDepartmentData(list) == 0) {
            msg = "错误！！！";
        }

        httpServletResponse.getWriter().write(mapper.writeValueAsString(msg));
    }
     /*
     查询所有信息
     用于填充下拉列表
      */
    @RequestMapping("/queryAll")
    public void queryAll(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws IOException {
        httpServletRequest.setCharacterEncoding("UTF-8");
        httpServletResponse.setCharacterEncoding("UTF-8");
        List<Department> list = service.getAll();
        httpServletResponse.getWriter().write(mapper.writeValueAsString(list));
    }
    /*
    根据id查询部门信息
    用于多选下拉列表的选中事件
     */
    @RequestMapping("/queryBy")
    public void queryBy(HttpServletRequest httpServletRequest, int companyId,HttpServletResponse httpServletResponse) throws IOException {
        httpServletRequest.setCharacterEncoding("UTF-8");
        httpServletResponse.setCharacterEncoding("UTF-8");
        List<Department> list = service.queryBy(companyId);
        httpServletResponse.getWriter().write(mapper.writeValueAsString(list));
    }
}


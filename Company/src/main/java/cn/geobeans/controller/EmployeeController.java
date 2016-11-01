package cn.geobeans.controller;

import cn.geobeans.bean.Employee;
import cn.geobeans.bean.EmployeeCompanyDepartment;
import cn.geobeans.bean.EmployeeRole;
import cn.geobeans.service.EmployeeCompanyDepartmentService;
import cn.geobeans.service.EmployeeRoleService;
import cn.geobeans.service.EmployeeService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2016/10/31.
 */
@Controller
@RequestMapping("/employee")
public class EmployeeController {
    @Autowired
    EmployeeService service;
    @Autowired
    EmployeeRoleService eRService;
    @Autowired
    EmployeeCompanyDepartmentService ECDService;
    ObjectMapper mapper = new ObjectMapper();
    /*
       角色信息查询
     */
    @RequestMapping("/queryEmployeeData")
    public void  queryEmployeeData(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,String employeeName,String employeeId,
                                int rows, int page,String sort,String order) throws IOException {
        Map<String, Object> map = new HashMap<String, Object>();
        Map<String, Object> resultMap = null;
        String orders = " ";
//        List sorts = new ArrayList();
//        List orders = new ArrayList();
        if(sort==null){
            orders += "employeeId ASC";
//            sorts.add("employeeId");
//            orders.add("ASC");
        }
        else {
//            sorts = Arrays.asList(sort.split(","));
//            orders = Arrays.asList(order.split(","));
            String[] sortArr = sort.split(",");
            String[] orderArr = order.split(",");
            for (int i = 0; i < sortArr.length; i++) {
                if (i == 0) {
                    orders += sortArr[i] + " " + orderArr[i];
                } else {
                    orders += "," + sortArr[i] + " " + orderArr[i];
                }
            }
        }
        map.put("startNum", rows * (page - 1));
        map.put("pageSize",rows);

        map.put("orders",orders);
        map.put("employeeName",employeeName);
        map.put("employeeId",employeeId);
        resultMap = service.queryEmployeeData(map);

        httpServletResponse.getWriter().write(mapper.writeValueAsString(resultMap));

    }
    /*
       角色信息添加
     */
    @RequestMapping("/addEmployeeData")
    public void addEmployeeData (HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,Employee employee,int departmentId,int roleId,int companyId)throws IOException{
        httpServletRequest.setCharacterEncoding("UTF-8");
        httpServletResponse.setCharacterEncoding("UTF-8");
        Map map = new HashMap();
        System.out.println(employee);
        int flag = service.addEmployeeData(employee);
        if(flag!=0) {
            flag = service.getMaxId();
            EmployeeRole employeeRole = new EmployeeRole();
            employeeRole.setRoleId(roleId);
            employeeRole.setEmployeeId(flag);
            EmployeeCompanyDepartment employeeCompanyDepartment = new EmployeeCompanyDepartment();
            employeeCompanyDepartment.setEmployeeId(flag);
            employeeCompanyDepartment.setCompanyId(companyId);
            employeeCompanyDepartment.setDepartmentId(departmentId);
            ECDService.addECD(employeeCompanyDepartment);
            flag = eRService.addEmployeeRole(employeeRole);
        }
        httpServletResponse.getWriter().write(mapper.writeValueAsString(flag));
    }
    /*
    角色权限信息
     */
    @RequestMapping("/updateEmployeeData")
    public void updateEmployeeData (HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,Employee employee
            ,int departmentId,int roleId,int companyId)throws IOException{
        httpServletRequest.setCharacterEncoding("UTF-8");
        httpServletResponse.setCharacterEncoding("UTF-8");
        Map map = new HashMap();
        int flag = service.updateEmployeeData(employee);
        EmployeeRole employeeRole = new EmployeeRole();
        employeeRole.setRoleId(roleId);
        employeeRole.setEmployeeId(employee.getEmployeeId());
        EmployeeCompanyDepartment employeeCompanyDepartment = new EmployeeCompanyDepartment();
        employeeCompanyDepartment.setEmployeeId(employee.getEmployeeId());
        employeeCompanyDepartment.setCompanyId(companyId);
        employeeCompanyDepartment.setDepartmentId(departmentId);
        ECDService.updateECD(employeeCompanyDepartment);
        eRService.updateEmployeeRole(employeeRole);
        httpServletResponse.getWriter().write(mapper.writeValueAsString(flag));
    }
    /*
    删除角色信息（可批量）
     */
    @RequestMapping("/removeEmployeeData")
    public void removeEmployeeData (HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,String employeeids,int count)throws IOException{
        httpServletRequest.setCharacterEncoding("UTF-8");
        httpServletResponse.setCharacterEncoding("UTF-8");

        List<Integer> list = new ArrayList();
        String[] ids = employeeids.split(",");
        for(int i=0; i<ids.length; i++){
            list.add(Integer.parseInt(ids[i]));
        }
        String msg = "成功删除"+count+"条数据！" ;

        if(service.removeEmployeeData(list) == 0){
            msg = "错误！！！";
        }

        httpServletResponse.getWriter().write(mapper.writeValueAsString(msg));
    }
    @RequestMapping("/queryAll")
    public void queryAll(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse)throws IOException{
        httpServletRequest.setCharacterEncoding("UTF-8");
        httpServletResponse.setCharacterEncoding("UTF-8");
        List<Employee> list = service.getAll();
    }
}

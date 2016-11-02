package cn.geobeans.controller;

import cn.geobeans.bean.Employee;
import cn.geobeans.service.LoginService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * 当前用户模块.
 */
@Controller
@RequestMapping("/user")
public class LoginController {
    @Autowired
    LoginService service;
    ObjectMapper mapper = new ObjectMapper();

    @RequestMapping("/login")
    public void login (HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,HttpSession session,String username,String password)throws IOException {
        int flag = 0;
        Employee employee = service.queryPassByUser(username,password);
        if(employee.getPassword()==null||employee.getPassword().trim().equalsIgnoreCase("")){
            flag =-1;
        }
        else{
            if (employee.getPassword().equalsIgnoreCase(password)){
                flag = 1;
                session.setAttribute("loginUser",employee);
                int employeeId = employee.getEmployeeId();
                Map map = service.queryPower(employeeId);
                session.setAttribute("userPower",map);
            }
            else {
                flag = 0;
            }
        }
        httpServletResponse.getWriter().write(mapper.writeValueAsString(flag));
    }
    @RequestMapping("/exitSys")
    public void getUserMag (HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,HttpSession session)throws IOException {
        session.removeAttribute("loginUser");
    }
    @RequestMapping("/getUserMag")
    public void exitSys (HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,HttpSession session)throws IOException {
        Map map = new HashMap<>();
        map.put("loginUser",(Employee)session.getAttribute("loginUser"));
        map.put("userPower",(Map)session.getAttribute("userPower"));
        httpServletResponse.getWriter().write(mapper.writeValueAsString(map));
    }
}

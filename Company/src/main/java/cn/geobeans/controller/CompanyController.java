package cn.geobeans.controller;

import cn.geobeans.bean.Company;
import cn.geobeans.service.CompanyService;
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
@RequestMapping("/company")
public class CompanyController {
    @Autowired
    CompanyService service;

    ObjectMapper mapper = new ObjectMapper();
    /*
       角色信息查询
     */
    @RequestMapping("/queryCompanyData")
    public void  queryCompanyData(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,String companyName,String companyId,
                                int rows, int page,String sort,String order) throws IOException {
        Map<String, Object> map = new HashMap<String, Object>();
        Map<String, Object> resultMap = null;
        List sorts = new ArrayList();
        List orders = new ArrayList();
        if(sort==null){

            sorts.add("companyId");
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
        map.put("companyName",companyName);
        map.put("companyId",companyId);
        resultMap = service.queryCompanyData(map);

        httpServletResponse.getWriter().write(mapper.writeValueAsString(resultMap));

    }
    /*
       角色信息添加
     */
    @RequestMapping("/addCompanyData")
    public void addCompanyData (HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,Company company)throws IOException{
        httpServletRequest.setCharacterEncoding("UTF-8");
        httpServletResponse.setCharacterEncoding("UTF-8");
        Map map = new HashMap();
        System.out.println(company);
        int flag = service.addCompanyData(company);
        httpServletResponse.getWriter().write(mapper.writeValueAsString(flag));
    }
    /*
    角色权限信息
     */
    @RequestMapping("/updateCompanyData")
    public void updateCompanyData (HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,Company company)throws IOException{
        httpServletRequest.setCharacterEncoding("UTF-8");
        httpServletResponse.setCharacterEncoding("UTF-8");
        Map map = new HashMap();
        int flag = service.updateCompanyData(company);
        httpServletResponse.getWriter().write(mapper.writeValueAsString(flag));
    }
    /*
    删除角色信息（可批量）
     */
    @RequestMapping("/removeCompanyData")
    public void removeCompanyData (HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,String companyids,int count)throws IOException{
        httpServletRequest.setCharacterEncoding("UTF-8");
        httpServletResponse.setCharacterEncoding("UTF-8");

        List<Integer> list = new ArrayList();
        String[] ids = companyids.split(",");
        for(int i=0; i<ids.length; i++){
            list.add(Integer.parseInt(ids[i]));
        }
        String msg = "成功删除"+count+"条数据！" ;

        if(service.removeCompanyData(list) == 0){
            msg = "错误！！！";
        }

        httpServletResponse.getWriter().write(mapper.writeValueAsString(msg));
    }
    @RequestMapping("/queryAll")
    public void queryAll(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws IOException{
        httpServletRequest.setCharacterEncoding("UTF-8");
        httpServletResponse.setCharacterEncoding("UTF-8");
        List<Company> list = service.getAll();
        httpServletResponse.getWriter().write(mapper.writeValueAsString(list));
    }





}

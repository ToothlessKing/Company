package cn.geobeans.controller;

import cn.geobeans.bean.Company;
import cn.geobeans.service.CompanyDepartmentService;
import cn.geobeans.service.CompanyService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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
    @Autowired
    CompanyDepartmentService companyDepartmentService;

    ObjectMapper mapper = new ObjectMapper();
    /*
       分公司信息查询
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
       分公司信息添加
     */
    @RequestMapping("/addCompanyData")
    public void addCompanyData (HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,Company company,String departmentName)throws IOException{
        httpServletRequest.setCharacterEncoding("UTF-8");
        httpServletResponse.setCharacterEncoding("UTF-8");
        Map map = new HashMap();
        System.out.println(company);
        int flag = service.addCompanyData(company);

        if(flag!=0){

            company.setCompanyId(service.getMaxId());
            companyDepartmentService.addData(company.getCompanyId(), departmentName);
        }
        httpServletResponse.getWriter().write(mapper.writeValueAsString(flag));
    }
    /*
    分公司信息更新
     */
    @RequestMapping("/updateCompanyData")
    public void updateCompanyData (HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,Company company,String departmentName)throws IOException{
        httpServletRequest.setCharacterEncoding("UTF-8");
        httpServletResponse.setCharacterEncoding("UTF-8");
        Map map = new HashMap();
        int flag = service.updateCompanyData(company);
        if(flag!=0){
            companyDepartmentService.addData(company.getCompanyId(), departmentName);
        }
        httpServletResponse.getWriter().write(mapper.writeValueAsString(flag));
    }
    /*
    删除分公司信息（可批量）
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
    //公司信息查询----树形展示
    @RequestMapping("/loadTree")
    public void loadTree(HttpServletRequest httpServletRequest,Model model,HttpServletResponse httpServletResponse,int rows, int page,String companyId,String companyName) throws IOException{
        String id =httpServletRequest.getParameter("id");
        if(id.equalsIgnoreCase("0")){
            id = "0";
            Map map = new HashMap<>();
            map.put("startNum", rows * (page - 1));
            map.put("pageSize", rows);
            map.put("companyId", companyId);
            map.put("companyName", companyName);
            Map returnMap = service.loadTree(map,id);
            httpServletResponse.getWriter().write(mapper.writeValueAsString(returnMap));
        }else{
            List list = service.loadNode(id);
            httpServletResponse.getWriter().write(mapper.writeValueAsString(list));
        }


    }
    /*
        公司地理信息展示
        返回json数据
     */
    @RequestMapping("/loadJson")
    public void loadJson(HttpServletRequest httpServletRequest,Model model,HttpServletResponse httpServletResponse,int rows, int page,String companyId,String companyName,String flag) throws IOException{
        String id =httpServletRequest.getParameter("id");
        if(id.equalsIgnoreCase("0")){
            id = "0";
            Map map = new HashMap<>();
            map.put("startNum", rows * (page - 1));
            map.put("pageSize", rows);
            map.put("companyId", companyId);
            map.put("companyName", companyName);
            Map returnMap = service.loadTree(map, id);
            if(flag.equalsIgnoreCase("point")){
                httpServletResponse.getWriter().write(mapper.writeValueAsString((Map)returnMap.get("json_point")));
            }
            else if(flag.equalsIgnoreCase("polygo")){
                httpServletResponse.getWriter().write(mapper.writeValueAsString((Map)returnMap.get("json_polygo")));
            }
            else {
                httpServletResponse.getWriter().write(mapper.writeValueAsString((Map)returnMap.get("json")));
            }

        }


    }
    /*
        更新分公司坐标位置
     */
    @RequestMapping("/updateCoor")
    public void updateCoor(HttpServletRequest httpServletRequest,Model model,HttpServletResponse httpServletResponse,int companyId,String coor) throws IOException{


        int msg = service.updateCoor(companyId,coor);
        httpServletResponse.getWriter().write(mapper.writeValueAsString(msg));
    }
    /*
         更新分公司市场范围
     */
    @RequestMapping("/updateScope")
    public void saveScope(HttpServletRequest httpServletRequest,Model model,HttpServletResponse httpServletResponse,int companyId,String scope) throws IOException{

        int msg = service.saveScope(companyId, scope);

        httpServletResponse.getWriter().write(mapper.writeValueAsString(msg));


    }
    @RequestMapping("/loadFirmTree")
    public void loadFirmTree(HttpServletRequest httpServletRequest,HttpServletResponse httpServletResponse) throws IOException{
        String id = httpServletRequest.getParameter("id");
        if(id.equalsIgnoreCase("")||id==null){
            id = "0";
        }
        List list = service.loadFirmTree(id);
        httpServletResponse.getWriter().write(mapper.writeValueAsString(list));
    }
    @RequestMapping("/loadTreeJson")
    public void loadTreeJson(HttpServletRequest httpServletRequest,HttpServletResponse httpServletResponse) throws IOException{
        httpServletResponse.getWriter().write(mapper.writeValueAsString(service.loadTreeJson()));
    }






}

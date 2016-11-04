package cn.geobeans.service;


import cn.geobeans.bean.Company;
import cn.geobeans.dao.CompanyDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2016/10/26.
 */
@Service
@Transactional
public class CompanyService {

    @Autowired
    private CompanyDao dao;

    public Map<String, Object> queryCompanyData(Map map) {
        Map<String,Object> resultMap = new HashMap<String, Object>();
        resultMap.put("total",dao.queryCompanyCount(map));
        resultMap.put("rows",dao.queryCompanyData(map));


        return resultMap;
    }

    public int addCompanyData(Company company) {
        if(dao.findBy("companyName",company.getCompanyName()).size()==0)
        {
            dao.save(company);
            return 1;
        }
        else{
            return 0;
        }
    }

    public int updateCompanyData(Company company) {
        return  dao.updateCompanyData(company);
    }

    public int removeCompanyData(List<Integer> list)
    {
        return dao.removeCompanyData(list);
    }

    public List<Company> getAll(){
        return dao.getAll();
    }

    public Map loadTree(Map paramMap,String companyId){
        Map returnMap =new HashMap<>();
        List list = new ArrayList<>();
        if(companyId.equalsIgnoreCase("0")){
            List<Company> companyList = dao.queryCompanyData(paramMap);
            for(int i=0 ;i<companyList.size() ;i++){
                Map map = new HashMap<>();
                Company company = companyList.get(i);
                map.put("companyId",company.getCompanyId());
                map.put("companyName",company.getCompanyName());
                map.put("companyAddress",company.getCompanyAddress());
                map.put("state","closed");
                list.add(map);
            }
        }
        returnMap.put("rows",list);
        returnMap.put("total",dao.queryCompanyCount(paramMap));
        return returnMap;
    }
    public List loadNode(String companyId){
        List list = new ArrayList<>();
        if(companyId.equalsIgnoreCase("0")){
            List<Company> companyList = getAll();
            for(int i=0 ;i<companyList.size() ;i++){
                Map map = new HashMap<>();
                Company company = companyList.get(i);
                map.put("companyId",company.getCompanyId());
                map.put("companyName",company.getCompanyName());
                map.put("companyAddress",company.getCompanyAddress());
                map.put("state","closed");
                list.add(map);
            }
        }
        else{

            List objList = dao.loadTree(companyId);
            for(int i=0 ;i<objList.size() ;i++){
                Object[] objects = (Object[])objList.get(i);
                Map map = new HashMap<>();
                map.put("companyName",(String)objects[2]);
                map.put("departmentId", " "+String.valueOf(objects[1]));
                map.put("departmentName",(String)objects[2]);
                map.put("state","open");
                list.add(map);
            }
        }
        return list;
    }
    public int getMaxId(){
        return dao.getMaxId();
    }


}

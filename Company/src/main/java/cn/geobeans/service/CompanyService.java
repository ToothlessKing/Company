package cn.geobeans.service;


import cn.geobeans.bean.Company;
import cn.geobeans.dao.CompanyDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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


}

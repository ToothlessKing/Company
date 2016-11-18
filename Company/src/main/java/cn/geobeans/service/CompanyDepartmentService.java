package cn.geobeans.service;

import cn.geobeans.bean.CompanyDepartment;
import cn.geobeans.dao.CompanyDepartmentDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by Administrator on 2016/11/4.
 */
@Service
@Transactional
public class CompanyDepartmentService {
    @Autowired
    private CompanyDepartmentDao dao;




    public List<CompanyDepartment> getAll(){
        return dao.getAll();
    }

    public int addData(int companyId,String departmentIds){
        dao.remove(companyId);
        if(departmentIds==null||departmentIds.trim().equalsIgnoreCase(""))return 0;
        String[] strings = departmentIds.split(",");
        for(int i=0 ;i<strings.length ;i++){
            CompanyDepartment companyDepartment = new CompanyDepartment();
            companyDepartment.setDepartmentId(Integer.parseInt(strings[i]));
            companyDepartment.setCompanyId(companyId);
            dao.save(companyDepartment);
        }
        return 0;
    }

}

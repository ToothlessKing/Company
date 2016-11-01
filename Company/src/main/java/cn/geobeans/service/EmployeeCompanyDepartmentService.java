package cn.geobeans.service;

import cn.geobeans.bean.EmployeeCompanyDepartment;
import cn.geobeans.dao.EmployeeCompanyDepartmentDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by Administrator on 2016/11/1.
 */
@Service
@Transactional
public class EmployeeCompanyDepartmentService {

    @Autowired
    EmployeeCompanyDepartmentDao dao;
    public int addECD(EmployeeCompanyDepartment employeeCompanyDepartment){
        dao.save(employeeCompanyDepartment);
        return 1;
    }
    public void updateECD(EmployeeCompanyDepartment employeeCompanyDepartment){
        dao.save(employeeCompanyDepartment);
    }

}

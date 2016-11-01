package cn.geobeans.service;


import cn.geobeans.bean.EmployeeRole;
import cn.geobeans.dao.EmployeeRoleDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by Administrator on 2016/10/26.
 */
@Service
@Transactional
public class EmployeeRoleService {

    @Autowired
    private EmployeeRoleDao dao;



    public int addEmployeeRole(EmployeeRole role) {
        dao.save(role);
        return 1;
    }

    public void updateEmployeeRole(EmployeeRole employeeRole){
        dao.save(employeeRole);
    }


    public List<EmployeeRole> getAll(){
        return dao.getAll();
    }


}

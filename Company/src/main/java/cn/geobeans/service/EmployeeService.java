package cn.geobeans.service;


import cn.geobeans.bean.Employee;
import cn.geobeans.dao.EmployeeDao;
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
public class EmployeeService {

    @Autowired
    private EmployeeDao dao;

    public Map<String, Object> queryEmployeeData(Map map) {
        Map<String,Object> resultMap = new HashMap<String, Object>();
        resultMap.put("total",dao.queryEmployeeCount(map));
        resultMap.put("rows",dao.queryEmployeeData(map));


        return resultMap;
    }

    public int addEmployeeData(Employee employee) {
        if(dao.findBy("employeeName",employee.getEmployeeName()).size()==0)
        {
            dao.save(employee);
            return 1;
        }
        else{
            return 0;
        }
    }

    public int updateEmployeeData(Employee employee) {
        return  dao.updateEmployeeData(employee);
    }

    public int removeEmployeeData(List<Integer> list)
    {
        return dao.removeEmployeeData(list);
    }

    public List<Employee> getAll(){
        return dao.getAll();
    }


}

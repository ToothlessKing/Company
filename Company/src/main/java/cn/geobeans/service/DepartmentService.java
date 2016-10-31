package cn.geobeans.service;


import cn.geobeans.bean.Department;
import cn.geobeans.dao.DepartmentDao;
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
public class DepartmentService {

    @Autowired
    private DepartmentDao dao;

    public Map<String, Object> queryDepartmentData(Map map) {
        Map<String,Object> resultMap = new HashMap<String, Object>();
        resultMap.put("total",dao.queryDepartmentCount(map));
        resultMap.put("rows",dao.queryDepartmentData(map));


        return resultMap;
    }

    public int addDepartmentData(Department department) {
        if(dao.findBy("departmentName",department.getDepartmentName()).size()==0)
        {
            dao.save(department);
            return 1;
        }
        else{
            return 0;
        }
    }

    public int updateDepartmentData(Department department) {
        return  dao.updateDepartmentData(department);
    }

    public int removeDepartmentData(List<Integer> list)
    {
        return dao.removeDepartmentData(list);
    }

    public List<Department> getAll(){
        return dao.getAll();
    }
}

package cn.geobeans.service;


import cn.geobeans.bean.Department;
import cn.geobeans.dao.DepartmentDao;
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
public class DepartmentService {

    @Autowired
    private DepartmentDao dao;

    public Map<String, Object> queryDepartmentData(Map map) {
        Map<String,Object> resultMap = new HashMap<String, Object>();
        //resultMap.put("total",dao.queryDepartmentCount(map));
        //resultMap.put("rows",dao.queryDepartmentData(map));
        resultMap.put("total",dao.queryDepartmentCounts(map));
        resultMap.put("rows",dao.queryDepartment(map));
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

    public List<Department> queryBy(int companyId){
        List list = dao.queryBy(companyId);
        List reList = new ArrayList<>();
        for(int i=0 ;i< list.size();i++){
            Object[] objects = (Object[])list.get(i);
            Department department = new Department();
            department.setDepartmentId((int)objects[0]);
            department.setDepartmentName((String)objects[1]);
            department.setDepartmentDescribe((String)objects[2]);
            reList.add(department);
        }
        return reList;
    }
}

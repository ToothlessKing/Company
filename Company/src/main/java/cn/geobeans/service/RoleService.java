package cn.geobeans.service;


import cn.geobeans.bean.Role;
import cn.geobeans.dao.RoleDao;
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
public class RoleService {

    @Autowired
    private RoleDao dao;

    public Map<String, Object> queryRoleData(Map map) {
        Map<String,Object> resultMap = new HashMap<String, Object>();
        resultMap.put("total",dao.queryRoleCount(map));
        resultMap.put("rows",dao.queryRoleData(map));


        return resultMap;
    }

    public int addRoleData(Role role) {
        if(dao.findBy("roleName",role.getRoleName()).size()==0)
        {
            dao.save(role);
            return 1;
        }
        else{
            return 0;
        }
    }

    public int updateRoleData(Role role) {
        return  dao.updateRoleData(role);
    }

    public int removeRoleData(List<Integer> list)
    {
        return dao.removeRoleData(list);
    }

    public List<Role> getAll(){
        return dao.getAll();
    }


}

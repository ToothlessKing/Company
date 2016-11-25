package cn.geobeans.service;

import cn.geobeans.bean.Employee;
import cn.geobeans.dao.LoginDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2016/10/31.
 */
@Service
@Transactional
public class LoginService {


    @Autowired
    LoginDao dao;

    public Employee queryPassByUser(String username){
        return  dao.queryPassByUser(username);

    }

    public Map queryPower(int employeeId){
        List list = dao.queryPower(employeeId);
        Map map = new HashMap<>();
        if(list.size()>0){
            Object[] object = (Object[])list.get(0);
            map.put("powerName",(String)object[0]);
            map.put("powerId",Integer.parseInt(String.valueOf(object[1])));
            map.put("powerScope",(String)object[2]);
            map.put("roleId",Integer.parseInt(String.valueOf(object[3])));
            map.put("roleName",(String)object[4]);
            map.put("powerAction",(String)object[5]);
            map.put("companyId",Integer.parseInt(String.valueOf(object[6])));
            map.put("departmentId",Integer.parseInt(String.valueOf(object[7])));
        }
        else {
            map.put("powerName","");
            map.put("powerId","");
            map.put("powerScope","");
            map.put("roleId","");
            map.put("roleName","");
            map.put("powerAction","");
            map.put("companyId","");
            map.put("departmentId","");
        }
        return map;
    }

}

package cn.geobeans.dao;

import cn.geobeans.bean.Employee;
import cn.geobeans.common.database.DaoHibernateImpl;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2016/10/31.
 */
@Repository
public class LoginDao extends DaoHibernateImpl<Employee,Integer> {

    public Employee queryPassByUser(String username){
        return findUniqueBy("employeeName", username);
    }
    public Map queryPower(int employeeId){
        Map map = new HashMap<>();
//        String hql = "select p.powerName,p.powerId,r.roleId,r.roleName,p.powerAction from Employee e , Power p ,Role r \n" +
//                "where e.roleId = r.roleId and r.powerId = p.powerId\n" +
//                "and e.roleId = "+roleId;
        String hql ="select p.powerName,p.powerId,r.roleId,r.roleName,p.powerAction from role r ,power p ,employee_role er \n" +
                "where r.powerId = p.powerId and r.roleId = er.roleId and er.employeeId ="+employeeId;
        List list = getSession().createSQLQuery(hql).list();
        if(list.size()>0){
            Object[] object = (Object[])list.get(0);
            map.put("powerName",(String)object[0]);
            map.put("powerId",Integer.parseInt(String.valueOf(object[1])));
            map.put("roleId",Integer.parseInt(String.valueOf(object[2])));
            map.put("roleName",(String)object[3]);
            map.put("powerAction",(String)object[4]);
        }
        else {
            map.put("powerName","");
            map.put("powerId","");
            map.put("roleId","");
            map.put("roleName","");
            map.put("powerAction","");
        }

        return map;
    }
}

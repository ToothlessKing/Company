package cn.geobeans.dao;

import cn.geobeans.bean.Employee;
import cn.geobeans.common.database.DaoHibernateImpl;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Administrator on 2016/10/31.
 */
@Repository
public class LoginDao extends DaoHibernateImpl<Employee,Integer> {

    public Employee queryPassByUser(String username){
        return findUniqueBy("employeeName", username);
    }
    public List queryPower(int employeeId){

//        String hql = "select p.powerName,p.powerId,r.roleId,r.roleName,p.powerAction from Employee e , Power p ,Role r \n" +
//                "where e.roleId = r.roleId and r.powerId = p.powerId\n" +
//                "and e.roleId = "+roleId;
        String hql ="select p.powerName,p.powerId,p.powerScope,r.roleId,r.roleName,p.powerAction,ecd.companyId,ecd.departmentId from role r ,power p ,employee_role er ,employee_company_department ecd\n" +
                "where r.powerId = p.powerId and r.roleId = er.roleId and ecd.employeeId =er.employeeId  and er.employeeId ="+employeeId;
        List list = getSession().createSQLQuery(hql).list();


        return list;
    }
}

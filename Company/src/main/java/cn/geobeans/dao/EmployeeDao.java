    package cn.geobeans.dao;

import cn.geobeans.bean.Employee;
import cn.geobeans.common.database.DaoHibernateImpl;
import org.hibernate.Criteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

    /**
     * Created by Administrator on 2016/10/26.
     */
@Repository
public class EmployeeDao extends DaoHibernateImpl<Employee,Integer> {

        public List queryEmployeeData(Map map){

            String hql = "SELECT e.employeeEmail,e.employeeId,e.employeeName,e.employeePhone,e.employeeSex,e.password\n" +
                    ",newTable.companyId,newTable.companyName,newTable.departmentId,newTable.departmentName,newTable.roleId,newTable.roleName\n" +
                    "from Employee e \n" +
                    "left join\n" +
                    "(\n" +
                    "SELECT  r.roleId,r.roleName,d.departmentId,d.departmentName,c.companyId,c.companyName,er.employeeId eId from Department d,Company c,Role r,employee_company_department ecd,employee_role er\n" +
                    "where ecd.departmentId = d.departmentId and ecd.companyId = c.companyId and er.roleId = r.roleId and ecd.employeeId = er.employeeId\n" +
                    ") as newTable\n" +
                    "on  e.employeeId = newTable.eId ";
            String employeeName = (String) map.get("employeeName");
            String employeeId = (String) map.get("employeeId");
            String orders =  (String) map.get("orders");
            String whereSql =" where 1=1";
            if(employeeName!=null&&!employeeName.equalsIgnoreCase("")){
                whereSql += " and employeeName = '"+employeeName+"'";
            }
            if(employeeId!=null&&!employeeId.equalsIgnoreCase("")){
                whereSql += " and employeeId = "+ employeeId;
            }
            whereSql += " order by "+orders + " limit "+(int)map.get("startNum")+","+(int)map.get("pageSize");
            hql += whereSql;
            List list =getSession().createSQLQuery(hql).list();// createQuery(hql).list();
            System.out.println(hql);
            System.out.println("size"+list.size());
            List returnList = new ArrayList<>();
           for(int i=0 ;i<list.size() ;i++){
                Object[] objects = (Object[])list.get(i);
                Map newMap = new HashMap<>();
                newMap.put("employeeEmail",(String)objects[0]);
                newMap.put("employeeId",Integer.parseInt(String.valueOf(objects[1])));
                newMap.put("employeeName",(String)objects[2]);
                newMap.put("employeePhone",(String)objects[3]);
                newMap.put("employeeSex",String.valueOf(objects[4]));
                newMap.put("password",(String)objects[5]);
                newMap.put("companyId",String.valueOf(objects[6]));
                newMap.put("companyName",(String)objects[7]);
                newMap.put("departmentId",String.valueOf(objects[8]));
                newMap.put("departmentName",(String)objects[9]);
                newMap.put("roleId",String.valueOf(objects[10]));
                newMap.put("roleName",(String)objects[11]);
                returnList.add(newMap);
            }
            return returnList;
        }
        public int queryEmployeeCount(Map map){
            Criteria criteria = createCriteria();
            String employeeName = (String) map.get("employeeName");
            String employeeId = (String) map.get("employeeId");
            if(employeeName!=null&&!employeeName.equalsIgnoreCase("")){
                criteria.add(Restrictions.eq("employeeName",employeeName));
            }
            if(employeeId!=null&&!employeeId.equalsIgnoreCase("")){
                criteria.add(Restrictions.eq("employeeId",Integer.parseInt(employeeId)));
            }
            int count = ((Long)criteria.setProjection(Projections.rowCount()).uniqueResult()).intValue();
    
            return  count;
        }
        public int addEmployeeData(Employee employee){
            return  0;
        }
        public int queryCountByName(Employee employee){
            return  0;
        }
        public int queryCountByNameId(Map map){
            return  0;
        }
        public int updateEmployeeData(Employee employee){
            String hql = "from Employee where employeeName =:employeeName and employeeId !=:employeeId";
            Map map = new HashMap();
            map.put("employeeName",employee.getEmployeeName());
            map.put("employeeId",employee.getEmployeeId());
            if(find(hql,map).size()==0)
            {
    
                save(employee);
                return 1;
            }
            else{
                return 0;
            }
        }
        public int removeEmployeeData(List<Integer> list){
            for(int i : list){
                delete(i);
                return 1;
            }
            return  0;
        }
        public int getMaxId(){
            String hql = "select max(employeeId) from employee";
            List list =getSession().createSQLQuery(hql).list();
            return (int)list.get(0);
        }
}

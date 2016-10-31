    package cn.geobeans.dao;

import cn.geobeans.bean.Employee;
import cn.geobeans.common.database.DaoHibernateImpl;
import org.hibernate.Criteria;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

    /**
     * Created by Administrator on 2016/10/26.
     */
    @Repository
    public class EmployeeDao extends DaoHibernateImpl<Employee,Integer> {
    
        public List queryEmployeeData(Map map){
    
            DetachedCriteria dc = DetachedCriteria.forClass(Employee.class);
            Criteria criteria = createCriteria();
            String employeeName = (String) map.get("employeeName");
            String employeeId = (String) map.get("employeeId");
            if(employeeName!=null&&!employeeName.equalsIgnoreCase("")){
                criteria.add(Restrictions.eq("employeeName",employeeName));
            }
            if(employeeId!=null&&!employeeId.equalsIgnoreCase("")){
                criteria.add(Restrictions.eq("employeeId",Integer.parseInt(employeeId)));
            }
            List sorts = (List) map.get("sorts");
            List orders = (List) map.get("orders");
            for(int i=0 ; i<sorts.size(); i++){
                if(((String)orders.get(i)).equalsIgnoreCase("desc")){
                    criteria.addOrder(Order.desc((String) sorts.get(i)));
                }
                else{
                    criteria.addOrder(Order.asc((String)sorts.get(i)));
                }
            }
            criteria.setFirstResult((Integer) map.get("startNum"));
            criteria.setMaxResults((Integer) map.get("pageSize"));
            List list = criteria.list();
            return  list;
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
    
    }

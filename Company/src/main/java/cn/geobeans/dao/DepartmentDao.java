package cn.geobeans.dao;

import cn.geobeans.bean.Department;
import cn.geobeans.common.database.DaoHibernateImpl;
import org.hibernate.Criteria;
import org.hibernate.Query;
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
public class DepartmentDao extends DaoHibernateImpl<Department,Integer> {

    public List queryDepartmentData(Map map){

        DetachedCriteria dc = DetachedCriteria.forClass(Department.class);
        Criteria criteria = createCriteria();
        String departmentId = (String) map.get("department_id");
        String departmentName = (String) map.get("department_name");
        if(departmentId!=null&&!departmentId.equalsIgnoreCase("")){
            criteria.add(Restrictions.eq("departmentId",Integer.parseInt(departmentId)));
        }
        if(departmentName!=null&&!departmentName.equalsIgnoreCase("")){
            criteria.add(Restrictions.eq("departmentName",departmentName));
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
    public int queryDepartmentCount(Map map){
        Criteria criteria = createCriteria();
        String departmentId = (String) map.get("department_id");
        String departmentName = (String) map.get("department_name");
        if(departmentId!=null&&!departmentId.equalsIgnoreCase("")){
            criteria.add(Restrictions.eq("departmentId",Integer.parseInt(departmentId)));
        }
        if(departmentName!=null&&!departmentName.equalsIgnoreCase("")){
            criteria.add(Restrictions.eq("departmentName",departmentName));
        }
        int count = ((Long)criteria.setProjection(Projections.rowCount()).uniqueResult()).intValue();

        return  count;
    }
    public int addDepartmentData(Department department){
        return  0;
    }
    public int queryCountByName(Department department){
        return  0;
    }
    public int queryCountByNameId(Map map){
        return  0;
    }
    public int updateDepartmentData(Department department){
        String hql = "from Department where departmentName =:departmentName and departmentId !=:departmentId";
        Map map = new HashMap();
        map.put("departmentName",department.getDepartmentName());
        map.put("departmentId",department.getDepartmentId());
        if(find(hql,map).size()==0)
        {

            save(department);
            return 1;
        }
        else{
            return 0;
        }
    }
    public int removeDepartmentData(List<Integer> list){
        for(int i : list){
            delete(i);
            return 1;
        }
        return  0;
    }
    public List queryBy(int companyId){
        String hql = "SELECT d.* from  department d,company_department cd\n" +
                "where d.departmentId=cd.departmentId\n" +
                "and cd.companyId = "+companyId;
        return getSession().createSQLQuery(hql).list();
    }
    public List queryDepartment(Map map){
        String hql = "select d from Department as d where 1=1";
        //String hql = "select d from Department as d ,CompanyDepartment as cd where 1=1 ";
        String departmentId = (String) map.get("department_id");
        String departmentName = (String) map.get("department_name");
        String companyId = (String) map.get("companyId");
        if(departmentId!=null&&!departmentId.equalsIgnoreCase("")){
            hql += " and d.departmentId="+departmentId;
        }
        if(departmentName!=null&&!departmentName.equalsIgnoreCase("")){
            hql += " and d.departmentName like '%"+departmentName+"%'";
        }
        if(companyId!=null&&!companyId.equalsIgnoreCase("")){
            //hql += " and cd.companyId="+companyId+" and cd.departmentId = d.departmentId";
            hql += " and d.departmentId in (select cd.departmentId from CompanyDepartment as cd where cd.companyId="+companyId+" )";
        }
        hql += " order by ";
        List sorts = (List) map.get("sorts");
        List orders = (List) map.get("orders");
        for(int i=0 ; i<sorts.size(); i++){
            if(i==0){
                hql += " d."+(String)sorts.get(i)+" "+(String)orders.get(i);
            }
            else{
                hql += ", d."+(String)sorts.get(i)+" "+(String)orders.get(i);
            }
        }
        //hql += " limit "+(Integer)map.get("startNum")+","+(Integer)map.get("pageSize");
        Query query =createQuery(hql);
        query.setFirstResult((Integer)map.get("startNum"));
        query.setMaxResults((Integer)map.get("pageSize"));
        List list =createQuery(hql).list();
        return  list;
    }
    public int queryDepartmentCounts(Map map){
        //String hql = "select count(*) from Department as d ,CompanyDepartment as cd where 1=1 ";
        String hql = "select count(*) from Department as d where 1=1";
        String departmentId = (String) map.get("department_id");
        String departmentName = (String) map.get("department_name");
        String companyId = (String) map.get("companyId");
        if(departmentId!=null&&!departmentId.equalsIgnoreCase("")){
            hql += " and d.departmentId="+departmentId;
        }
        if(departmentName!=null&&!departmentName.equalsIgnoreCase("")){
            hql += " and d.departmentName like '%"+departmentName+"%'";
        }
        if(companyId!=null&&!companyId.equalsIgnoreCase("")){
           // hql += " and cd.companyId="+companyId+" and cd.departmentId = d.departmentId";
            hql += " and d.departmentId in (select cd.departmentId from CompanyDepartment as cd where cd.companyId="+companyId+" )";
        }
        int count = ((Number)createQuery(hql).uniqueResult()).intValue();
        return  count;
    }

}

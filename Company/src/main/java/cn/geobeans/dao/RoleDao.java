    package cn.geobeans.dao;

import cn.geobeans.bean.Role;
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
    public class RoleDao extends DaoHibernateImpl<Role,Integer> {
    
        public List queryRoleData(Map map){
    
            DetachedCriteria dc = DetachedCriteria.forClass(Role.class);
            Criteria criteria = createCriteria();
            String roleName = (String) map.get("roleName");
            String roleId = (String) map.get("roleId");
            if(roleName!=null&&!roleName.equalsIgnoreCase("")){
                criteria.add(Restrictions.eq("roleName",roleName));
            }
            if(roleId!=null&&!roleId.equalsIgnoreCase("")){
                criteria.add(Restrictions.eq("roleId",Integer.parseInt(roleId)));
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
        public int queryRoleCount(Map map){
            Criteria criteria = createCriteria();
            String roleName = (String) map.get("roleName");
            String roleId = (String) map.get("roleId");
            if(roleName!=null&&!roleName.equalsIgnoreCase("")){
                criteria.add(Restrictions.eq("roleName",roleName));
            }
            if(roleId!=null&&!roleId.equalsIgnoreCase("")){
                criteria.add(Restrictions.eq("roleId",Integer.parseInt(roleId)));
            }
            int count = ((Long)criteria.setProjection(Projections.rowCount()).uniqueResult()).intValue();
    
            return  count;
        }
        public int addRoleData(Role role){
            return  0;
        }
        public int queryCountByName(Role role){
            return  0;
        }
        public int queryCountByNameId(Map map){
            return  0;
        }
        public int updateRoleData(Role role){
            String hql = "from Role where roleName =:roleName and roleId !=:roleId";
            Map map = new HashMap();
            map.put("roleName",role.getRoleName());
            map.put("roleId",role.getRoleId());
            if(find(hql,map).size()==0)
            {
    
                save(role);
                return 1;
            }
            else{
                return 0;
            }
        }
        public int removeRoleData(List<Integer> list){
            for(int i : list){
                delete(i);
                return 1;
            }
            return  0;
        }
    
    }

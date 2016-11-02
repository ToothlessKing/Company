    package cn.geobeans.dao;

import cn.geobeans.bean.Power;
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
public class PowerDao extends DaoHibernateImpl<Power,Integer> {

    public List queryPowerData(Map map){

        DetachedCriteria dc = DetachedCriteria.forClass(Power.class);
        Criteria criteria = createCriteria();
        String powerName = (String) map.get("powerName");
        String powerAction = (String) map.get("powerAction");
        if(powerName!=null&&!powerName.equalsIgnoreCase("")){
            criteria.add(Restrictions.eq("powerName",powerName));
        }
        if(powerAction!=null&&!powerAction.equalsIgnoreCase("")){
            criteria.add(Restrictions.ilike("powerAction","%"+powerAction+"%"));
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
    public int queryPowerCount(Map map){
        Criteria criteria = createCriteria();
        String powerName = (String) map.get("powerName");
        String powerAction = (String) map.get("powerAction");
        if(powerName!=null&&!powerName.equalsIgnoreCase("")){
            criteria.add(Restrictions.eq("powerName",powerName));
        }
        if(powerAction!=null&&!powerAction.equalsIgnoreCase("")){
            criteria.add(Restrictions.ilike("powerAction","%"+powerAction+"%"));
        }
        int count = ((Long)criteria.setProjection(Projections.rowCount()).uniqueResult()).intValue();

        return  count;
    }
    public int addPowerData(Power power){
        return  0;
    }
    public int queryCountByName(Power power){
        return  0;
    }
    public int queryCountByNameId(Map map){
        return  0;
    }
    public int updatePowerData(Power power){
        String hql = "from Power where powerName =:powerName and powerId !=:powerId";
        Map map = new HashMap();
        map.put("powerName",power.getPowerName());
        map.put("powerId",power.getPowerId());
        if(find(hql,map).size()==0)
        {

            save(power);
            return 1;
        }
        else{
            return 0;
        }
    }
    public int removePowerData(List<Integer> list){
        for(int i : list){
            delete(i);
            return 1;
        }
        return  0;
    }

}

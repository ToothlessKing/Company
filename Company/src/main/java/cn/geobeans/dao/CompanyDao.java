    package cn.geobeans.dao;

import cn.geobeans.bean.Company;
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
    public class CompanyDao extends DaoHibernateImpl<Company,Integer> {
    
        public List queryCompanyData(Map map){
    
            DetachedCriteria dc = DetachedCriteria.forClass(Company.class);
            Criteria criteria = createCriteria();
            String companyName = (String) map.get("companyName");
            String companyId = (String) map.get("companyId");
            if(companyName!=null&&!companyName.equalsIgnoreCase("")){
                criteria.add(Restrictions.eq("companyName",companyName));
            }
            if(companyId!=null&&!companyId.equalsIgnoreCase("")){
                criteria.add(Restrictions.eq("companyId",Integer.parseInt(companyId)));
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
        public int queryCompanyCount(Map map){
            Criteria criteria = createCriteria();
            String companyName = (String) map.get("companyName");
            String companyId = (String) map.get("companyId");
            if(companyName!=null&&!companyName.equalsIgnoreCase("")){
                criteria.add(Restrictions.eq("companyName",companyName));
            }
            if(companyId!=null&&!companyId.equalsIgnoreCase("")){
                criteria.add(Restrictions.eq("companyId",Integer.parseInt(companyId)));
            }
            int count = ((Long)criteria.setProjection(Projections.rowCount()).uniqueResult()).intValue();
    
            return  count;
        }
        public int addCompanyData(Company company){
            return  0;
        }
        public int queryCountByName(Company company){
            return  0;
        }
        public int queryCountByNameId(Map map){
            return  0;
        }
        public int updateCompanyData(Company company){
            String hql = "from Company where companyName =:companyName and companyId !=:companyId";
            Map map = new HashMap();
            map.put("companyName",company.getCompanyName());
            map.put("companyId",company.getCompanyId());
            if(find(hql,map).size()==0)
            {
    
                save(company);
                return 1;
            }
            else{
                return 0;
            }
        }
        public int removeCompanyData(List<Integer> list){
            for(int i : list){
                delete(i);
                return 1;
            }
            return  0;
        }
    
    }

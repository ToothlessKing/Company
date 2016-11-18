    package cn.geobeans.dao;

    import cn.geobeans.bean.Company;
    import cn.geobeans.common.database.DaoHibernateImpl;
    import org.hibernate.Criteria;
    import org.hibernate.Query;
    import org.hibernate.criterion.DetachedCriteria;
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
            criteria.add(Restrictions.ilike("companyName","%"+companyName+"%"));
        }
        if(companyId!=null&&!companyId.equalsIgnoreCase("")){
            criteria.add(Restrictions.eq("companyId",Integer.parseInt(companyId)));
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
            criteria.add(Restrictions.ilike("companyName", "%" + companyName + "%"));
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
    public List loadTree(String id){
        String hql = "select cd.companyId,d.departmentId,d.departmentName from department d,\n" +
                "company_department cd where d.departmentId = cd.departmentId  and cd.companyId ="+id ;
        List list =getSession().createSQLQuery(hql).list();

        return list;
    }
    public int getMaxId(){
        String hql = "select max(companyId) from company";
        List list =getSession().createSQLQuery(hql).list();
        return (int)list.get(0);
    }
    public int  updateCoor(int companyId,String coor){
        String hql = "update Company c set c.companyCoordinates='"+coor+"' where id = "+companyId;
        Query query =createQuery(hql);
        return query.executeUpdate();
    }
    public int saveScope(int companyId,String scope){
        String hql = "update Company c set c.companyScopeMap='"+scope+"' where id = "+companyId;
        Query query =createQuery(hql);
        return query.executeUpdate();
    }
    public int countNode(int companyId){
        String hql = "select count(*) from company_department cd where cd.companyId ="+companyId;

        return ((Number)getSession().createSQLQuery(hql).uniqueResult()).intValue();
    }

}

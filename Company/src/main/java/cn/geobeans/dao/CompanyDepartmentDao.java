package cn.geobeans.dao;

import cn.geobeans.bean.CompanyDepartment;
import cn.geobeans.common.database.DaoHibernateImpl;
import org.hibernate.Query;
import org.springframework.stereotype.Repository;

/**
 * Created by Administrator on 2016/11/4.
 */
@Repository
public class CompanyDepartmentDao extends DaoHibernateImpl<CompanyDepartment,Integer> {

        public void remove(int companyId){
            String hql = "delete CompanyDepartment as cd where cd.companyId="+companyId;
            Query query=getSession().createQuery(hql);
            query.executeUpdate();
        }
}

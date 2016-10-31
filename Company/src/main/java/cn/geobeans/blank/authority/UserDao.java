package cn.geobeans.blank.authority;

import cn.geobeans.common.database.DaoHibernateImpl;
import org.springframework.stereotype.Repository;

/**
 * 用户数据库操作类
 * Created by Guo on 2016/8/31.
 */
@Repository
public class UserDao extends DaoHibernateImpl<User,String> {
}

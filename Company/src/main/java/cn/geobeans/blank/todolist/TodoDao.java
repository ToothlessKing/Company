package cn.geobeans.blank.todolist;

import cn.geobeans.common.database.DaoHibernateImpl;
import org.springframework.stereotype.Repository;

/**
 * Created by Guo on 2016/8/31.
 */
@Repository
public class TodoDao extends DaoHibernateImpl<Todo,String> {
}

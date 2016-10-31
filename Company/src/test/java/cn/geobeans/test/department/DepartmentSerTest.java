package cn.geobeans.test.department;


import cn.geobeans.bean.Department;
import cn.geobeans.service.DepartmentService;
import com.alibaba.fastjson.JSON;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

/**
 * 待办事项服务测试类
 * Created by Guo on 2016/8/31.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(value = {
        "classpath*:application-context.xml",
})
public class DepartmentSerTest {

    @Autowired
    DepartmentService service;

    @Test
    @Rollback(false)
    public void save() {
        Department department = new Department();
        department.setDepartmentName("我的");
        department.setDepartmentDescribe("你的");

        service.addDepartmentData(department);

    }
    @Test
    public void getAll() {
        List<Department> rs = service.getAll();
        for (Department t : rs) {
            System.out.println(JSON.toJSONString(t));
        }
    }


}

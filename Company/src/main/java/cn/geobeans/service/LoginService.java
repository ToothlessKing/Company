package cn.geobeans.service;

import cn.geobeans.bean.Employee;
import cn.geobeans.dao.LoginDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

/**
 * Created by Administrator on 2016/10/31.
 */
@Service
@Transactional
public class LoginService {


    @Autowired
    LoginDao dao;

    public Employee queryPassByUser(String username,String password){

        return  dao.queryPassByUser(username);

    }

    public Map queryPower(int employeeId){
        return dao.queryPower(employeeId);
    }

}

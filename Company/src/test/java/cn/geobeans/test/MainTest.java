package cn.geobeans.test;

import cn.geobeans.common.web.CustomException;
import cn.geobeans.common.web.CustomExceptionFactory;
import com.alibaba.fastjson.JSON;

/**
 * main 测试
 * Created by Guo on 2016/9/2.
 */
public class MainTest {
    public static void main(String[] args) {
        CustomException ex =  CustomExceptionFactory.createTokenExpectedException();
        System.out.println(JSON.toJSONString(ex));
    }
}

package cn.geobeans.service;


import cn.geobeans.bean.Power;
import cn.geobeans.dao.PowerDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2016/10/26.
 */
@Service
@Transactional
public class PowerService {

    @Autowired
    private PowerDao dao;

    public Map<String, Object> queryPowerData(Map map) {
        Map<String,Object> resultMap = new HashMap<String, Object>();
        resultMap.put("total",dao.queryPowerCount(map));
        resultMap.put("rows",dao.queryPowerData(map));


        return resultMap;
    }

    public int addPowerData(Power power) {
        if(dao.findBy("powerName",power.getPowerName()).size()==0)
        {
            dao.save(power);
            return 1;
        }
        else{
            return 0;
        }
    }

    public int updatePowerData(Power power) {
        return  dao.updatePowerData(power);
    }

    public int removePowerData(List<Integer> list)
    {
        return dao.removePowerData(list);
    }

    public List<Power> getAll(){
        return dao.getAll();
    }
}

package cn.geobeans.service;


import cn.geobeans.bean.Company;
import cn.geobeans.dao.CompanyDao;
import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2016/10/26.
 */
@Service
@Transactional
public class CompanyService {

    @Autowired
    private CompanyDao dao;

    ObjectMapper mapper = new ObjectMapper();

    public Map<String, Object> queryCompanyData(Map map) {
        Map<String,Object> resultMap = new HashMap<String, Object>();
        resultMap.put("total",dao.queryCompanyCount(map));
        resultMap.put("rows",dao.queryCompanyData(map));


        return resultMap;
    }

    public int addCompanyData(Company company) {
        if(dao.findBy("companyName",company.getCompanyName()).size()==0)
        {
            dao.save(company);
            return 1;
        }
        else{
            return 0;
        }
    }

    public int updateCompanyData(Company company) {
        return  dao.updateCompanyData(company);
    }

    public int removeCompanyData(List<Integer> list)
    {
        return dao.removeCompanyData(list);
    }

    public List<Company> getAll(){
        return dao.getAll();
    }

    public Map loadTree(Map paramMap,String companyId) throws IOException {
        Map returnMap =new HashMap<>();
        List list = new ArrayList<>();
        String json="";
        String json_point ="";
        String json_polygo = "";
        if(companyId.equalsIgnoreCase("0")){
            List<Company> companyList = dao.queryCompanyData(paramMap);
            json += "{\n" +
                    "\"type\": \"FeatureCollection\",\n" +
                    "\"crs\": { \"type\": \"name\", \"properties\": { \"name\": \"urn:ogc:def:crs:OGC:1.3:CRS84\" } },\n" +
                    "                                                                                \n" +
                    "\"features\": [";
            json_point += "{\n" +
                    "\"type\": \"FeatureCollection\",\n" +
                    "\"crs\": { \"type\": \"name\", \"properties\": { \"name\": \"urn:ogc:def:crs:OGC:1.3:CRS84\" } },\n" +
                    "                                                                                \n" +
                    "\"features\": [";
            json_polygo += "{\n" +
                    "\"type\": \"FeatureCollection\",\n" +
                    "\"crs\": { \"type\": \"name\", \"properties\": { \"name\": \"urn:ogc:def:crs:OGC:1.3:CRS84\" } },\n" +
                    "                                                                                \n" +
                    "\"features\": [";
            for(int i=0 ;i<companyList.size() ;i++){
                Map map = new HashMap<>();
                Company company = companyList.get(i);
                map.put("id",company.getCompanyId());
                map.put("companyId",company.getCompanyId());
                map.put("companyName",company.getCompanyName());
                map.put("companyAddress",company.getCompanyAddress());
                map.put("companyCoordinates",company.getCompanyCoordinates());
                map.put("companyScopeMap",company.getCompanyScopeMap());
                map.put("startTime",company.getStartTime());
                map.put("business",company.getBusiness());
                map.put("size",company.getSize());
                map.put("companyPhone",company.getCompanyPhone());
                map.put("companyType",company.getCompanyType());
                map.put("companyEmail",company.getCompanyEmail());
                int count  = dao.countNode(company.getCompanyId());
                if(count==0){
                    map.put("state","open");
                }else {
                    map.put("state","closed");
                }

                list.add(map);
                json += getJsons(company.getCompanyCoordinates(),company.getCompanyScopeMap(), company.getCompanyName());
                json_point += getJson_point(company.getCompanyCoordinates(), company.getCompanyName());
                json_polygo += getJson(company.getCompanyScopeMap(), company.getCompanyName());
            }
            json += "]\n" +
                    "}\n";
            json_point += "]\n" +
                    "}\n";
            json_polygo += "]\n" +
                    "}\n";
        }
        JSONObject jsonObject = JSONObject.parseObject(json_point);
        JSONObject jsonObject2 = JSONObject.parseObject(json_polygo);
        JSONObject jsonObject3 = JSONObject.parseObject(json);

        returnMap.put("json_point",(Map)jsonObject);
        returnMap.put("json_polygo",(Map)jsonObject2);
        returnMap.put("json",(Map)jsonObject3);
        returnMap.put("rows",list);
        returnMap.put("total",dao.queryCompanyCount(paramMap));
        return returnMap;
    }
    public List loadNode(String companyId){
        List list = new ArrayList<>();
        if(companyId.equalsIgnoreCase("0")){
            List<Company> companyList = getAll();
            for(int i=0 ;i<companyList.size() ;i++){
                Map map = new HashMap<>();
                Company company = companyList.get(i);

                map.put("companyId",company.getCompanyId());
                map.put("companyName",company.getCompanyName());
                map.put("companyAddress",company.getCompanyAddress());
                map.put("state","closed");
                list.add(map);
            }
        }
        else{

            List objList = dao.loadTree(companyId);
            for(int i=0 ;i<objList.size() ;i++){
                Object[] objects = (Object[])objList.get(i);
                Map map = new HashMap<>();
                map.put("id",String.valueOf(objects[0])+"0"+String.valueOf(objects[1]));
                map.put("companyName",(String)objects[2]);
                map.put("departmentId",String.valueOf(objects[1]));
                //map.put("companyId", " "+String.valueOf(objects[0]));
                map.put("departmentName",(String)objects[2]);
                map.put("state","open");
                list.add(map);
            }
        }
        return list;
    }
    public int getMaxId(){
        return dao.getMaxId();
    }

    public int updateCoor(int companyId,String coor){

        return dao.updateCoor(companyId, coor);
    }
    public int saveScope(int companyId,String scope){

        return dao.saveScope(companyId,scope);
    }

    public String getJson_point(String coor,String name){
        String json = "";
        if(coor!=null&&!coor.equalsIgnoreCase("")){
            json +="{ \"type\": \"Feature\", \"properties\": { \"name\": \""+name+"\" },";
            json +="\"geometry\": { \"type\": \"Point\", \"coordinates\": ["+coor+"] } },";
        }
        return json;
    }

    public String getJson(String scope,String name){
        String json = "";
//        if(coor!=null&&!coor.equalsIgnoreCase("")){
//            json +="{ \"type\": \"Feature\", \"properties\": { \"name\": \""+name+"\" },";
//            json +="\"geometry\": { \"type\": \"Point\", \"coordinates\": ["+coor+"] } },";
//        }
        if(scope!=null&&!scope.equalsIgnoreCase("")){
            json +="{ \"type\": \"Feature\", \"properties\": { \"name\": \""+name+"的业务范围"+"\" },";
            json +="\"geometry\": { \"type\": \"Polygon\", \"coordinates\": [ [ ";
            String[] scopes = scope.split("\\|");
            for(int i=0;i<scopes.length;i++){
                String str=scopes[i];
                if(i==0){
                    json += "["+scopes[i]+"]";
                }
                else{
                    json += ",["+scopes[i]+"]";
                }
            }
            json += "] ] } },";
        }
        return json;
    }
    public String getJsons(String coor,String scope,String name){
        String json = "";
        if(coor!=null&&!coor.equalsIgnoreCase("")){
            json +="{ \"type\": \"Feature\", \"properties\": { \"name\": \""+name+"\" },";
            json +="\"geometry\": { \"type\": \"Point\", \"coordinates\": ["+coor+"] } },";
        }
        if(scope!=null&&!scope.equalsIgnoreCase("")){
            json +="{ \"type\": \"Feature\", \"properties\": { \"name\": \""+name+"的业务范围"+"\" },";
            json +="\"geometry\": { \"type\": \"Polygon\", \"coordinates\": [ [ ";
            String[] scopes = scope.split("\\|");
            for(int i=0;i<scopes.length;i++){
                String str=scopes[i];
                if(i==0){
                    json += "["+scopes[i]+"]";
                }
                else{
                    json += ",["+scopes[i]+"]";
                }
            }
            json += "] ] } },";
        }
        return json;
    }

    public List loadFirmTree(String id){
        List returnList = new ArrayList<>();
        if(id.equalsIgnoreCase("0")){
            List<Company> companyList = getAll();
            for(int i=0 ;i<companyList.size();i++){
                Company company = companyList.get(i);
                Map map = new HashMap<>();
                map.put("id",company.getCompanyId());
                map.put("text",company.getCompanyName());
                map.put("companyAddress",company.getCompanyAddress());
                map.put("companyCoordinates",company.getCompanyCoordinates());
                map.put("companyScopeMap",company.getCompanyScopeMap());
                map.put("flag","company");
                int count  = dao.countNode(company.getCompanyId());
                if(count==0){
                    map.put("state","open");
                }else {
                    map.put("state","closed");
                }
                returnList.add(map);
            }

        }else{
            List objList = dao.loadTree(id);
            for(int i=0 ;i<objList.size() ;i++){
                Object[] objects = (Object[])objList.get(i);
                Map map = new HashMap<>();
                map.put("id",String.valueOf(objects[0])+"0"+String.valueOf(objects[1]));
                map.put("departmentId",String.valueOf(objects[1]));
                //map.put("companyId", " "+String.valueOf(objects[0]));
                map.put("text",(String)objects[2]);
                map.put("state","open");
                map.put("flag","department");
                returnList.add(map);
            }
        }
        return returnList;
    }
    public Map loadTreeJson(){
        String json ="";
        json += "{\n" +
                "\"type\": \"FeatureCollection\",\n" +
                "\"crs\": { \"type\": \"name\", \"properties\": { \"name\": \"urn:ogc:def:crs:OGC:1.3:CRS84\" } },\n" +
                "                                                                                \n" +
                "\"features\": [";
        List<Company> companyList = getAll();
        for(int i=0 ;i<companyList.size();i++){
            Company company = companyList.get(i);
            json += getJsons(company.getCompanyCoordinates(),company.getCompanyScopeMap(), company.getCompanyName());

        }
        json += "]\n" +
                "}\n";
        JSONObject jsonObject = JSONObject.parseObject(json);
        return (Map)jsonObject;
    }



}

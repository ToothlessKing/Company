package cn.geobeans.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.List;

/**
 * Created by Administrator on 2016/11/25.
 */
@Controller
@RequestMapping("/fileUpLoad")
public class uploadController {
    @RequestMapping(value = "/upload")
    @ResponseBody
    public String handleFormUpload(MultipartHttpServletRequest request){
        String b = request.getParameter("a");
        System.out.println(b+"aaaaaaaaaaaaaaaaaaa");
        List<MultipartFile> file = request.getFiles("file");
        String path = request.getSession().getServletContext().getRealPath("/tmp/"); // 获取本地存储路径
        System.out.println(path + "-----------------");
        System.out.println(file.size()+"=====================");
        FileOutputStream fileOutputStream = null;
        for (int i = 0; i < file.size(); i++) {
            if (!file.get(i).isEmpty()) {
                String fileName =  file.get(i).getOriginalFilename();
                String a = fileName.split("\\.")[1];
                File files = new File(path + new Date().getTime() +i+ "."+a); // 新建一个文件
                try {
                    fileOutputStream = new FileOutputStream(files);
                    fileOutputStream.write(file.get(i).getBytes());
                    System.out.println(file.get(i).getOriginalFilename()+ "-----------------");
                    System.out.println(file.get(i).getContentType()+ "-----------------");
                    fileOutputStream.flush();
                } catch (Exception e) {
                    e.printStackTrace();
                }
                if (fileOutputStream != null) { // 关闭流
                    try {
                        fileOutputStream.close();
                    } catch (IOException ie) {
                        ie.printStackTrace();
                    }
                }
            }
        }
        return "sa";
    }
}

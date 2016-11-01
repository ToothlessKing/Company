package cn.geobeans.bean;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;

/**
 * Created by Administrator on 2016/11/1.
 */
@Entity
public class Employee implements Serializable {
    private int employeeId;
    private String employeeName;
    private String employeeSex;
    private String employeePhone;
    private String employeeEmail;
    private String password;

    @Id
    @Column(name = "employeeId")
    public int getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(int employeeId) {
        this.employeeId = employeeId;
    }

    @Basic
    @Column(name = "employeeName")
    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    @Basic
    @Column(name = "employeeSex")
    public String getEmployeeSex() {
        return employeeSex;
    }

    public void setEmployeeSex(String employeeSex) {
        this.employeeSex = employeeSex;
    }

    @Basic
    @Column(name = "employeePhone")
    public String getEmployeePhone() {
        return employeePhone;
    }

    public void setEmployeePhone(String employeePhone) {
        this.employeePhone = employeePhone;
    }

    @Basic
    @Column(name = "employeeEmail")
    public String getEmployeeEmail() {
        return employeeEmail;
    }

    public void setEmployeeEmail(String employeeEmail) {
        this.employeeEmail = employeeEmail;
    }

    @Basic
    @Column(name = "password")
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Employee employee = (Employee) o;

        if (employeeId != employee.employeeId) return false;
        if (employeeEmail != null ? !employeeEmail.equals(employee.employeeEmail) : employee.employeeEmail != null)
            return false;
        if (employeeName != null ? !employeeName.equals(employee.employeeName) : employee.employeeName != null)
            return false;
        if (employeePhone != null ? !employeePhone.equals(employee.employeePhone) : employee.employeePhone != null)
            return false;
        if (employeeSex != null ? !employeeSex.equals(employee.employeeSex) : employee.employeeSex != null)
            return false;
        if (password != null ? !password.equals(employee.password) : employee.password != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = employeeId;
        result = 31 * result + (employeeName != null ? employeeName.hashCode() : 0);
        result = 31 * result + (employeeSex != null ? employeeSex.hashCode() : 0);
        result = 31 * result + (employeePhone != null ? employeePhone.hashCode() : 0);
        result = 31 * result + (employeeEmail != null ? employeeEmail.hashCode() : 0);
        result = 31 * result + (password != null ? password.hashCode() : 0);
        return result;
    }
}

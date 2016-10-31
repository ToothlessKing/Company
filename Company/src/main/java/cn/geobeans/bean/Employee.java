package cn.geobeans.bean;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Created by LichKing on 2016/10/30.
 */
@Entity
public class Employee {
    private int employeeId;
    private String employeeName;
    private int departmentId;
    private int companyId;
    private String employeeSex;
    private String employeePhone;
    private String employeeEmail;
    private String roleName;
    private String password;
    private String departmentName;
    private String companyName;
    private int roleId;

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
    @Column(name = "departmentId")
    public int getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(int departmentId) {
        this.departmentId = departmentId;
    }

    @Basic
    @Column(name = "companyId")
    public int getCompanyId() {
        return companyId;
    }

    public void setCompanyId(int companyId) {
        this.companyId = companyId;
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
    @Column(name = "roleName")
    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    @Basic
    @Column(name = "password")
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Basic
    @Column(name = "departmentName")
    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    @Basic
    @Column(name = "companyName")
    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    @Basic
    @Column(name = "roleId")
    public int getRoleId() {
        return roleId;
    }

    public void setRoleId(int roleId) {
        this.roleId = roleId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Employee employee = (Employee) o;

        if (employeeId != employee.employeeId) return false;
        if (departmentId != employee.departmentId) return false;
        if (companyId != employee.companyId) return false;
        if (roleId != employee.roleId) return false;
        if (employeeName != null ? !employeeName.equals(employee.employeeName) : employee.employeeName != null)
            return false;
        if (employeeSex != null ? !employeeSex.equals(employee.employeeSex) : employee.employeeSex != null)
            return false;
        if (employeePhone != null ? !employeePhone.equals(employee.employeePhone) : employee.employeePhone != null)
            return false;
        if (employeeEmail != null ? !employeeEmail.equals(employee.employeeEmail) : employee.employeeEmail != null)
            return false;
        if (roleName != null ? !roleName.equals(employee.roleName) : employee.roleName != null) return false;
        if (password != null ? !password.equals(employee.password) : employee.password != null) return false;
        if (departmentName != null ? !departmentName.equals(employee.departmentName) : employee.departmentName != null)
            return false;
        if (companyName != null ? !companyName.equals(employee.companyName) : employee.companyName != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = employeeId;
        result = 31 * result + (employeeName != null ? employeeName.hashCode() : 0);
        result = 31 * result + departmentId;
        result = 31 * result + companyId;
        result = 31 * result + (employeeSex != null ? employeeSex.hashCode() : 0);
        result = 31 * result + (employeePhone != null ? employeePhone.hashCode() : 0);
        result = 31 * result + (employeeEmail != null ? employeeEmail.hashCode() : 0);
        result = 31 * result + (roleName != null ? roleName.hashCode() : 0);
        result = 31 * result + (password != null ? password.hashCode() : 0);
        result = 31 * result + (departmentName != null ? departmentName.hashCode() : 0);
        result = 31 * result + (companyName != null ? companyName.hashCode() : 0);
        result = 31 * result + roleId;
        return result;
    }
}

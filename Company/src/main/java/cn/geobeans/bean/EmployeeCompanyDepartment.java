package cn.geobeans.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by Administrator on 2016/11/1.
 */
@Entity
@Table(name = "employee_company_department", schema = "", catalog = "db_company")
public class EmployeeCompanyDepartment {
    private int employeeId;
    private int companyId;
    private int departmentId;

    @Column(name = "companyId")
    public int getCompanyId() {
        return companyId;
    }

    public void setCompanyId(int companyId) {
        this.companyId = companyId;
    }
    @Column(name = "departmentId")
    public int getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(int departmentId) {
        this.departmentId = departmentId;
    }

    @Id
    @Column(name = "employeeId")
    public int getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(int employeeId) {
        this.employeeId = employeeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        EmployeeCompanyDepartment that = (EmployeeCompanyDepartment) o;

        if (employeeId != that.employeeId) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return employeeId;
    }
}

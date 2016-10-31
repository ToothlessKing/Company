package cn.geobeans.bean;

import javax.persistence.*;

/**
 * Created by LichKing on 2016/10/30.
 */
@Entity
@Table(name = "company_department", schema = "db_company", catalog = "")
@IdClass(CompanyDepartmentPK.class)
public class CompanyDepartment {
    private int companyId;
    private int departmentId;

    @Id
    @Column(name = "companyId")
    public int getCompanyId() {
        return companyId;
    }

    public void setCompanyId(int companyId) {
        this.companyId = companyId;
    }

    @Id
    @Column(name = "departmentId")
    public int getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(int departmentId) {
        this.departmentId = departmentId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        CompanyDepartment that = (CompanyDepartment) o;

        if (companyId != that.companyId) return false;
        if (departmentId != that.departmentId) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = companyId;
        result = 31 * result + departmentId;
        return result;
    }
}

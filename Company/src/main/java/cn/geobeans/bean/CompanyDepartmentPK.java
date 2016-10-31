package cn.geobeans.bean;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;

/**
 * Created by LichKing on 2016/10/30.
 */
public class CompanyDepartmentPK implements Serializable {
    private int companyId;
    private int departmentId;

    @Column(name = "companyId")
    @Id
    public int getCompanyId() {
        return companyId;
    }

    public void setCompanyId(int companyId) {
        this.companyId = companyId;
    }

    @Column(name = "departmentId")
    @Id
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

        CompanyDepartmentPK that = (CompanyDepartmentPK) o;

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

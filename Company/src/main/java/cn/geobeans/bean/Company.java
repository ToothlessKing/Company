package cn.geobeans.bean;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Created by Administrator on 2016/11/1.
 */
@Entity
public class Company {
    private int companyId;
    private String companyName;
    private String companyAddress;
    private String companyCoordinates;
    private String companyScope;
    private String companyScopeMap;

    @Id
    @Column(name = "companyId")
    public int getCompanyId() {
        return companyId;
    }

    public void setCompanyId(int companyId) {
        this.companyId = companyId;
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
    @Column(name = "companyAddress")
    public String getCompanyAddress() {
        return companyAddress;
    }

    public void setCompanyAddress(String companyAddress) {
        this.companyAddress = companyAddress;
    }

    @Basic
    @Column(name = "companyCoordinates")
    public String getCompanyCoordinates() {
        return companyCoordinates;
    }

    public void setCompanyCoordinates(String companyCoordinates) {
        this.companyCoordinates = companyCoordinates;
    }

    @Basic
    @Column(name = "companyScope")
    public String getCompanyScope() {
        return companyScope;
    }

    public void setCompanyScope(String companyScope) {
        this.companyScope = companyScope;
    }

    @Basic
    @Column(name = "companyScopeMap")
    public String getCompanyScopeMap() {
        return companyScopeMap;
    }

    public void setCompanyScopeMap(String companyScopeMap) {
        this.companyScopeMap = companyScopeMap;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Company company = (Company) o;

        if (companyId != company.companyId) return false;
        if (companyAddress != null ? !companyAddress.equals(company.companyAddress) : company.companyAddress != null)
            return false;
        if (companyCoordinates != null ? !companyCoordinates.equals(company.companyCoordinates) : company.companyCoordinates != null)
            return false;
        if (companyName != null ? !companyName.equals(company.companyName) : company.companyName != null) return false;
        if (companyScope != null ? !companyScope.equals(company.companyScope) : company.companyScope != null)
            return false;
        if (companyScopeMap != null ? !companyScopeMap.equals(company.companyScopeMap) : company.companyScopeMap != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = companyId;
        result = 31 * result + (companyName != null ? companyName.hashCode() : 0);
        result = 31 * result + (companyAddress != null ? companyAddress.hashCode() : 0);
        result = 31 * result + (companyCoordinates != null ? companyCoordinates.hashCode() : 0);
        result = 31 * result + (companyScope != null ? companyScope.hashCode() : 0);
        result = 31 * result + (companyScopeMap != null ? companyScopeMap.hashCode() : 0);
        return result;
    }
}

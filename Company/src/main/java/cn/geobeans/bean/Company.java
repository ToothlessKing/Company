package cn.geobeans.bean;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Created by Administrator on 2016/11/18.
 */
@Entity
public class Company {
    private int companyId;
    private String companyName;
    private String companyAddress;
    private String companyCoordinates;
    private String companyScope;
    private String companyScopeMap;
    private String companyEmail;
    private String companyType;
    private String companyPhone;
    private String startTime;
    private String size;
    private String business;

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

    @Basic
    @Column(name = "companyEmail")
    public String getCompanyEmail() {
        return companyEmail;
    }

    public void setCompanyEmail(String companyEmail) {
        this.companyEmail = companyEmail;
    }

    @Basic
    @Column(name = "companyType")
    public String getCompanyType() {
        return companyType;
    }

    public void setCompanyType(String companyType) {
        this.companyType = companyType;
    }

    @Basic
    @Column(name = "companyPhone")
    public String getCompanyPhone() {
        return companyPhone;
    }

    public void setCompanyPhone(String companyPhone) {
        this.companyPhone = companyPhone;
    }

    @Basic
    @Column(name = "startTime")
    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    @Basic
    @Column(name = "size")
    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    @Basic
    @Column(name = "business")
    public String getBusiness() {
        return business;
    }

    public void setBusiness(String business) {
        this.business = business;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Company company = (Company) o;

        if (companyId != company.companyId) return false;
        if (business != null ? !business.equals(company.business) : company.business != null) return false;
        if (companyAddress != null ? !companyAddress.equals(company.companyAddress) : company.companyAddress != null)
            return false;
        if (companyCoordinates != null ? !companyCoordinates.equals(company.companyCoordinates) : company.companyCoordinates != null)
            return false;
        if (companyEmail != null ? !companyEmail.equals(company.companyEmail) : company.companyEmail != null)
            return false;
        if (companyName != null ? !companyName.equals(company.companyName) : company.companyName != null) return false;
        if (companyPhone != null ? !companyPhone.equals(company.companyPhone) : company.companyPhone != null)
            return false;
        if (companyScope != null ? !companyScope.equals(company.companyScope) : company.companyScope != null)
            return false;
        if (companyScopeMap != null ? !companyScopeMap.equals(company.companyScopeMap) : company.companyScopeMap != null)
            return false;
        if (companyType != null ? !companyType.equals(company.companyType) : company.companyType != null) return false;
        if (size != null ? !size.equals(company.size) : company.size != null) return false;
        if (startTime != null ? !startTime.equals(company.startTime) : company.startTime != null) return false;

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
        result = 31 * result + (companyEmail != null ? companyEmail.hashCode() : 0);
        result = 31 * result + (companyType != null ? companyType.hashCode() : 0);
        result = 31 * result + (companyPhone != null ? companyPhone.hashCode() : 0);
        result = 31 * result + (startTime != null ? startTime.hashCode() : 0);
        result = 31 * result + (size != null ? size.hashCode() : 0);
        result = 31 * result + (business != null ? business.hashCode() : 0);
        return result;
    }
}

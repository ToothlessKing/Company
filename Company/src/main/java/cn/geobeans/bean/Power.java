package cn.geobeans.bean;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Created by Administrator on 2016/11/1.
 */
@Entity
public class Power {
    private String powerName;
    private String powerAction;
    private String powerScope;
    private int powerId;

    @Basic
    @Column(name = "powerName")
    public String getPowerName() {
        return powerName;
    }

    public void setPowerName(String powerName) {
        this.powerName = powerName;
    }

    @Basic
    @Column(name = "powerAction")
    public String getPowerAction() {
        return powerAction;
    }

    public void setPowerAction(String powerAction) {
        this.powerAction = powerAction;
    }

    @Id
    @Column(name = "powerId")
    public int getPowerId() {
        return powerId;
    }

    public void setPowerId(int powerId) {
        this.powerId = powerId;
    }
    @Basic
    @Column(name = "powerScope")
    public String getPowerScope() {
        return powerScope;
    }

    public void setPowerScope(String powerScope) {
        this.powerScope = powerScope;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Power power = (Power) o;

        if (powerId != power.powerId) return false;
        if (powerAction != null ? !powerAction.equals(power.powerAction) : power.powerAction != null) return false;
        if (powerName != null ? !powerName.equals(power.powerName) : power.powerName != null) return false;
        if (powerScope != null ? !powerScope.equals(power.powerScope) : power.powerScope != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = powerName != null ? powerName.hashCode() : 0;
        result = 31 * result + (powerAction != null ? powerAction.hashCode() : 0);
        result = 31 * result + (powerScope != null ? powerScope.hashCode() : 0);
        result = 31 * result + powerId;
        return result;
    }
}

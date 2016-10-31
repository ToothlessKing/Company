package cn.geobeans.bean;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Created by LichKing on 2016/10/30.
 */
@Entity
public class Power {
    private String powerName;
    private String powerAction;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Power power = (Power) o;

        if (powerId != power.powerId) return false;
        if (powerName != null ? !powerName.equals(power.powerName) : power.powerName != null) return false;
        if (powerAction != null ? !powerAction.equals(power.powerAction) : power.powerAction != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = powerName != null ? powerName.hashCode() : 0;
        result = 31 * result + (powerAction != null ? powerAction.hashCode() : 0);
        result = 31 * result + powerId;
        return result;
    }
}

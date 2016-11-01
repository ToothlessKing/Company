package cn.geobeans.bean;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 * Created by Administrator on 2016/11/1.
 */
@Entity
@Table(name = "blank_user", schema = "", catalog = "db_company")
public class BlankUser {
    private String id;
    private Timestamp createTime;
    private Timestamp updateTime;
    private String name;
    private String password;
    private String username;

    @Id
    @Column(name = "id")
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Basic
    @Column(name = "create_time")
    public Timestamp getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }

    @Basic
    @Column(name = "update_time")
    public Timestamp getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Timestamp updateTime) {
        this.updateTime = updateTime;
    }

    @Basic
    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
    @Column(name = "username")
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        BlankUser blankUser = (BlankUser) o;

        if (createTime != null ? !createTime.equals(blankUser.createTime) : blankUser.createTime != null) return false;
        if (id != null ? !id.equals(blankUser.id) : blankUser.id != null) return false;
        if (name != null ? !name.equals(blankUser.name) : blankUser.name != null) return false;
        if (password != null ? !password.equals(blankUser.password) : blankUser.password != null) return false;
        if (updateTime != null ? !updateTime.equals(blankUser.updateTime) : blankUser.updateTime != null) return false;
        if (username != null ? !username.equals(blankUser.username) : blankUser.username != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (createTime != null ? createTime.hashCode() : 0);
        result = 31 * result + (updateTime != null ? updateTime.hashCode() : 0);
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (password != null ? password.hashCode() : 0);
        result = 31 * result + (username != null ? username.hashCode() : 0);
        return result;
    }
}

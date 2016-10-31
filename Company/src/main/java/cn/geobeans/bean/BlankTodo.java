package cn.geobeans.bean;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 * Created by LichKing on 2016/10/30.
 */
@Entity
@Table(name = "blank_todo", schema = "db_company", catalog = "")
public class BlankTodo {
    private String id;
    private Timestamp createTime;
    private Timestamp updateTime;
    private String content;
    private Integer status;

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
    @Column(name = "content")
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Basic
    @Column(name = "status")
    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        BlankTodo blankTodo = (BlankTodo) o;

        if (id != null ? !id.equals(blankTodo.id) : blankTodo.id != null) return false;
        if (createTime != null ? !createTime.equals(blankTodo.createTime) : blankTodo.createTime != null) return false;
        if (updateTime != null ? !updateTime.equals(blankTodo.updateTime) : blankTodo.updateTime != null) return false;
        if (content != null ? !content.equals(blankTodo.content) : blankTodo.content != null) return false;
        if (status != null ? !status.equals(blankTodo.status) : blankTodo.status != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (createTime != null ? createTime.hashCode() : 0);
        result = 31 * result + (updateTime != null ? updateTime.hashCode() : 0);
        result = 31 * result + (content != null ? content.hashCode() : 0);
        result = 31 * result + (status != null ? status.hashCode() : 0);
        return result;
    }
}

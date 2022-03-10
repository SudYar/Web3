package sudyar.web3.bean;


import javax.persistence.*;
import java.io.Serializable;


@Entity
@Table(name= "dots")
public class Dot implements Serializable {

    @Id
    @SequenceGenerator( name = "genSeqDot", sequenceName = "seq_dot", allocationSize = 1, initialValue = 1 )
    @GeneratedValue(generator = "genSeqDot")
    private long id;
    @Column(name = "x", nullable = false)
    private double x;
    @Column(name = "y", nullable = false)
    private double y;
    @Column(name = "r", nullable = false)
    private double r;
    @Column(name = "res", nullable = false)
    private boolean res;


    public Dot() {
    }

    public Dot(double x, double y, double r, boolean res) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.res = res;
    }

    //    getters and setters

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public boolean isRes() {
        return res;
    }

    public void setRes(boolean res) {
        this.res = res;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}

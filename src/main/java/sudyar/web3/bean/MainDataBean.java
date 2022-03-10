package sudyar.web3.bean;

import javax.annotation.PostConstruct;
import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.transaction.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@ManagedBean(name = "mainDataBean", eager = true)
@ApplicationScoped
public class MainDataBean implements Serializable {

    private List<Dot> dots = new ArrayList<>();
    private Dot newDot = new Dot();;
    private DTBController db = new DTBController();

//    @PostConstruct
//    public void init(){
//        dots = new ArrayList<>();
//        dots = db.getDotsFromDTB();
////        db = new DTBController();
//    }

    public Dot getNewDot() {
        return newDot;
    }

    public void setNewDot(Dot newDot) {
        this.newDot = newDot;
    }

    public List<Dot> getDots() {
        List<Dot> updateDots = db.getDotsFromDTB();
        if (updateDots != null) dots = updateDots;
        return dots;
    }

    public void addDot()  {
        Dot newDot2 = new Dot();
        newDot2.setX(newDot.getX());
        newDot2.setY(newDot.getY());
        newDot2.setR(newDot.getR());
        newDot2.setRes(checkHit(newDot2));
        dots.add(newDot2);
        try {
            db.addDotToDTB(newDot2);
        }catch (Exception e){
            db.addDotToDTB(newDot2);
        }
    }


    public void setDots(List<Dot> dots) {
        this.dots = dots;
    }

    private boolean checkHit(Dot dot){
        double x = dot.getX();
        double y = dot.getY();
        double r = dot.getR();
        if (x>0 && y>0) return false;
        if ((x>0 && y<=0) && (Math.pow(x,2) + Math.pow(y,2) > Math.pow(r/2,2))) return false;
        if ((x<=0 && y<=0) && ((x < -r) || (y < (-r)/2))) return false;
        if ((x<=0 && y>0) && (y > (2*x + r))) return false;
        return true;
    }

    public void clearAll() {
        dots.clear();
        db.clearAll();
    }

//    public DTBController getDb() {
//        return db;
//    }
//
//    public void setDb(DTBController db) {
//        this.db = db;
//    }
}

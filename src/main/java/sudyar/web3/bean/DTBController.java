package sudyar.web3.bean;

import sudyar.web3.bean.Dot;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

public class DTBController {

    private static final EntityManagerFactory emf = Persistence.createEntityManagerFactory("postgresql");


    public void addDotToDTB(Dot dot) {
        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();
        em.persist(dot);
        em.getTransaction().commit();
    }

    public List<Dot> getDotsFromDTB() {
        EntityManager em = emf.createEntityManager();
        if (em == null) return new ArrayList<>();
        else {
            Query query = em.createQuery("select dot from Dot dot");
            return query.getResultList();
        }
    }

    public void clearAll() {
        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();
        em.createQuery("delete from Dot").executeUpdate();
        em.getTransaction().commit();

    }
}

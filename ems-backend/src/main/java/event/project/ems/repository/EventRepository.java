package event.project.ems.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import event.project.ems.entity.Event;

public interface EventRepository extends JpaRepository<Event, Long>{
    
}

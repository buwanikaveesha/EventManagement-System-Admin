package event.project.ems.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import event.project.ems.dto.EventDto;
import event.project.ems.service.EventService;
import lombok.AllArgsConstructor;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/event") 

public class EventController {

   
    private EventService eventService;

    //Build add Event REST API
    @PostMapping
    public ResponseEntity<EventDto> createEvent(@RequestBody EventDto eventDto){
        EventDto saEvedEvent = eventService.createEvent(eventDto);
        return new ResponseEntity<>(saEvedEvent, HttpStatus.CREATED);
    }

    //Build Get Event REST API
    @GetMapping("{id}")
    public ResponseEntity<EventDto> getEventById(@PathVariable("id") Long eventId){
        EventDto eventDto = eventService.getEventById(eventId);
        return ResponseEntity.ok(eventDto);
    }

    //Build Get All Events REST API
    @GetMapping
    public ResponseEntity<List<EventDto>> getAllEvents(){
        List<EventDto> events = eventService.getAllEvents();
        return ResponseEntity.ok(events);
    }

    //Build Update  Employee REST API
    @PutMapping("{id}")
    public ResponseEntity<EventDto> updateEvent(@PathVariable("id") Long eventId, 
                                                @RequestBody  EventDto updateEvent){
        EventDto eventDto = eventService.updateEvent(eventId, updateEvent);
        return ResponseEntity.ok(eventDto);
    }

     //Build Delete Employee REST API
     @DeleteMapping("{id}")
     public ResponseEntity<String> deleteEvent(@PathVariable("id") Long eventId){
        eventService.deleteEvent(eventId);
         return ResponseEntity.ok("Event deleted successfully!.");
     }
}

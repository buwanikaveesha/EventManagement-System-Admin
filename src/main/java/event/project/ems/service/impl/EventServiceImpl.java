package event.project.ems.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import event.project.ems.dto.EventDto;
import event.project.ems.entity.Event;
import event.project.ems.exception.ResourceNotFoundException;
import event.project.ems.mapper.EventMapper;
import event.project.ems.repository.EventRepository;
import event.project.ems.service.EventService;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;

    @Override
    public EventDto createEvent(EventDto eventDto) {
        Event event = EventMapper.mapToEvent(eventDto);
        // Save event to repository
       
        Event savedEvent = eventRepository.save(event);
        return EventMapper.mapToEventDto(savedEvent);
    }

    @Override
    public EventDto getEventById(Long eventId) {
       
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event does not exist with ID: " + eventId));
        return EventMapper.mapToEventDto(event);
    }

      @Override
    public List<EventDto> getAllEvents() {
        List<Event> events = eventRepository.findAll();
        return events.stream()
                .map(EventMapper::mapToEventDto)
                .collect(Collectors.toList());
    }

    @Override
    public EventDto updateEvent(Long eventId, EventDto updateEvent) {
       
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event is not exist with the given ID: " + eventId));
    
        event.setEventName(updateEvent.getEventName());
        event.setDescription(updateEvent.getDescription());
        event.setLocation(updateEvent.getLocation());
    
        Event updatedEventObj = eventRepository.save(event);
        return EventMapper.mapToEventDto(updatedEventObj);
    }

   
    @Override
    public void deleteEvent(Long eventId) {

        
        @SuppressWarnings("unused")
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event is not exists with the given ID: " + eventId));
    
        eventRepository.deleteById(eventId);
    }

    
}

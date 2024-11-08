package event.project.ems.service;

import java.util.List; // Import the correct List class
import event.project.ems.dto.EventDto;

public interface EventService {
    EventDto createEvent(EventDto eventDto);

    EventDto getEventById(Long eventId);

    List<EventDto> getAllEvents();

    EventDto updateEvent(Long eventId, EventDto updatedEvent);

    void deleteEvent(Long eventId);
}

package event.project.ems.mapper;

import event.project.ems.dto.EventDto;
import event.project.ems.entity.Event;

public class EventMapper {

    public static EventDto mapToEventDto(Event event){
        return new EventDto(event.getId(),
         event.getEventName(),
          event.getDescription(), 
          event.getLocation()
        );
    }

    public static Event mapToEvent(EventDto eventDto){
        return new Event(
            eventDto.getId(),
            eventDto.getEventName(),
            eventDto.getDescription(),
            eventDto.getLocation()
        );
    }
}

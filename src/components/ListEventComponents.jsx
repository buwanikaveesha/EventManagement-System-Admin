import React, {useEffect, useState} from 'react'
import { deleteEvent, listEvents } from '../services/eventService'
import { useNavigate } from 'react-router-dom'

const ListEventComponents = () => {

    const [events, setEvents] = useState([])

    const navigator = useNavigate();

    useEffect(() => {
      getAllEvents();

    }, [])

    function getAllEvents(){
        listEvents().then((response) => {
            setEvents(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewEvent(){
            navigator('/add-event')
    }

    function updateEvent(id){
        navigator(`/edit-event/${id}`)
    }

    function removeEvent(id){
        console.log(id);

        deleteEvent(id).then((response) =>{
            getAllEvents();
        }).catch(error => {
            console.error(error);
        })
    }

    function viewEvent(id){
        navigator(`/view-event/${id}`); 
    }

    return (
        <div className='container'>
            
            <h2 className='text-center'>List of Events</h2>
            <button className='btn btn-primary mb-2' onClick={addNewEvent}>Add Event</button> 
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Event Name</th>
                        <th>Description</th>
                        <th>Location</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map(event =>
                        <tr key={event.id}>
                            <td>{event.id}</td>
                            <td>{event.eventName}</td>
                            <td>{event.description}</td>
                            <td>{event.location}</td>
                            <td>
                                
                                <button className='btn btn-info' onClick={() => updateEvent(event.id)}>Update</button>
                                
                                <button className='btn btn-danger' onClick={() => removeEvent(event.id)}
                                    style={{marginLeft: '10px'}}
                                >Delete</button>

                                <button className='btn btn-info' onClick={() => viewEvent(event.id)}
                                    style={{marginLeft: '10px'}}
                                >View</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ListEventComponents
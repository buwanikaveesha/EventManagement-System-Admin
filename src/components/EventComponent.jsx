import React, { useEffect, useState } from 'react';
import { createEvent, getEvent, updateEvent } from '../services/eventService'; // Assuming you have an updateEvent function
import { useNavigate, useParams } from 'react-router-dom';

const EventComponent = () => {
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState({
    eventName: '',
    description: '',
    location: ''
  });

  const {id} = useParams();
  const navigator = useNavigate();

  useEffect(() => {

    if (id) {
      getEvent(id).then((response) => {
          setEventName(response.data.eventName);
          setDescription(response.data.description);
          setLocation(response.data.location);
        }).catch(error => {
          console.error(error);
          
        })
    }
  }, [id]); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    const sanitizedValue = value || '';
    if (name === 'eventName') setEventName(sanitizedValue);
    else if (name === 'description') setDescription(sanitizedValue);
    else if (name === 'location') setLocation(sanitizedValue);
  };

  const saveEvent = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const event = { eventName, description, location };

      if (id) {
        // If ID exists, it's an update
        updateEvent(id, event)
          .then((response) => {
            console.log(response.data);
            navigator('/event');
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        // If ID does not exist, it's a creation
        createEvent(event)
          .then((response) => {
            console.log(response.data);
            navigator('/event');
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  };

  const validateForm = () => {
    let valid = true;
    const errorsCopy = { ...errors };

    if (!eventName.trim()) {
      errorsCopy.eventName = 'Event name is required';
      valid = false;
    } else {
      errorsCopy.eventName = '';
    }

    if (!description.trim()) {
      errorsCopy.description = 'Description is required';
      valid = false;
    } else {
      errorsCopy.description = '';
    }

    if (!location.trim()) {
      errorsCopy.location = 'Location is required';
      valid = false;
    } else {
      errorsCopy.location = '';
    }

    setErrors(errorsCopy);

    return valid;
  };

  function pageTitle() {
    if(id){
      return <h2 className='text-center'>Update Event</h2>
    }else{
      return <h2 className='text-center'>Add Event</h2>
    }
     
  }

  return (
    <div className='container'>
      <br/><br/>
      <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
          {
            pageTitle()
          }
          <div className='card-body'>
            <form onSubmit={saveEvent}>
              <div className='form-group mb-2'>
                <label className='form-label'>Event Name</label>
                <input
                  type='text'
                  placeholder='Enter event Name'
                  name='eventName'
                  value={eventName}
                  className={`form-control ${errors.eventName ? 'is-invalid' : ''}`}
                  onChange={handleInputChange}
                />
                {errors.eventName && <div className='invalid-feedback'>{errors.eventName}</div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Description</label>
                <input
                  type='text'
                  placeholder='Enter description'
                  name='description'
                  value={description}
                  className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  onChange={handleInputChange}
                />
                {errors.description && <div className='invalid-feedback'>{errors.description}</div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Location</label>
                <input
                  type='text'
                  placeholder='Enter location'
                  name='location'
                  value={location}
                  className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                  onChange={handleInputChange}
                />
                {errors.location && <div className='invalid-feedback'>{errors.location}</div>}
              </div>

              <button className='btn btn-success'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventComponent;

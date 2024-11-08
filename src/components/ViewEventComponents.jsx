import React, { useEffect, useState } from 'react';
import { getEvent } from '../services/eventService';
import { useParams } from 'react-router-dom';
import { pdf } from '@react-pdf/renderer';
import generatePdfDocument from './generatePdfDocument'; // Import the generatePdfDocument function

const ViewEventComponents = () => {
  const [event, setEvent] = useState({});
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getEvent(id)
        .then(res => {
          setEvent(res.data);
        })
        .catch(error => {
          console.error('Error fetching event:', error);
        });
    }
  }, [id]);

  const handleDownloadPdf = () => {
    const pdfDocument = generatePdfDocument(event);
    const blobPromise = pdf(pdfDocument).toBlob();
    blobPromise.then(blob => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'event_details.pdf';
      link.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div>
      <br />
      <br/><br/>
      <div className='card col-md-6 offset-md-3'>
        <h3 className='text-center'>View Event Details</h3>
        <div className='card-body'>
          <div className='row'>
            <div className='col'>
              <label><strong>Event Name : </strong></label> {event.eventName}
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <label><strong>Description : </strong></label> {event.description}
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <label><strong>Location : </strong></label> {event.location}
            </div>
          </div>
        </div>
      </div>
      <br/>
      <button style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px', marginLeft: '680px' }} onClick={handleDownloadPdf}>Download PDF</button>
    </div>
  );
};

export default ViewEventComponents;

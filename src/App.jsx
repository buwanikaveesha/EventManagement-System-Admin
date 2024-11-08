import './App.css';
import EventComponent from './components/EventComponent';
import { FooterComponent } from './components/FooterComponent';
import { HeaderComponent } from './components/HeaderComponent';

import ListEventComponents from './components/ListEventComponents';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ViewEventComponents from './components/ViewEventComponents';


function App() {
    return (
        <>
            <BrowserRouter>
                <HeaderComponent />
                <Routes>
                    {/* http://localhost:3000 */}
                    <Route path='/' element={<ListEventComponents />} />
                    {/* http://localhost:3000/event */}
                    <Route path='/event' element={<ListEventComponents />} />
                    {/* http://localhost:3000/add-event */}
                    <Route path='/add-event' element={<EventComponent />} />

                     {/* http://localhost:3000/edit-event/1 */}
                     <Route path='/edit-event/:id' element={<EventComponent />} />

                     <Route path='/view-event/:id' element={<ViewEventComponents />} />

                </Routes>
                <FooterComponent />
            </BrowserRouter>
        </>
    );
}

export default App;
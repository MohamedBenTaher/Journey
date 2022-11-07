import React from 'react'
import { useSelector } from 'react-redux';
function Event() {
  const  {events,isLoading} = useSelector((state) => state.events);
  console.log('events',events)
  return (
    <><div>{events}</div><div>Event</div></>
  )
}

export default Event
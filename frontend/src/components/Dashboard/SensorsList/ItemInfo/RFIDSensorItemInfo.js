import React from 'react'

export default function RFIDSensorItemInfo ({ sensorData, classes, handleRemoveClick }) {
  return (
    <>
      {sensorData.lastTag.type} {sensorData.lastTag.id} <br />
      {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(sensorData.lastTag.timestamp)}
    </>
  )
}

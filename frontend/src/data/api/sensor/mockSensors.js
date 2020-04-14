const mockSensors = {
  temperatureSensors: [
    {
      id: 1,
      type: 'temperatureSensor',
      value: 21
    },
    {
      id: 9,
      type: 'temperatureSensor',
      value: 22,
      mapPosition: {
        x: 40,
        y: 60
      }
    },
    {
      id: 10,
      type: 'temperatureSensor',
      value: 22,
      mapPosition: {
        x: 77,
        y: 56
      }
    },
    {
      id: 11,
      type: 'temperatureSensor',
      value: 24,
      mapPosition: {
        x: 40,
        y: 23
      }
    },
    {
      id: 12,
      type: 'temperatureSensor',
      value: 19.3,
      mapPosition: {
        x: 0,
        y: 0
      }
    },
    {
      id: 13,
      type: 'temperatureSensor',
      value: 21,
      mapPosition: {
        x: 35,
        y: 77
      }
    }
  ],
  windowSensors: [
    {
      id: 2,
      type: 'windowSensor',
      status: 'open'
    }
  ],
  windowBlinds: [
    {
      id: 3,
      type: 'windowBlind',
      position: 90
    }
  ],
  RFIDSensors: [
    {
      id: 4,
      type: 'RFIDSensor',
      lastTag: {
        id: 1,
        type: 'RFIDTag',
        timestamp: 1584470245
      }
    }
  ],
  smokeSensors: [
    {
      id: 5,
      type: 'smokeSensor',
      isSmokeDetected: true
    },
    {
      id: 12,
      type: 'smokeSensor',
      isSmokeDetected: true,
      mapPosition: {
        x: 88,
        y: 43
      }
    }
  ],
  lights: [
    {
      id: 6,
      type: 'RGBLight',
      hue: 17,
      saturation: 40,
      value: 32
    }
  ]
}

export default mockSensors

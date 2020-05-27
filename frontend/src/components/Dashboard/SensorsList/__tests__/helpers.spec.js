import { divideSensors, isSensorsListEmpty } from '../helpers'

describe('Sensors list helper functions test', () => {
  describe('divideSensors', () => {
    test('should divide sensors list into objects with lists', () => {
      const mockSensors = {
        temperatureSensors: [
          {
            id: 1,
            type: 'TEMPERATURE_SENSOR',
            value: 21
          },
          {
            id: 10,
            type: 'TEMPERATURE_SENSOR',
            value: 22,
            mapPosition: {
              x: 77,
              y: 56
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
        lights: [
          {
            id: 6,
            type: 'LED_CONTROLLER',
            hue: 17,
            saturation: 40,
            value: 32
          }
        ]
      }

      const { connectedSensors, notConnectedSensors } = divideSensors(mockSensors)
      let connectedSensorsLength = 0
      for (const key in connectedSensors) {
        connectedSensorsLength += connectedSensors[key].length
      }
      expect(connectedSensorsLength).toBe(1)

      let notConnectedSensorsLength = 0
      for (const key in notConnectedSensors) {
        notConnectedSensorsLength += notConnectedSensors[key].length
      }
      expect(notConnectedSensorsLength).toBe(3)
    })
  })

  describe('isSensorsListEmpty', () => {
    test('should return true if sensorsList is empty', () => {
      const mockSensors = {
        temperatureSensors: [],
        windowSensors: [],
        windowBlinds: [],
        RFIDSensors: [],
        smokeSensors: [],
        lights: []
      }

      expect(isSensorsListEmpty(mockSensors)).toBeTruthy()
    })

    test('should return false if sensorsList is not empty', () => {
      const mockSensors = {
        temperatureSensors: [],
        windowSensors: [],
        windowBlinds: [
          {
            id: 3,
            type: 'windowBlind',
            position: 90
          }
        ],
        RFIDSensors: [],
        smokeSensors: [],
        lights: []
      }

      expect(isSensorsListEmpty(mockSensors)).toBeFalsy()
    })
  })
})

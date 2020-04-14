import i18next from 'i18next'

const sensorsInfo = {
  temperatureSensor: { displayedName: 'temp', color: '#ff9933', description: i18next.t('temperature-sensor-desc') },
  windowSensor: { displayedName: 'okno', color: '#884dff', description: 'Okno' },
  windowBlind: { displayedName: 'zaslona', color: '#e05194', description: 'Zasłony' },
  RFIDSensor: { displayedName: 'rfid', color: '#ff8d85', description: 'RFID' },
  smokeSensor: { displayedName: 'dym', color: '#808080', description: 'Czujnik dymu' },
  RGBLight: { displayedName: 'swiatlo', color: '#29a03a', description: 'Światło' }
}

export default sensorsInfo

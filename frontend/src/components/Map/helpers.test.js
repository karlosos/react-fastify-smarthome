import {
  fromCoordinateToPercentMapper,
  fromPercentToCoordinateMapper,
  isFieldOccupied,
  validPointData
} from './helpers'

const pointsMock = [
  { x: 12, y: 55 },
  { x: 99, y: 1 },
  { x: 26, y: 26 }
]

describe('Helpers function tests', () => {
  describe('fromCoordinateToPercentMapper test', () => {
    it('maps appropriate from coordinate to percent', () => {
      expect(fromCoordinateToPercentMapper(6, 500)).toBe(1.2)
    })
  })
  describe('fromPercentToCoordinateMapper test', () => {
    it('maps appropriate from percent to coordinate', () => {
      expect(fromPercentToCoordinateMapper(6, 500)).toBe(30)
    })
  })
  describe('isFieldOccupied function test', () => {
    it('checks if field is occupied', () => {
      expect(isFieldOccupied(25, 25, pointsMock)).toEqual({ x: 26, y: 26 })
      expect(isFieldOccupied(6, 500, pointsMock)).toBe(undefined)
    })
  })

  describe('validPointData function test', () => {
    it('checks if has obligatory properties', () => {
      expect(validPointData({ position: { x: 20, y: 30 }})).toBe(false)
      expect(validPointData({ x: 20, y: 30 })).toBe(false)
      expect(validPointData({ mapPosition: { xProp: 20, yProp: 30 }})).toBe(false)
      expect(validPointData({ mapPosition: { x: 20, y: 30 }})).toBe(true)
    })
  })
})

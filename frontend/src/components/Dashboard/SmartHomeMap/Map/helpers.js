/** Distance defined in percent in which new point can't be located. */
const POINT_LOCATION_TOLERANCE = 3.25

/**
* Changes point relative coordinates to map's percentage dependence.
*
* @param {number} offset Horizontal or vertical offset related to map component.
* @param {number} mapSize Current map horizontal or vertical size.
* @returns {number} Point position expressed in percentage.
*/
const fromCoordinateToPercentMapper = (offset, mapSize) => {
  return (offset) / mapSize * 100
}

/**
* Changes point's percentage position to coordinates related to map.
*
* @param {number} offset Horizontal or vertical offet related to map component defined in percent.
* @param {number} mapSize Current map horizontal or vertical size.
* @returns {number} Point position expressed in map's offset coordinates.
*/
const fromPercentToCoordinateMapper = (offset, mapSize) => {
  return (offset) * mapSize / 100
}

/**
* Checks if point could be applied to specific location depending on point location's tolerance.
*
* @param {number} x Vertical coordinate.
* @param {number} y Horizontal coordinate.
* @returns {Object | undefined} Undefined if new point can be added or existing point.
*/
const isFieldOccupied = (x, y, points) => {
  return points.filter((point) => (
    Math.abs(point.x - x) < POINT_LOCATION_TOLERANCE &&
      Math.abs(point.y - y) < POINT_LOCATION_TOLERANCE))[0]
}

/** Checks if point object has obligatory properties.
 *
 * @param {any} point
 *
 * @returns {boolean} true if point properties are valid
*/
const validPointData = (point) => {
  return Object.prototype.hasOwnProperty.call(point, 'mapPosition') &&
    Object.prototype.hasOwnProperty.hasOwnProperty.call(point.mapPosition, 'x') &&
    Object.prototype.hasOwnProperty.hasOwnProperty.call(point.mapPosition, 'y')
}

export {
  fromCoordinateToPercentMapper,
  fromPercentToCoordinateMapper,
  isFieldOccupied,
  validPointData
}

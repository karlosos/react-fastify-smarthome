const convertHsvToHsl = (h, s, v) => {
  const l = (2 - s / 100) * v / 2

  if (l !== 0) {
    if (l === 100) {
      s = 0
    } else if (l < 50) {
      s = s * v / (l * 2)
    } else {
      s = s * v / (200 - l * 2)
    }
  }

  return [h, s, l]
}

export { convertHsvToHsl }

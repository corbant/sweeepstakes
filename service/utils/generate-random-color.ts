const HEX_CODE_LETTERS = '0123456789ABCDEF'

const generateRandomColor = () => {
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += HEX_CODE_LETTERS[Math.floor(Math.random() * 16)]
  }
  return color
}

export { generateRandomColor }

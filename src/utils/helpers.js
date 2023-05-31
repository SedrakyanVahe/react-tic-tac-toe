export const playSound = (sound) => {
  new Audio(sound).play()
}

export const isContainEmptyString = (element) => element === ''

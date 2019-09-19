
const useCalConsumed = ( intakeList ) => {
  let calConsumed = {
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    snack: 0,
    total: 0
  }

  intakeList.forEach(intake => {
    switch (intake.meal_type) {
      case 'breakfast':
        calConsumed.breakfast = calConsumed.breakfast + intake.nf_calories
        break
      case 'lunch':
        calConsumed.lunch = calConsumed.lunch + intake.nf_calories
        break
      case 'dinner':
        calConsumed.dinner = calConsumed.dinner + intake.nf_calories
        break
      case 'snack':
        calConsumed.snack = calConsumed.snack + intake.nf_calories
    }
  })
  
  calConsumed.total = (
    calConsumed.breakfast +
    calConsumed.lunch +
    calConsumed.dinner +
    calConsumed.snack
  )

  return calConsumed
}

export default useCalConsumed


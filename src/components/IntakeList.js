import React from 'react'

const IntakeList = ({ intakeList }) => {
  console.log('List: ', intakeList)
  return (
    <div>
      {
        intakeList.map(intake => (
          <div>
            {intake.food_name}
          </div>
        ))
      }
    </div>
  )
}

export default IntakeList;

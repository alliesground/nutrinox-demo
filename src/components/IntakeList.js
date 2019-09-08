import React from 'react'
import { Grid } from 'semantic-ui-react'

const IntakeList = ({ intakeList }) => {
  console.log('List: ', intakeList)
  return (
    <Grid doubling centered columns={4}>
      <Grid.Column>
        {
          intakeList.map(intake => (
            <div>
              {intake.food_name}
            </div>
          ))
        }
      </Grid.Column>
    </Grid>
  )
}

export default IntakeList;

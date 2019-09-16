import React from 'react'
import { Grid, List } from 'semantic-ui-react'
import Intake from './Intake'

const IntakeList = ({ intakeList }) => {
  const intakes = intakeList.map(intake => (
    <Intake intake={intake} key={intake.food_name} />
  ))

  return (
    <Grid doubling>
      <Grid.Column>
        <List selection relaxed='very' divided verticalAlign='middle'>
          { intakes }
        </List>
      </Grid.Column>
    </Grid>
  )
}

export default IntakeList;

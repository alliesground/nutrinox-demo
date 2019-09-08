import React from 'react'
import { Grid, List } from 'semantic-ui-react'
import Intake from './Intake'

const IntakeList = ({ intakeList }) => {
  console.log('List: ', intakeList)
  const intakes = intakeList.map(intake => (
    <Intake intake={intake} />
  ))
  return (
    <Grid doubling>
      <Grid.Column>
        <List selection relaxed divided verticalAlign='middle'>
          { intakes }
        </List>
      </Grid.Column>
    </Grid>
  )
}

export default IntakeList;

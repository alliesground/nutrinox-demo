import React from  'react'
import {Grid, Header, Progress} from 'semantic-ui-react'

const IntakeSummary = ({ intakeList }) => {

  const goal = 1500
  let calConsumedInBreakfast = 0
  let calConsumedInLunch = 0
  let calConsumedInDinner = 0
  let calConsumedInSnack = 0

  intakeList.forEach(intake => {
    switch (intake.meal_type) {
      case 'breakfast':
        calConsumedInBreakfast = calConsumedInBreakfast + intake.nf_calories
        break
      case 'lunch':
        calConsumedInLunch = calConsumedInLunch + intake.nf_calories
        break
      case 'dinner':
        calConsumedInDinner = calConsumedInDinner + intake.nf_calories
        break
      case 'snack':
        calConsumedInSnack = calConsumedInSnack + intake.nf_calories
    }
  })

  const totalCalConsumed = (calConsumedInBreakfast +
    calConsumedInLunch +
    calConsumedInDinner +
    calConsumedInSnack
  )
  
  const percentConsumed = Math.round(totalCalConsumed / goal * 100)

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column floated='left' width={7}>
          <Header as='h3'>
            {Math.round(totalCalConsumed)} cal
            <Header.Subheader>
              consumed
            </Header.Subheader>
          </Header> 
        </Grid.Column>

        <Grid.Column floated='right' width={7}>
          <Header as='h3' textAlign='right'>
            {goal}
            <Header.Subheader>
              my goal
            </Header.Subheader>
          </Header>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <Progress percent={percentConsumed} size='tiny' color='violet'>
            { percentConsumed }%
          </Progress>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row columns={4} textAlign='center'>
        <Grid.Column>
          <Header as='h3'>
            {Math.round(calConsumedInBreakfast)}
            <Header.Subheader>
              Breakfast
            </Header.Subheader>
          </Header>
        </Grid.Column>

        <Grid.Column>
          <Header as='h3'>
            {Math.round(calConsumedInLunch)}
            <Header.Subheader>
              Lunch
            </Header.Subheader>
          </Header>
        </Grid.Column>

        <Grid.Column>
          <Header as='h3'>
            {Math.round(calConsumedInDinner)}
            <Header.Subheader>
              Dinner
            </Header.Subheader>
          </Header>
        </Grid.Column>

        <Grid.Column>
          <Header as='h3'>
            {Math.round(calConsumedInSnack)}
            <Header.Subheader>
              Snack
            </Header.Subheader>
          </Header>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default IntakeSummary;

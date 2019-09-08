import React from 'react'
import { Grid, Header } from 'semantic-ui-react';

const basicInfo = () => (
  <Grid columns={3}>
    <Grid.Column>
      1col
    </Grid.Column>

    <Grid.Column>
      2col
    </Grid.Column>

    <Grid.Column>
      3col
    </Grid.Column>
    
    <Header>Jane Appleseed</Header>
  </Grid>
)

const intakeInfo = () => (
  <Grid.Column>
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Header>More Info</Header>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Grid.Column>
)

const UserProfile = () => {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          { basicInfo() }
        </Grid.Column>
      </Grid.Row>

      <Grid.Row only='large screen computer tablet'>
        { intakeInfo() }
      </Grid.Row>
    </Grid>
  )
}

export default UserProfile;

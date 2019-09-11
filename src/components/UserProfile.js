import React from 'react'
import { Container, Grid, Header, Image, Label } from 'semantic-ui-react';

const computerLayout = () => (
  <> 
    <Grid.Column verticalAlign='middle' textAlign='right' width={5}>
      <Label circular size='massive'>
        <div
          style={{width:'30px', height:'30px'}}
        >
          <Header as='h4'>
            153
            <Header.Subheader>Kg</Header.Subheader>
          </Header>
        </div>
      </Label>
    </Grid.Column>

    <Grid.Column verticalAlign='middle' width={6}
      style={{
        paddingLeft: '0px',
        paddingRight: '0px',
      }}
    >
      <Image 
        src='https://d1r9wva3zcpswd.cloudfront.net/55c92acdf04322593691010c.jpeg' 
        size='huge' circular 
        centered
      />
    </Grid.Column>

    <Grid.Column verticalAlign='middle' textAlign='left' width={5}>
      <Label circular size='massive'>
        <div
          style={{width:'30px', height:'30px'}}
        >
          <Header as='h4'>
            153
            <Header.Subheader>Kg</Header.Subheader>
          </Header>
        </div>
      </Label>
    </Grid.Column>
    
    <Container 
      textAlign='center'
      style={{
        padding: '20px',
        paddingBottom: '0px'
      }}
    >
      <Header as='h3'>Jane Appleseed</Header>
    </Container>
  </>
)

const mobileLayout = () => (
  <>
    <Grid.Column 
      width={8} 
      verticalAlign='middle'
    >
      <Header as='h2' style={{color:'white'}}>
        <Image 
          src='https://d1r9wva3zcpswd.cloudfront.net/55c92acdf04322593691010c.jpeg' 
          circular
        />
        Jane
      </Header>
    </Grid.Column>

    <Grid.Column
      width={8} 
      verticalAlign='middle'
      textAlign='right'
    >
      <Label.Group size='huge'>
        <Label circular
          style={{
            backgroundColor: '#332176',
            width: 70,
            height: 70
          }}
        >
          <div 
            style={{
              paddingTop: '5px',
              paddingBottom: '5px'
            }}
          >
            <Header as='h2' style={{color:'white'}}>
              57
              <Header.Subheader style={{color:'white'}}>Kg</Header.Subheader>
            </Header>
          </div>
        </Label>

        <Label 
          circular 
          style={{
            marginRight: '0px',
            backgroundColor: '#332176',
            width: 70,
            height: 70
          }}
        >
          <div style={{
              paddingTop: '5px',
              paddingBottom: '5px'
            }}
          >
            <Header as='h2' style={{color: 'white'}}>
              153
              <Header.Subheader style={{color:'white'}}>Cm</Header.Subheader>
            </Header>
          </div>
        </Label>
      </Label.Group>
    </Grid.Column>
  </>
)

const UserProfile = () => {
  return (
    <Grid>
      <Grid.Row only='computer tablet' columns={3}>
        { computerLayout() }
      </Grid.Row>

      <Grid.Row only='mobile'>
        { mobileLayout() }
      </Grid.Row>
    </Grid>
  )
}

export default UserProfile;

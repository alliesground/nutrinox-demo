import React, { useState } from 'react'
import { Grid, 
  Header, 
  Image, 
  Statistic, 
  Divider, 
  Select,
  Button,
  Form
} from 'semantic-ui-react'

const countryOptions = [
  { key: 'af', value: 'af', text: 'Afghanistan' },
  { key: 'ax', value: 'ax', text: 'Aland Islands' },
  { key: 'al', value: 'al', text: 'Albania' },
  { key: 'dz', value: 'dz', text: 'Algeria' },
  { key: 'as', value: 'as', text: 'American Samoa' },
  { key: 'ad', value: 'ad', text: 'Andorra' },
  { key: 'ao', value: 'ao', text: 'Angola' },
  { key: 'ai', value: 'ai', text: 'Anguilla' },
  { key: 'ag', value: 'ag', text: 'Antigua' },
  { key: 'ar', value: 'ar', text: 'Argentina' },
  { key: 'am', value: 'am', text: 'Armenia' },
  { key: 'aw', value: 'aw', text: 'Aruba' },
  { key: 'au', value: 'au', text: 'Australia' },
  { key: 'at', value: 'at', text: 'Austria' },
  { key: 'az', value: 'az', text: 'Azerbaijan' },
  { key: 'bs', value: 'bs', text: 'Bahamas' },
  { key: 'bh', value: 'bh', text: 'Bahrain' },
  { key: 'bd', value: 'bd', text: 'Bangladesh' },
  { key: 'bb', value: 'bb', text: 'Barbados' },
  { key: 'by', value: 'by', text: 'Belarus' },
  { key: 'be', value: 'be', text: 'Belgium' },
  { key: 'bz', value: 'bz', text: 'Belize' },
  { key: 'bj', value: 'bj', text: 'Benin' },
]

const IntakeForm = ({ intake }) => {
  const [value, setValue] = useState('0')

  return (
    <>
      <div className='content'>
        <Header as='h3'>
          <Image 
            wrapped 
            size='massive' 
            src={intake.photo.thumb} 
          /> 
          <br />
          Cheese
        </Header>

        <Divider />

        <Grid>
          <Grid.Column width={8}>
            <div className='ui fluid action input'>
              <input 
                type='text' 
                placeholder='servings' 
                style={{
                  backgroundColor: '#f2f2f2',
                  border: 'none',
                }}
              />
              <div className="ui vertical icon buttons">
                <button className="ui button"
                  style={{
                    backgroundColor: '#f2f2f2',
                    borderRadius: '0 .28571429rem 0 0'
                  }}
                >
                  <i className="angle up icon" />
                </button>
                <button className="ui button"
                  style={{
                    backgroundColor: '#f2f2f2',
                    borderRadius: '0 0 .28571429rem 0'
                  }}
                >
                  <i className="angle down icon" />
                </button>
              </div>
            </div>
            <b
              style={{
                paddingLeft:'14px',
                color: 'violet'
              }}
            >
              slice
            </b>
          </Grid.Column>

          <Grid.Column width={4}
            style={{
              paddingTop:'30px'
            }}
          >
            <Statistic size='mini' textAlign='right'>
              <Statistic.Value textAlign='right'>22</Statistic.Value>
              <Statistic.Label>grams</Statistic.Label>
            </Statistic>
          </Grid.Column>

          <Grid.Column width={4}
            style={{
              paddingTop:'30px'
            }}
          >
            <Statistic size='mini'>
              <Statistic.Value>31</Statistic.Value>
              <Statistic.Label>calories</Statistic.Label>
            </Statistic>
          </Grid.Column>
        </Grid>

        <Divider />

        <Grid>
          <Grid.Column>
            <p> ADD TO TODAY </p>

            <Select 
              placeholder='Select your country' 
              options={countryOptions} 
              fluid 
              style={{
                backgroundColor:'#f2f2f2'
              }}
            />

            <br />

            <Button
              size='huge'
              color='violet'
              floated='right'
            >
              Add
            </Button>
          </Grid.Column>
        </Grid>
      </div>
    </>
  )
}

export default IntakeForm;

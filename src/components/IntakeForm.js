import React, { useState } from 'react'
import styled from 'styled-components';
import { Grid, 
  Header, 
  Image, 
  Statistic, 
  Divider, 
  Select,
  Button,
  Form,
  Input
} from 'semantic-ui-react';
import NumberFormat from 'react-number-format';

const ServingSizeInput = styled.div`
  background-color: #f2f2f2;
  padding-top: 5px;

  div:first-child {
    width: 100%;
  }

  label {
    padding-left: 14px;
    color: #6435c9;
  }

  span {
    display: block; 
    padding-top: 5px;
    padding-left: 14px;
  }

  .buttons button:first-child {
    background-color: #f2f2f2;
    border-radius: 0 .28571429rem 0 0;
  }

  .buttons button:last-child {
    background-color: #f2f2f2;
    border-radius: 0 0 .28571429rem 0;
  }
`;

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
  const [servingSize, setServingSize] = useState('1.0')

  const increaseServingSize = () => {
    let servingSizeNum = parseFloat(servingSize);
    setServingSize((servingSizeNum + 1).toFixed(1))
  }

  const decreaseServingSize = () => {
    let servingSizeNum = parseFloat(servingSize);
    if ((servingSizeNum - 1) < 1) return

    setServingSize((servingSizeNum - 1).toFixed(1))
  }

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
            <ServingSizeInput className='ui fluid action input'>
              <div>
                <label>
                  Servings
                </label>
                <span>
                  {servingSize}
                </span>
              </div>

              <div className="ui vertical icon buttons">
                <button 
                  className="ui button"
                  onClick={increaseServingSize}
                >
                  <i className="angle up icon" />
                </button>
                <button 
                  className="ui button"
                  onClick={decreaseServingSize}
                >
                  <i className="angle down icon" />
                </button>
              </div>
            </ServingSizeInput>
            <b
              style={{
                paddingLeft:'14px',
                color: '#6435c9'
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

import React, { useState, useEffect } from 'react';
import { Button, Grid, Header, Divider } from 'semantic-ui-react';
import { useData } from './hooks/useData'
import FoodSearchForm from './FoodSearchForm';
import IntakeListSlider from './IntakeListSlider';
import IntakeList from './IntakeList'
import UserProfile from './UserProfile'
import IntakeSummary from './IntakeSummary'
import useCalConsumed from './hooks/useCalConsumed'

const IntakeDashboard = () => {
  const [diet, setDiet] = useData();

  const [currentDataPointIndex, setCurrentDataPointIndex] = useState(0)

  const currentDate = diet.data_points[currentDataPointIndex].date;
  
  const initialIntakeList = diet.data_points[currentDataPointIndex].intake_list

  const [date, setDate] = useState(currentDate);

  const [intakeList, setIntakeList] = useState(initialIntakeList)

  const calConsumed = useCalConsumed(diet.data_points[0].intake_list)
  const intakeGoal = 1500

  const handlePrevClick = () => {
    if (currentDataPointIndex >= diet.data_points.length - 1) return

    setCurrentDataPointIndex(
      currentDataPointIndex + 1
    )
  }

  const handleNextClick = () => {
    if (currentDataPointIndex <= 0) return

    setCurrentDataPointIndex(
      currentDataPointIndex - 1
    )
  }

  useEffect(() => {
    setDate(diet.data_points[currentDataPointIndex].date)
    setIntakeList(diet.data_points[currentDataPointIndex].intake_list)
  }, [currentDataPointIndex])

  const handleIntakeSubmit = (intake) => {
    setDiet(Object.assign({...diet}, {
      data_points: Object.assign([...diet.data_points], {
        0: Object.assign({...diet.data_points[0]}, {
          intake_list: diet.data_points[0].intake_list.concat(intake)
        })
      })
    }))
  }

  useEffect(() => {
    setIntakeList(diet.data_points[currentDataPointIndex].intake_list)
  }, [diet])

  let searchInputRef = null

  const foodSearchForm = () => (
    <FoodSearchForm
      onIntakeSubmit={handleIntakeSubmit}
      searchInputRef={el => searchInputRef = el}
      totalCalConsumed={calConsumed.total}
      goal={intakeGoal}
    />
  )

  const userProfile = () => (
    <UserProfile />
  )

  const intakeSummary = () => (
    <IntakeSummary 
      intakeList={intakeList}
      goal={intakeGoal}
    />
  )

  const intakeListSlider = (headerColor='white') => (
    <IntakeListSlider 
      onPrevClick={handlePrevClick}
      onNextClick={handleNextClick}
      date={date}
      headerColor={headerColor}
    />
  )

  const intakeListComponent = () => (
    <IntakeList
      intakeList={intakeList}
    />
  )


  const renderFoodSearchForm = () => {
    return (
      <Grid.Column>
        <Grid doubling centered columns={4}>
          <Grid.Column>
            { foodSearchForm() }
          </Grid.Column>
        </Grid>
      </Grid.Column>
    )
  }

  const renderIntakeListSlider = () => {
    return (
      <Grid.Column>
        <Grid doubling centered columns={4}>
          <Grid.Column>
            { intakeListSlider() }
          </Grid.Column>
        </Grid>
      </Grid.Column>
    )
  }

  const renderUserInfo = () => {
    return ( 
      <Grid.Column 
        computer={4}
        tablet={5}
        style={{
          backgroundColor: '#f5f5f5',
        }}
      >
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexFlow: 'column nowrap'
          }}
        >
          { userProfile() }
          <Divider />
          { intakeSummary() }
        </div>
      </Grid.Column>
    )
  }

  const renderIntakeList = () => {
    return (
      <Grid.Column 
        computer={12}
        tablet={11}
      >
        { intakeListComponent() }
      </Grid.Column>
    )
  }

  const focusSearchInput = () => {
    searchInputRef.focus()
  }

  return (
    <>
      <Grid padded>
        <Grid.Row only='computer tablet'>
          <Grid.Column>
            <Grid>
              <Grid.Row color='violet'>
                { renderFoodSearchForm() }
              </Grid.Row>
              
              <Grid.Row color='violet'>
                { renderIntakeListSlider() }
              </Grid.Row>

              <Grid.Row>
                <Grid.Column>
                  <Grid>
                    { renderUserInfo() }
                    { renderIntakeList() }
                  </Grid>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row only='mobile'>
          <Grid.Column>
            <Grid>
              <Grid.Row color='violet'>
                <Grid.Column>
                  { foodSearchForm() }
                </Grid.Column>
              </Grid.Row>

              <Grid.Row color='violet'>
                <Grid.Column>
                  { userProfile() }
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column>
                  { intakeListSlider('black') }
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column>
                  { intakeSummary() }
                </Grid.Column>
              </Grid.Row>
              
              <Divider />

              <Grid.Row>
                <Grid.Column>
                  { intakeListComponent() }
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>

        <div
          style={{
            position:'fixed',
            bottom: '0',
            right: '0',
            marginBottom: '15px'
          }}
        >
          <Button
            color='violet'
            size='huge'
            circular
            icon='plus'
            onClick={focusSearchInput}
          />
        </div>
      </Grid>
    </>
  )
}

export default IntakeDashboard;


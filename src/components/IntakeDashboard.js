import React, { useState, useEffect } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { useData } from './hooks/useData'
import FoodSearchForm from './FoodSearchForm';
import IntakeListSlider from './IntakeListSlider';
import IntakeList from './IntakeList'
import UserProfile from './UserProfile'

const IntakeDashboard = () => {
  const [diet, setDiet] = useData();

  const [currentDataPointIndex, setCurrentDataPointIndex] = useState(0)

  const currentDate = diet.data_points[currentDataPointIndex].date;
  
  const initialIntakeList = diet.data_points[currentDataPointIndex].intake_list

  const [date, setDate] = useState(currentDate);

  const [intakeList, setIntakeList] = useState(initialIntakeList) 

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

  return (
    <>
      <Grid>
        <Grid.Row color='purple'>
          <Grid.Column>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Grid doubling centered columns={4}>
                    <Grid.Column>
                      <FoodSearchForm
                        onIntakeSubmit={handleIntakeSubmit}
                      />
                    </Grid.Column>
                  </Grid>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row only='mobile'>
                <Grid.Column>
                  <Grid doubling centered columns={4}>
                    <Grid.Column>
                      <UserProfile />
                    </Grid.Column>
                  </Grid>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column>
                  <Grid doubling centered columns={4}>
                    <Grid.Column>
                      <IntakeListSlider 
                        onPrevClick={handlePrevClick}
                        onNextClick={handleNextClick}
                        date={date}
                      />
                    </Grid.Column>
                  </Grid>
                </Grid.Column>
              </Grid.Row>

            </Grid>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Grid stackable padded='horizontally'>
              <Grid.Column 
                width={4}
                color='grey'
                only='computer tablet'
              >
                <UserProfile />
              </Grid.Column>

              <Grid.Column width={12}>
                <Header>Intake List</Header>
                <IntakeList
                  intakeList={intakeList}
                />
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid> 
    </>
  )
}

export default IntakeDashboard;


import React, { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useData } from './hooks/useData'
import FoodSearchForm from './FoodSearchForm';
import IntakeListSlider from './IntakeListSlider';
import IntakeList from './IntakeList'

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

  return (
    <>
      <FoodSearchForm />
      <IntakeListSlider 
        onPrevClick={handlePrevClick}
        onNextClick={handleNextClick}
        date={date}
      />
      <IntakeList 
        intakeList={intakeList}
      />
    </>
  )
}

export default IntakeDashboard;


import React from 'react'
import GetLocation from './GetLocation'

const LandingPage = () => {

  return (
    <>
    <h1>Welcome to Running Weather</h1>
    <p>To get started, where are you?</p>
    <GetLocation />
    </>
  )
}

export default LandingPage;
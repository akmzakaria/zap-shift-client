import React from 'react'
import Banner from './Banner/Banner'
import Work from '../../Components/Work/Work'
import Brands from './Brands/Brands'
import Reviews from './Reviews/Reviews'

const reviewPromise = fetch('/reviews.json').then((res) => res.json())

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Work></Work>
      <Brands></Brands>
      <Reviews reviewPromise={reviewPromise}></Reviews>
    </div>
  )
}

export default Home

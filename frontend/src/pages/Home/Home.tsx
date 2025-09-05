import React from 'react'
import { Banner } from './Banner'
import { TopSellers } from './TopSellers'
import { Recommend } from './Recommend'
import News from './News'

export const Home: React.FC = () => {
  return (
    <>
        <Banner/>
        <TopSellers/>
        <Recommend/>
        <News/>
    </>
  )
}

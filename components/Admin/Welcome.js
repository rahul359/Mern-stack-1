import React from 'react'
import Hero from '../Hero'
import Banner from '../Banner';

import NavigationBar from './NavigationBar';
import Footer from '../Footer';

export default function Welcome() {
    return (
        <>
        <NavigationBar />
        <Hero hero="roomsHero3" >
        <Banner title="Welcome" subtitle=" Admin !!">
                

        </Banner>
        </Hero>
        <Footer />
        </>
    )
}
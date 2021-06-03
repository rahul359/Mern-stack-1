import React from 'react'
import Hero from '../Hero'
import Banner from '../Banner';
import { Link } from 'react-router-dom';
import {FaRegMeh} from 'react-icons/fa';
import NavBarMan from './NavBarMan';
import Footer from '../Footer';

export default function WelcomeManager() {
    return (
        <>
        <NavBarMan />
        <Hero hero="roomsHero2" >
        <Banner title="Welcome" subtitle="Manager !!">
                

        </Banner>
        </Hero>
        <Footer />
        </>
    )
}
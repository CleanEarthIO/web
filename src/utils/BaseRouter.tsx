import React from 'react';
import { Route } from 'react-router-dom';

import { Home } from '../components/pages/home/Home';
import { Discover } from '../components/pages/discover/Discover';

export function BaseRouter(): JSX.Element {
    return (
        <>
            <Route path='/' exact component={Home} />
            <Route path='/discover' exact component={Discover} />
        </>
    );
}

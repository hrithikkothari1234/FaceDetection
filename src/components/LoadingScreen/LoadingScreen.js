import React from 'react';
import brain from '../Logo/brain.png';

import './LoadingScreen.css';

const loadingScreen = () =>(

    <div className="LoadingScreen">
        <div className="br2 shadow-3 brain">
            <img src={brain} alt="brain" className="rotate"/>
        </div>
    </div>

);

export default loadingScreen;

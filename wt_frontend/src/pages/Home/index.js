import React, { useState, useEffect } from 'react';
import styles from './layout.module.css';
import SignUp from '../../components/Signup';
import { useSpring, animated } from 'react-spring';

const Index = () => {
    const [loading, setLoading] = useState(true);
    const [logo, logoSpring] = useSpring(() => ({
        height: '30%',
        left: '41%',
        top: '25%',
        // height: '15%',
        // left: '3%',
        // top: '10%',
    }));
    const animateLogo = () => {
        logoSpring.start({
            height: '15%',
            left: '3%',
            top: '10%',
            config: {
                duration: 1000,
            }
        });
    };
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }, []);
    useEffect(() => {
        if (!loading)
            animateLogo();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

    return (
        <div id={styles.container}>
            <animated.img
                draggable={"false"}
                src={'./logo.svg'}
                id={styles.logo}
                style={{
                    ...logo,
                }}
            />
            {!loading && <SignUp />}
        </div>
    )
};
export default Index;
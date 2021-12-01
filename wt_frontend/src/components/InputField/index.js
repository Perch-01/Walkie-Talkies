import { useSpring, animated } from 'react-spring';
import React, { useState, useEffect, useRef } from 'react';
import styles from './layout.module.css';
const Index = ({ text, placeholder, value, onChange, isPassword }) => {
    const [focused, setFocused] = useState(false);
    const inputRef = useRef(null);
    const [position, positionString] = useSpring(() => ({
        top: 13,
        fontSize: '100%',
        fontWeight: 400,
        color: "#000000",
    }));
    const animatePosition = () => {
        positionString.start({
            top: -6,
            fontSize: '80%',
            fontWeight: 700,
            color: "#A18BEE",
            config: {
                duration: 150,
            }
        });
    };
    useEffect(() => {
        if (!focused && value === '')
            positionString.start({
                top: 13,
                fontSize: '100%',
                fontWeight: 400,
                color: "#000000",
            });

        if (focused)
            inputRef.current?.focus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [focused])
    const borderStyles = focused ? { border: '1.5px solid #A18BEE' } : {};
    return (
        <div
            style={borderStyles}
            id={styles.container}
            onClick={() => {
                animatePosition();
                setFocused(true);
            }}>
            <animated.p
                id={styles.text}
                style={{
                    ...position,
                }}>
                {text}
            </animated.p>
            {(focused || value.length) ? <input
                type={isPassword ? "password" : "text"}
                placeholder={placeholder}
                id={styles.input}
                ref={inputRef}
                style={{}}
                value={value}
                onChange={event => {
                    const value = isPassword ?
                        event.target.value.trim() :
                        event.target.value
                            .replace(/\W/g, '')
                            .toLowerCase()
                            .substring(0, 20);//only allow letters, numbers and underscores for usernames
                    onChange(value);
                }}
                onFocus={() => {
                    setFocused(true);
                }}
                onBlur={() => {
                    setFocused(false);
                }}
            /> : <></>}
        </div>
    )
};
export default Index;
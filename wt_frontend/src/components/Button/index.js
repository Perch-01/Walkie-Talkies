import React, { useState, useEffect } from 'react';
import styles from './layout.module.css';
const Index = ({
    text,
    onClick,
    backgroundColor,
    textColor,
    fontSize = "100%",
    fontWeight = 700,
    borderRadius = 5,
    borderWidth = 0,
    borderColor = "#ffffff",
    width = "100%",
    height = "40px",
    marginTop = 0,
}) => {
    return (
        <div
            id={styles.container}
            style={{
                backgroundColor: backgroundColor,
                borderRadius: borderRadius,
                border: `${borderWidth} solid ${borderColor}`,
                width: width,
                height: height,
                marginTop: marginTop,
            }}
            onClick={onClick}>
            <p
                id={styles.text}
                style={{
                    color: textColor,
                    fontSize: fontSize,
                    fontWeight: fontWeight,
                }}>
                {text}
            </p>
        </div>
    )
};
export default Index;
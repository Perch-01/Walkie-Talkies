import React, { } from 'react';
import { commonvalues } from '../../constants/common';
import styles from './layout.module.css';
const Index = ({
    isRecieved,
    message,
    date,
}) => {
    return (
        <div id={styles.container}
            style={{ alignItems: isRecieved ? 'initial' : 'flex-end' }}
        >
            <p id={styles.textContainer}
                style={{
                    backgroundColor: isRecieved ? commonvalues.colors.PURPLE : commonvalues.colors.GREY,
                    color: isRecieved ? commonvalues.colors.WHITE : commonvalues.colors.BLACK,
                    borderBottomLeftRadius: isRecieved ? "0px" : "10px",
                    borderBottomRightRadius: isRecieved ? "10px" : "0px",
                }}
            >{message}</p>
            <p id={styles.date}>{date}</p>
        </div>
    )
};
export default Index;
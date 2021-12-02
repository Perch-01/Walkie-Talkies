import React, { } from 'react';
import { commonvalues } from '../../constants/common';
import styles from './layout.module.css';
const Index = ({
    isRecieved,
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
            >
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            </p>
        </div>
    )
};
export default Index;
import React, { useRef, useState } from 'react';
import styles from './layout.module.css';
import { GrAttachment } from 'react-icons/gr';
import { FaPaperPlane } from 'react-icons/fa';
import { commonvalues } from '../../constants/common';
const Index = ({
    height,
    width,
    placeholder,
    value,
    onChange,
    isMessage,
    attachmentFunction,
    sendMessageFunction,
}) => {
    const inputRef = useRef(null);
    const [focus, setFocused] = useState(false)
    return (
        <div id={styles.container} style={{
            minHeight: height,
            width: width
        }}>
            <textarea
                type={"text"}
                placeholder={placeholder}
                id={styles.input}
                style={{ paddingTop: value === '' ? "10px" : "10px" }}
                ref={inputRef}
                value={value}
                onChange={event => {
                    const value = event.target.value;
                    onChange(value);
                }}
                onFocus={() => {
                    setFocused(true);
                }}
                onBlur={() => {
                    setFocused(false);
                }}
                onKeyDown={
                    (e) => {
                        if (e.keyCode == 13 && e.shiftKey == false) {
                            e.preventDefault();
                            sendMessageFunction();
                        }
                    }
                }
            />
            {isMessage && <>
                {/* <GrAttachment
                    className={styles.icon}
                    size={18}
                    onClick={attachmentFunction} /> */}
                <FaPaperPlane
                    className={styles.icon}
                    size={25}
                    onClick={sendMessageFunction}
                    color={commonvalues.colors.DEEPPURPLE}
                    style={{ marginLeft: "-15px", marginRight: "25px" }}
                />
            </>}
        </div>
    )
};
export default Index;
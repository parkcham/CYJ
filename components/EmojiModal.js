import React from 'react';
import EmojiPicker from 'rn-emoji-keyboard';
import { ko } from 'rn-emoji-keyboard'
const EmojiModal = ({open,onClose,onEmojiSelected}) => {
    return (
        <EmojiPicker
        expandable={false}
        onEmojiSelected={onEmojiSelected}
        open={open}
        onClose={onClose}
        translation={ko}
        />
        
    );
};

export default EmojiModal;
import { atom } from 'recoil'

export const sliderValue = atom({
    key: 'sliderValue',
    default: 0
})

export const moodzNote = atom({
    key: 'moodzNote',
    default: ''
})

export const submitMood = atom({
    key: 'submitMood',
    default: false
})
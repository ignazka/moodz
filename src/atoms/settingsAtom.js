import { atom } from 'recoil'

export const themeValue = atom({
    key: 'theme',
    default: 0
})

export const notificationToggle = atom({
    key: 'notificationToggle',
    default: false
})



import { atom } from 'recoil'

export const themeValue = atom({
    key: 'theme',
    default: 0
})

export const notificationValue = atom({
    key: 'notification',
    default:0
})
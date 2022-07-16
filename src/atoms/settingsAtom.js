import { atom } from 'recoil'

export const themeValue = atom({
    key: 'theme',
    default: 0
})

export const notificationToggle = atom({
    key: 'notificationToggle',
    default: false
})

export const notificationTimes = atom({
    key: 'notificationTimes',
    default: [{"hour":8,"minute":0},{"hour":13,"minute":0},{"hour":17,"minute":0},{"hour":19,"minute":0},{"hour":21,"minute":0}]
})

export const timer = atom({
    key: 'timer',
    default: 0
})


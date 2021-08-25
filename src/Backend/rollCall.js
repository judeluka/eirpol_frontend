import { dailMaker } from "./tdGenerator";


export const chamber = dailMaker(54)

export const current = chamber[0].followerData.length - 1

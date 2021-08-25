import { current } from "../../../../Backend/rollCall"




export const followers = d => d.followerData[current].followers
export const retweets = d => d.retweetData[current].retweets
export const sentiment = d => d.sentiment

export const options = [

"followers", "retweets", "sentiment"

]







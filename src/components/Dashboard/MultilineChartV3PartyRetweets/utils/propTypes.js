import { arrayOf, shape, string, date as dateProp, number } from "prop-types";

export const MultiLineDataItemsPropTypes = arrayOf(
  shape({
    date: dateProp,
    change: number,
    retweets: number
  })
);

export const MultiLineDataPropTypes = arrayOf(
  shape({
    name: string,
    items: MultiLineDataItemsPropTypes,
    color: string
  })
);

import { chamber } from "./rollCall";
import * as d3 from 'd3'


export const weeks = chamber[0].followerData.length

export function chamberFollowerRanking() {

    var followerSortedChamber = chamber.sort(function(a, b) {

        return d3.descending(a.totalFollowers, b.totalFollowers)
    
         })

         return followerSortedChamber

}


export function chamberRetweetRanking() {

    var retweetSortedChamber = chamber.sort(function(a, b) {

        return d3.descending(a.totalRetweets, b.totalRetweets)
    
         })

         return retweetSortedChamber

}


export function chamberStats() {

    var weeks = chamber[0].followerData.length


    function follows() {
        
        var chamberFollowers = chamber.map(td => td.followerData[0].followers)

        var chamberFollowersTotal = chamberFollowers.reduce((a, b) => a + b, 0)

        return chamberFollowersTotal

    }



    function followers() {


    

        var arr = [];
        var followArr = [];
        var dateArr = [];
        var changeArr = [];
        
        function weekDate () {

            for(let i = 0; i < weeks; i++) {

            var date = new Date();
            date.setDate(date.getDate() + (7 * i));

                function formatDate(date) {

                    var d = new Date(date),
                        month = '' + (d.getMonth() + 1),
                        day = '' + d.getDate(),
                        year = d.getFullYear();
                
                    if (month.length < 2) 
                        month = '0' + month;
                    if (day.length < 2) 
                        day = '0' + day;
                
                    return [year, month, day].join('-');
                }

            dateArr.push(formatDate(date));
        }


    return dateArr
}

    weekDate();


        function follows () {
            
            for( let i = 0; i < weeks; i++) {


                var chamberFollowers = chamber.map(td => td.followerData[i].followers)

                var chamberFollowersTotal = chamberFollowers.reduce((a, b) => a + b, 0)

                followArr.push(chamberFollowersTotal)
        
            }
        }

    follows();

        function change() {

            for( let i = 0; i < followArr.length; i++) {

                var lastWeek  = followArr[i - 1]
                var thisWeek = followArr[i]
                var diff = ((thisWeek - lastWeek) / lastWeek) * 100;
                
                //filter NaN at start

                if(diff !== diff) {changeArr.push(0)} else {
                changeArr.push(diff)
                }
            }
        }

        change();

        function toObj() {

        
        for(let i = 0; i < weeks; i++) {

            var followObj = new Object;
            var date = dateArr[i];
            var followers = followArr[i];
            var change = changeArr[i];

            followObj.date = date;
            followObj.followers = followers;
            followObj.change = change;
            
            arr.push(followObj)
        }
        return arr
        }

        toObj();

        return arr

    }

    function retweets() {


    

        var arr = [];
        var retweetArr = [];
        var dateArr = [];
        var changeArr = [];
        
        function weekDate () {

            for(let i = 0; i < weeks; i++) {

            var date = new Date();
            date.setDate(date.getDate() + (7 * i));

                function formatDate(date) {

                    var d = new Date(date),
                        month = '' + (d.getMonth() + 1),
                        day = '' + d.getDate(),
                        year = d.getFullYear();
                
                    if (month.length < 2) 
                        month = '0' + month;
                    if (day.length < 2) 
                        day = '0' + day;
                
                    return [year, month, day].join('-');
                }

            dateArr.push(formatDate(date));
        }


    return dateArr
}

    weekDate();


        function retweets () {
            
            for( let i = 0; i < weeks; i++) {


                var chamberRetweets = chamber.map(td => td.retweetData[i].retweets)

                var chamberRetweetsTotal = chamberRetweets.reduce((a, b) => a + b, 0)

                retweetArr.push(chamberRetweetsTotal)
        
            }
        }

    retweets();

        function change() {

            for( let i = 0; i < retweetArr.length; i++) {

                var lastWeek  = retweetArr[i - 1]
                var thisWeek = retweetArr[i]
                var diff = ((thisWeek - lastWeek) / lastWeek) * 100;
                
                //filter NaN at start

                if(diff !== diff) {changeArr.push(0)} else {
                changeArr.push(diff)
                }
            }
        }

        change();

        function toObj() {

        
        for(let i = 0; i < weeks; i++) {

            var retweetObj = new Object;
            var date = dateArr[i];
            var retweets = retweetArr[i];
            var change = changeArr[i];

            retweetObj.date = date;
            retweetObj.retweets = retweets;
            retweetObj.change = change;
            
            arr.push(retweetObj)
        }
        return arr
        }

        toObj();

        return arr

    }



    function ChamberObj() {

        this.name = 'Dáil Éireann'
        this.followerData = followers()
        this.retweetData = retweets()

    }

    return new ChamberObj



}

export function justParty(party, data) {

    var TDData = data

    var just = TDData.filter(td => td.party == party)

    return just

}


export function partyStats(party) {

    //chamber
    var currentParty = justParty(party) 

    function followers() {

        var arr = [];
        var followArr = [];
        var dateArr = [];
        var changeArr = [];
        
        function weekDate () {

            for(let i = 0; i < weeks; i++) {

            var date = new Date();
            date.setDate(date.getDate() + (7 * i));

                function formatDate(date) {

                    var d = new Date(date),
                        month = '' + (d.getMonth() + 1),
                        day = '' + d.getDate(),
                        year = d.getFullYear();
                
                    if (month.length < 2) 
                        month = '0' + month;
                    if (day.length < 2) 
                        day = '0' + day;
                
                    return [year, month, day].join('-');
                }

            dateArr.push(formatDate(date));
        }


    return dateArr
}

    weekDate();


        function follows () {
            
            for( let i = 0; i < weeks; i++) {


                var partyFollowers = currentParty.map(td => td.followerData[i].followers)

                var partyFollowersTotal = partyFollowers.reduce((a, b) => a + b, 0)

                followArr.push(partyFollowersTotal)
        
            }
        }

    follows();

        function change() {

            for( let i = 0; i < followArr.length; i++) {

                var lastWeek  = followArr[i - 1]
                var thisWeek = followArr[i]
                var diff = ((thisWeek - lastWeek) / lastWeek) * 100;
                
                //filter NaN at start

                if(diff !== diff) {changeArr.push(0)} else {
                changeArr.push(diff)
                }
            }
        }

        change();

        function toObj() {

        for(let i = 0; i < weeks; i++) {

            var followObj = new Object;
            var date = dateArr[i];
            var followers = followArr[i];
            var change = changeArr[i];

            followObj.date = date;
            followObj.followers = followers;
            followObj.change = change;
            
            arr.push(followObj)

            
        }
    return arr
        
        }

        toObj();


        return arr
    } 

    function retweets() {

        var arr = [];
        var retweetArr = [];
        var dateArr = [];
        var changeArr = [];
        
        function weekDate () {

            for(let i = 0; i < weeks; i++) {

            var date = new Date();
            date.setDate(date.getDate() + (7 * i));

                function formatDate(date) {

                    var d = new Date(date),
                        month = '' + (d.getMonth() + 1),
                        day = '' + d.getDate(),
                        year = d.getFullYear();
                
                    if (month.length < 2) 
                        month = '0' + month;
                    if (day.length < 2) 
                        day = '0' + day;
                
                    return [year, month, day].join('-');
                }

            dateArr.push(formatDate(date));
        }


    return dateArr
}

    weekDate();


        function retweets () {
            
            for( let i = 0; i < weeks; i++) {


                var partyRetweets = currentParty.map(td => td.retweetData[i].retweets)

                var partyRetweetsTotal = partyRetweets.reduce((a, b) => a + b, 0)

                retweetArr.push(partyRetweetsTotal)
        
            }
        }

    retweets();

        function change() {

            for( let i = 0; i < retweetArr.length; i++) {

                var lastWeek  = retweetArr[i - 1]
                var thisWeek = retweetArr[i]
                var diff = ((thisWeek - lastWeek) / lastWeek) * 100;
                
                //filter NaN at start

                if(diff !== diff) {changeArr.push(0)} else {
                changeArr.push(diff)
                }
            }
        }

        change();

        function toObj() {

        for(let i = 0; i < weeks; i++) {

            var retweetObj = new Object;
            var date = dateArr[i];
            var retweets = retweetArr[i];
            var change = changeArr[i];

            retweetObj.date = date;
            retweetObj.retweets = retweets;
            retweetObj.change = change;
            
            arr.push(retweetObj)

            
        }
    return arr
        
        }

        toObj();


        return arr
    }


    function PartyObj() {

        this.id = justParty(party)[0].party
        this.name = justParty(party)[0].partyName
        this.partyColor = justParty(party)[0].partyColor
        this.followerData = followers()
        this.retweetData = retweets()

    }

    return new PartyObj()
}

export function allParties() {

    const parties = [];

    const partyIDs = ["sf", "ff", "fg", "ind", "grn", "pbp", "l", "ia"];


    for(let i = 0; i < partyIDs.length; i++) {
        parties.push(partyStats(partyIDs[i]))
    }

    return parties


}


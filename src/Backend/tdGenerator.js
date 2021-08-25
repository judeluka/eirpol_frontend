import { format, interpolate } from "d3"

export function dailMaker(weeks) {

    var arr = [];

    for(let i = 0; i < 160; i++) {

    var id =+ i;

    function name() {

        const nameList = ["Al ", "Leo ", "Mick ", "Paddy ", "Mary ", "Mona ", "Holly ", "Thomas ", "Michael ", "Eamon "];
        
        const surnameList = ["Varadkar", "Martin", "Ryan", "Zappone", "Cairns", "Byrne", "O' Callaghan", "Lou MacDonald", "Haughey", "Ahern"]
       
        var a = Math.floor(Math.random() * 10);
        var b = Math.floor(Math.random() * 10);

        var c = nameList[a].concat(surnameList[b])

        return c
    }

    
    var a = Math.floor(Math.random() * 8)

    function party() {

        const parties = ["sf", "ff", "fg", "l", "ind", "grn", "pbp", "ia"]

        return parties[a]

    } 

    function partyName() {


            const partyNames = ["Sinn Féin","Fianna Fáil","Fine Gael", "Labour", "Independent", "Green Party", "People Before Profit", "Independent Alliance"]

            return partyNames[a]
        

    }
    
    function partyColor() {

        //const partyColor = [{"sf": "#326760"}, { "ff" : "#66BB66"}, {"fg":"#6699FF"}, {"l":"#CC0000"}, {"ind":"white"}, {"grn":"#99CC33"}, {"pbp":"#660000"}, {"ia": "#CCCCFF"}]
        
        const partyColors = ["#326760","#66BB66","#6699FF","#CC0000","white","#99CC33","#660000", "#CCCCFF"]

        return partyColors[a]

    }

    function mOG() {

        const isOf = [true, false]

        var a = Math.floor(Math.random() * 2)

        return isOf[a]
    }


    function followers(weeks) {


    

        var arr = [];
        var followArr = [];
        var dateArr = [];
        var changeArr = [];
        
        function weekDate (weeks) {

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

    weekDate(weeks);


        function follows (weeks) {

            var base = 1000;

            //first week
            followArr.push(base);
            
            for( let i = 0; i < weeks - 1; i++) {

                base =+ (base + Math.floor(Math.random() * 99))
                followArr.push(base)
            }
        }

    follows(weeks);

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

        function toObj(weeks) {

        
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

        toObj(weeks);

        return arr

    }

    function retweets(weeks) {


    

        var arr = [];
        var retweetArr = [];
        var dateArr = [];
        var changePerArr = [];
        var changeNumArr = [];
        
        function weekDate (weeks) {

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

    weekDate(weeks);


        function retweets (weeks) {

            var base = 450;

            //first week
            retweetArr.push(base);
            
            for( let i = 0; i < weeks - 1; i++) {

                base =+ (base + Math.floor(Math.random() * 99))
                retweetArr.push(base)
            }
        }

    retweets(weeks);

        function changePer() {

            for( let i = 0; i < retweetArr.length; i++) {

                var lastWeek  = retweetArr[i - 1]
                var thisWeek = retweetArr[i]
                var diff = ((thisWeek - lastWeek) / lastWeek) * 100;
                
                //filter NaN at start

                if(diff !== diff) {changePerArr.push(0)} else {
                changePerArr.push(diff)
                }
            }
        }

        changePer();

        function changeNum() {

            for( let i = 0; i < retweetArr.length; i++) {

                var lastWeek  = retweetArr[i - 1]
                var thisWeek = retweetArr[i]
                var diff = thisWeek - lastWeek
                
                //filter NaN at start

                if(diff !== diff) {changeNumArr.push(0)} else {
                changeNumArr.push(diff)
                }
            }
        }

        changeNum();



        function toObj(weeks) {

        
        for(let i = 0; i < weeks; i++) {

            var retweetObj = new Object;
            var date = dateArr[i];
            var retweets = retweetArr[i];
            var changeNum = changeNumArr[i]
            var changePer = changePerArr[i];

            retweetObj.date = date;
            retweetObj.retweets = retweets;
            retweetObj.changeNum = changeNum;
            retweetObj.changePer = changePer;

            arr.push(retweetObj)
        }
        return arr
        }

        toObj(weeks);

        return arr

    }

    function sentiment() {

        return Math.random() * 1

    }

    function img() {

        const imgArr = 
    ["https://data.oireachtas.ie/ie/oireachtas/member/id/Damien-English.D.2002-06-06/image/large",
    "https://data.oireachtas.ie/ie/oireachtas/member/id/Peadar-T%C3%B3ib%C3%ADn.D.2011-03-09/image/large",
    "https://data.oireachtas.ie/ie/oireachtas/member/id/Johnny-Guirke.D.2020-02-08/image/large",
    "https://data.oireachtas.ie/ie/oireachtas/member/id/Eamon-Ryan.D.2002-06-06/image/large",
    "https://data.oireachtas.ie/ie/oireachtas/member/id/Leo-Varadkar.D.2007-06-14/image/large",
    "https://data.oireachtas.ie/ie/oireachtas/member/id/Holly-Cairns.D.2020-02-08/image/large",
    "https://data.oireachtas.ie/ie/oireachtas/member/id/Miche%C3%A1l-Martin.D.1989-06-29/image/large"
    ]

    var a = Math.floor(Math.random() * 7)

    return imgArr[a]


    }


    function TD() {

        this.id = id
        this.name = name()
        this.img = img()
        this.party = party()
        this.partyName= partyName()
        this.partyColor = partyColor()
        this.mOG = mOG()
        this.followerData = followers(weeks)
        this.totalFollowers = this.followerData[this.followerData.length - 1].followers
        this.retweetData = retweets(weeks)
        this.totalRetweets = this.retweetData[this.retweetData.length - 1].retweets
        this.sentiment = sentiment()
    }


    arr.push(new TD)

}

return arr

}
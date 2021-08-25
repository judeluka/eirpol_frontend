


var tdobj;

fetch(url)
  .then(res => res.json())
  .then(data => tdobj = data)


function mongoTDobj() {



    var nameArr = tdJSON.map(d => d.fullName)
    var partyArr = tdJSON.map(d => d.memberships[0].membership.parties[0].party.showAs)
    var screenNameArr = tdTwitJON.map(d => d.screen_name)
    var twitIDArr = tdTwitJON.map(d => d.user_id)
    
    
    var length = nameArr.length -1
    
    
    var tdObjArr = []
    
    
    
    
    for( let i = 0; i <= length; i++) {
    
    function getName() {
    
    
        return nameArr[i]
    
    }
    
    
    function getParty() {
       
        return partyArr[i]
    
    }
    
    function getScreenName() {
    
        return screenNameArr[i]
    }
    
    function getTwitID() {
    
    
    return twitIDArr[i]
    
    }
    
    function TD() {
    
        this.id = i
        this.name = getName()
        this.party = getParty()
        this.screen_name = getScreenName()
        this.user_id = getTwitID()
        this.followerData = []
        this.retweetData = []
    
    }
    
       tdObjArr.push(new TD()) 
    
    }
    
        return tdObjArr
    
    }
    
    console.log(mongoTDobj())
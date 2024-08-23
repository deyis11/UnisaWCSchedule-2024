
function parseEvents(EVENTS) {

    let parsedEvents = [];
    console.log(EVENTS);

    for(const event of EVENTS) {

        //console.log(FILTER);

        

        if ((FILTER && FILTER == event.Section.Value) || !FILTER) {

        if(moment.utc(event.Date).add(2, 'hours') > moment().subtract(1,'days').endOf('day') && moment.utc(event.Date).add(2, 'hours') < moment().add(7,'days').startOf('day')) {
            //console.log(event);

            //Get al venues
            let venues = {
                capeTown: [],
                george: [],
                online: [],
                other: []
            };

            let platforms = [];

            for (const venue of event.Venues) {
                //console.log(venue);
                if (venue["Value"].indexOf("Campus") !== -1) {
                    var n = venue["Value"].lastIndexOf('-');
                    venues.capeTown.push(venue["Value"].substring(0, n));
                } else if (venue["Value"].indexOf("Centre") !== -1) {
                    var n = venue["Value"].lastIndexOf('-');
                    venues.george.push(venue["Value"].substring(0, n ));
                } else if (venue["Value"].indexOf("Online") !== -1) {
                    var n = venue["Value"].lastIndexOf('-');
                    venues.online.push(venue["Value"].substring(0, n));
                } else {
                    venues.other.push(venue["Value"]);
                }
            }

            for (const platform of event.Session_Platforms) {
                //console.log(venue);
                platforms.push(platform["Value"]);
            }

            let eventToAdd = {
                date: (event.Date ? moment.utc(event.Date).add(2, 'hours').format('dddd, DD MMMM YYYY') : null),
                time: (event.Date ? moment.utc(event.Date).add(2, 'hours').format('HH:mm') : '') + ' - ' + (event.EndTime ? moment.utc(event.EndTime).add(2, 'hours').format('HH:mm') : ''),
                venues: venues,
                title: (event.Title ? event.Title : ''),
                description: (event.Description ? event.Description : ''),
                facilitator: (event.Facilitator ? event.Facilitator : ''),
                notice: (event.Notice ? event.Notice : ''),
                section: (event.Section.Value ? event.Section.Value : ''),
                sessionCategory: (event.Session_Category && event.Session_Category.Value  ? event.Session_Category.Value : ''),
                sessionPlatforms: platforms,
                msTeamsLink: (event.MS_Teams_Link ? event.MS_Teams_Link : ''),
                resourcesLink: (event.Resources_Link ? event.Resources_Link: ''),
                recordingLink: (event.FOL_Session && event.FOL_Session.Id ? 'https://mymodules.unisa.ac.za/access/content/group/WESTERN-CAPE-REGION/Resources/myUnisa_Recordings/index.html?module=' + event.FOL_Session.Id : 'https://mymodules.unisa.ac.za/access/content/group/WESTERN-CAPE-REGION/Resources/myUnisa_Recordings/index.html'),
                dateTime: (event.Date ? moment.utc(event.Date).add(2, 'hours').unix() : null)
                //dateTime: dateToNumber.toTimeString()
            }

            parsedEvents.push(eventToAdd);
        }
    }

        

    }

    parsedEvents.sort(compareValues('title'));

    return parsedEvents.sort(compareValues('dateTime'));

}

function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        const varA = (typeof a[key] === 'string') ?
            a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string') ?
            b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
}
let PAGE_LENGHT = 50;
let FILTER = null;


// Tutorial
// Writing%20Centre
// Numeracy%20Centre
// Digital%20Learning
// Postgraduate


$(document).ready(function () {
    //Get Parameters
    let params = getParams(window.location.href);

    if (params.length) {
        PAGE_LENGHT = params.length;
    }

    if (params.filter) {
        FILTER = params.filter;
    }

    // Get Data
    //Get Data
    getData(); //run function once on startup
    setInterval(getData, 30 * 60 * 1000) //and again every five minutes

    //Parse Events

    // let parsedEvents = parseEvents();

    // console.log(parsedEvents);

    // showScedulePage(parsedEvents);
});

function getData () {
    //Show location and date
    // showHeader();
    // showDate();
    //your code here
    //console.log('Loading Data');
    let request = new XMLHttpRequest();
    //request.open('GET', 'https://www.googleapis.com/drive/v3/files/1jP_yzd2kpHnHyx6s-w8eNJIYJnI4qLNeNHQkDU6rrVE/export?key=AIzaSyA8WTU9SsJleUjmAqdDY7294R1WVxMqAOg&mimeType=text/plain');
    request.open('GET', 'https://www.googleapis.com/drive/v3/files/1yxFGGUZRr1JxWJGmBrYkBFCdiCAWzJSpwunCVn20_5U/export?key=AIzaSyA8WTU9SsJleUjmAqdDY7294R1WVxMqAOg&mimeType=text/plain');
    
    request.responseType = 'text';
    request.onload = function() {
        let parsedEvents = parseEvents(eval(request.response));
        showScedulePage(parsedEvents);
      };
    request.send();
 }

/**
 * Get the URL parameters
 * source: https://css-tricks.com/snippets/javascript/get-url-variables/
 * @param  {String} url The URL
 * @return {Object}     The URL parameters
 */
var getParams = function (url) {
    var params = {};
    var parser = document.createElement('a');
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
};
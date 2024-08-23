// Select DOM elements to work with
const authenticatedNav = document.getElementById('authenticated-nav');
const accountNav = document.getElementById('account-nav');
const mainContainer = document.getElementById('main-container');
const errorContainer = document.getElementById('error-container');

const modulesContainer = document.getElementById('modules-container');
const filesContainer = document.getElementById('files-container');
const recordingsContainer = document.getElementById('recordings-container');



function createElement(type, className, text) {
    var element = document.createElement(type);
    element.className = className;

    if (text) {
        var textNode = document.createTextNode(text);
        element.appendChild(textNode);
    }

    return element;
}



function showLoadingPage(resource) {

    var container = createElement('div', 'container');

    var loadingMessage = createElement('h2', null, 'Loading ' + resource + '...');
    container.appendChild(loadingMessage);
    
    var row4 = createElement('div', 'row');

    var supportMessage = createElement('p', 'mt-4 mb-4', 'If you encounter any problems viewing the resources please complete the following form: ');
    var formLink = createElement('a');
    var link = document.createTextNode("Support Form");
    formLink.appendChild(link);
    formLink.title = "https://forms.office.com/Pages/ResponsePage.aspx?id=jIuayqM-mUekPlUQOY56OxJ6iDlIGxFHqexzN7MLxFJUMjhaRlMzRjg2RU4zS0tFSVdKVzlCNE5XRi4u";
    formLink.href = "https://forms.office.com/Pages/ResponsePage.aspx?id=jIuayqM-mUekPlUQOY56OxJ6iDlIGxFHqexzN7MLxFJUMjhaRlMzRjg2RU4zS0tFSVdKVzlCNE5XRi4u";
    formLink.target = "_blank";
    supportMessage.appendChild(formLink);
    row4.appendChild(supportMessage);
    container.appendChild(row4);
    mainContainer.innerHTML = '';
    mainContainer.appendChild(container);
}


function showScedulePage(parsedEvents) {
    //console.log("Events Page");

    var container = createElement('div', 'container')

    //Add Table

    var table = createElement('table', 'table table-striped table-bordered');
    table.id = 'schedule';
        container.appendChild(table);

        let tableLabels = ['Date', 'Time', 'Event', 'Tutor / Facilitator', 'Section / Type', 'Venue / Platform', 'DateTime'];

        var thead = document.createElement('thead');
        table.appendChild(thead);

        var headerrow = document.createElement('tr');
        thead.appendChild(headerrow);

        for (const item of tableLabels) {
            headerrow.appendChild(createElement('th', null, item));
        }

        var tfoot = document.createElement('tfoot');
        table.appendChild(tfoot);

        var footerrow = document.createElement('tr');
        tfoot.appendChild(footerrow);

        for (const item of tableLabels) {
            footerrow.appendChild(createElement('th', null, item));
        }

        var tbody = document.createElement('tbody');
        table.appendChild(tbody);

    mainContainer.innerHTML = '';
    mainContainer.appendChild(container);
    addEventsTable(parsedEvents);
}



function showError(error) {
    var alert = createElement('div', 'alert alert-danger');

    var message = createElement('p', 'mb-3', error.message);
    alert.appendChild(message);

    if (error.debug) {
        var pre = createElement('pre', 'alert-pre border bg-light p-2');
        alert.appendChild(pre);

        var code = createElement('code', 'text-break text-wrap',
            JSON.stringify(error.debug, null, 2));
        pre.appendChild(code);
    }

    errorContainer.innerHTML = '';
    errorContainer.appendChild(alert);
}
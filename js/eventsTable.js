function addEventsTable(events) {
    $('#schedule').DataTable({
        data: events,
        columns: [{
                data: "date"
            },
            {
                data: "time",
                class: "text-center strong-text"
            },
            // {
            //     data: null,
            //     render: function (data, type, row) {
            //         let htmlOut = '';
            //         if (data['venues']['capeTown'].length > 0) {
            //             htmlOut = htmlOut + 'Cape Town Campus: <br>';
            //             for(const venue of data['venues']['capeTown']) {
            //                 htmlOut = htmlOut + venue + ' '
            //             }
            //             htmlOut = htmlOut + '<br><br>'
            //         }
            //         if (data['venues']['george'].length > 0) {
            //             htmlOut = htmlOut + 'George: <br>';
            //             for(const venue of data['venues']['george']) {
            //                 htmlOut = htmlOut + venue + ' '
            //             }
            //         }
            //         if (data['venues']['online'].length > 0) {
            //             htmlOut = htmlOut + 'Online: <br>';
            //             for(const venue of data['venues']['online']) {
            //                 htmlOut = htmlOut + venue + ' '
            //             }
            //         }
            //         if (data['venues']['other'].length > 0) {
            //             htmlOut = htmlOut + 'External Venues: <br>';
            //             for(const venue of data['other']['online']) {
            //                 htmlOut = htmlOut + venue + ' '
            //             }
            //         }
            //         return htmlOut;
            //     }
            // },
            {
                data: null,
                render: function (data, type, row) {
                    let htmlOut = '<strong>' + data['title'] + ' </strong>';
                    if (data['description'] != '') {
                        htmlOut = htmlOut + '<br>' + data['description'];
                        
                    }
                    if (data['notice'] != '') {
                        htmlOut = htmlOut + '<br><span style="color: red">' + data['notice']['Value'] + '</span>';
                    }
                    return htmlOut;
                }
            },
            {
                data: "facilitator"
            },
            {
                data: null,
                render: function (data, type, row) {
                    let htmlOut = data['section'] + "<br><em>" + data['sessionCategory'] + "</em>";
                    return htmlOut;
                }
            },
            {
                data: null,
                render: function (data, type, row) {
                    let htmlOut = '';

                    if(data["sessionPlatforms"].includes("Venue")) {
                        if (data['venues']['capeTown'].length > 0) {
                            htmlOut = htmlOut + '<em>Cape Town Campus Venues: </em><br>';
                            for(const venue of data['venues']['capeTown']) {
                                htmlOut = htmlOut + venue + ' '
                            }
                            htmlOut = htmlOut + '<br><br>'
                        }
                        if (data['venues']['george'].length > 0) {
                            htmlOut = htmlOut + '<em>George Centre Venues: </em><br>';
                            for(const venue of data['venues']['george']) {
                                htmlOut = htmlOut + venue + ' '
                            }
                            htmlOut = htmlOut + '<br><br>'
                        } 
                    }

                    if(data["sessionPlatforms"].includes("MS Teams") && data['msTeamsLink'] != '') {
                        htmlOut = htmlOut + '<em>Join on MS Teams:</em><br><br>';
                        htmlOut = htmlOut + '<a class="btn btn-default btn-sm btn-block" href="' + data['msTeamsLink'] + '" target="_blank">Join Session</a>';
                        htmlOut = htmlOut + '<br>';
                        if (data['resourcesLink'] != '') {
                            //htmlOut = htmlOut + '<a class="btn btn-default btn-sm btn-block" href="' + data['resourcesLink'] + '" target="_blank">Open Notes</a>';
                            htmlOut = htmlOut + '<a class="btn btn-default btn-sm btn-block" href="' + data['recordingLink'] + '" target="_blank">Notes & Recordings</a>';
                        }
                    }
                    return htmlOut;
                }
            },
            {
                data: "dateTime"
            },
            

        ],
        //Grouping
        "drawCallback": function (settings) {
            var api = this.api();
            var rows = api.rows({
                page: 'current'
            }).nodes();
            var last = null;

            api.column(0, {
                page: 'current'
            }).data().each(function (group, i) {
                if (last !== group) {
                    $(rows).eq(i).before(
                        '<tr style="background-color: #2b579a; color:#ffffff; text-align: center; font-size: 20px;"><td colspan="9">' + dateHeader(group) + '</td></tr>'
                    );

                    last = group;
                }
            });
        },
        //Page setup
        "order": [
            [6, "asc"],
            [1, "asc"],
            [2, "asc"]
        ],
        "columnDefs": [{
            "targets": [0],
            "visible": false,
            "searchable": true
        },
        {
            "targets": [6],
            "visible": false,
            "searchable": false
        }],
        "pageLength": PAGE_LENGHT,
        // initComplete: function () {
        //     this.api().columns([6]).every(function () {
        //         var column = this;
        //         var select = $('<select><option value="ss"></option></select>')
        //             .appendTo($(column.header()).empty())
        //             .on('change', function () {
        //                 var val = $.fn.dataTable.util.escapeRegex(
        //                     $(this).val()
        //                 );

        //                 column
        //                     .search(val ? '^' + val + '$' : '', true, false)
        //                     .draw();
        //             });

        //         column.data().unique().sort().each(function (d, j) {
        //             select.append('<option value="' + d + '">' + d + '</option>')
        //         });
        //     });
        // }
        //"dom": '<"toolbar">frtip'
    });

    //$("div.toolbar").html('<b>Custom tool bar! Text/images etc.</b>');

    //Filter
    if (FILTER) {
        $('#schedule').DataTable().search(FILTER).draw();
    }


}

function dateHeader(stringDate) {

    var newDate = new Date(stringDate);
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";


    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return weekday[newDate.getDay()] + '   ' + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear();
}

$.extend(true, $.fn.dataTable.defaults, {
    //"searching": false,
    "ordering": false
});
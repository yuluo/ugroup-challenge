const guestList = require( "./config/guest-list.json" );
const tableList = require( "./config/table-list.json" );
const planner = require( "./planner" );

if ( planner.plan( guestList, tableList ) ) {
    print( tableList );
} else {
    console.log( "cannot plan seat" );
}

function print( tableList ) {
    tableList.forEach( table => {
        let seating = "Table " + table.name + ": ";
        table.seated.forEach( name => {
            seating += name + ", party of " + getParty( name ) + " & ";
        } );

        console.log( seating.substr( 0, seating.length - 2 ) );
    } );
}

function getParty( name ) {
    return guestList.filter( guest => {
        return guest.name === name;
    } )[ 0 ].party;
}
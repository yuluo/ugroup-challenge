const planner = {
    "canSit": function ( guest, table ) {
        return guest.party <= table.capacity &&
            !table.seated.some( name => {
                return guest.dislike && guest.dislike.indexOf( name ) !== -1;
            } );
    },

    "plan": function ( guestList, tableList ) {
        if ( guestList.length === 0 ) {
            return true;
        } else {
            let guest = guestList[ 0 ];
            for ( let i = 0; i < tableList.length; i++ ) {
                if ( planner.canSit( guest, tableList[ i ] ) ) {
                    tableList[ i ].capacity -= guest.party;
                    tableList[ i ].seated.push( guest.name );

                    if ( planner.plan( guestList.slice( 1 ), tableList ) ) {
                        return true;
                    } else {
                        tableList[ i ].capacity += guest.party;
                        tableList[ i ].seated.pop();
                    }
                }
            }

            return false;
        }
    }
};

module.exports = planner;
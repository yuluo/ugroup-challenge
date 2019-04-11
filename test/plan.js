const chai = require( 'chai' );
const expect = chai.expect;
const planner = require( '../planner' );
const guestListTemplate = require( "../config/guest-list.json" );
const tableListTemplate = require( "../config/table-list.json" );

describe( 'unit test for plan', function () {
    var guest;
    var table;
    var guestList;
    var tableList;

    beforeEach( () => {
        guest = {
            "name": "Owens",
            "party": 6,
            "dislike": [ "Thornton", "Taylor" ]
        };

        table = {
                "name": "A",
                "capacity": 8,
                "seated": []
            },

            guestList = JSON.parse( JSON.stringify( guestListTemplate ) );
        tableList = JSON.parse( JSON.stringify( tableListTemplate ) );
    } );

    it( 'should return false if guest party exceeds capacity', () => {
        table.capacity = 5;

        let result = planner.canSit( guest, table );

        expect( result ).to.equal( false );
    } );

    it( 'should return false if there is dislike at table', () => {
        table.seated.push( 'Taylor' );

        let result = planner.canSit( guest, table );

        expect( result ).to.equal( false );
    } );

    it( 'should return true if dislike does not match', () => {
        table.seated.push( 'some one' );

        let result = planner.canSit( guest, table );

        expect( result ).to.equal( true );
    } );

    it( 'should return true if there is no dislike', () => {
        table.seated.push( 'some one' );
        delete guest.dislike;

        let result = planner.canSit( guest, table );

        expect( result ).to.equal( true );
    } );

    it( 'should return true if guestList is 0', () => {
        let result = planner.plan( [], [] );

        expect( result ).to.equal( true );
    } );

    it( 'should return true if every one can be seated 1', () => {
        let result = planner.plan( guestList, tableList );

        expect( result ).to.equal( true );
    } );

    it( 'should return true if every one can be seated 2', () => {
        guestList[ 1 ].party = 6;
        let result = planner.plan( guestList, tableList );

        expect( result ).to.equal( true );
    } );

    it( 'should return false if some one can not be seated', () => {
        guestList[ 0 ].party = 9;
        let result = planner.plan( guestList, tableList );

        expect( result ).to.equal( false );
    } );

} );
/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    /* Feed testing suite
    ============== */

    describe('RSS Feeds', function() {

        // check all feeds is defined and not empty

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        // looping through feeds and checking they have an url associated

        it('have each got a valid url associated', function(){
            allFeeds.forEach(function(feed){
                let url = feed.url;
                const urlSubstring = 'http';
                expect(url).toBeDefined();
                expect(url.indexOf(urlSubstring)).not.toBe(-1);
            })
         })

        // looping through feeds and checking they have a name assigned

        it('have each got a name associated', function(){
            allFeeds.forEach(function(feed){
                let name = feed.name;
                expect(name).toBeDefined();
                expect(name.length).not.toBe(0);
            })
         })
    });


    /* Menu visibility testing suite
    ============== */

    describe('The menu', function() {

        const menuIcon = $('.menu-icon-link');

        // testing for menu hidden by default

        it('is hidden by default', function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
        })

        // testing menu visibility toggle

        it('toggles visibility when clicked', function(){
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        })
    });

    /* Initial Entries testing suite
    ============== */

    describe('Initial Entries', function(){

        // testing for minimum of one entry in initial feed

        beforeEach(function(done){
            loadFeed(0, function(){
                done();
            });
        });

        it('should have a minimum of one entry for feed loaded', function(done){
            expect($('.feed .entry-link').length).not.toBe(0);
            done();
        });

    })

    /* New Feed Selection testing suite
    ============== */

    describe('New Feed Selection', function(){

        // testing when a new feed is loaded that the content actually changes.

        let firstFeed;
        let secondFeed;

        beforeEach(function(done){
            loadFeed(0, function(){
                firstFeed = $('.feed').html();
                loadFeed(1, function(){
                    secondFeed = $('.feed').html();
                    done();
                });
            });
        });

        it('should be different to previous Feed Selection', function(done){
            expect(firstFeed === secondFeed).toBe(false);
            done();
        });
    })
}());

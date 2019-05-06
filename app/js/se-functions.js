/* expandingMenu functions
 * PubList function
 * popUp function
 */

function popUp(URL) {
    day = new Date();
    id = day.getTime();
    window['page' + id] = window.open(URL, '" + id + "', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=700,height=560,left = 0,top = 0');
}

jQuery(document).ready(function($) {
    
    //popup ablak nyitása popup class link esetén
    $('.popup').on('click', function(e){
            popUp(jQuery(this).attr('href'));
            return false;
    });

    // false means 'collapsed', set true to 'open'
    var open = {
        'level2': false,
        'level3': false
    };

    /**
     * Calculate depth of menu element.
     **/
    function depth(element, root) {
        var depth = 1;
        while (true) {
            if (element[0] === root[0]) {
                break;
            }
            depth++;
            element = $(element).parent().parent();
        }
        return depth;
    }

    function setButtonClose() {
        $(this).attr('class', 'closed');
        $(this).html('&#9658;');
    }

    function setButtonOpen() {
        $(this).attr('class', 'open');
        $(this).html('&#9660;');
    }

    // Add toggle button to all menu elements that have children pages.
    $("#menu > li > ul > li").each(function() {
        var root = $(this).parent();
        $("ul.children", this).each(function() {
            var parentListItem = $(this).parent(),
                currentDepth = depth(this, root);

            parentListItem.addClass("has-children");
            parentListItem.prepend('<button></button>');
            var buttons = $("button", parentListItem);

            // by default all elements are open
            buttons.each(setButtonOpen);

            // closes elements by config
            if (typeof open['level' + currentDepth] !== 'undefined' && open['level' + currentDepth] === false) {
                setButtonClose.call($("button", parentListItem));
                $(this).toggle();
            }

            // prevent collapsing the submenu if it contains the current page item
            var has_active_child = $('.current_page_item', this).length > 0;
            if (has_active_child === true || parentListItem.hasClass('current_page_item')) {
                if ($("button", parentListItem).hasClass('closed')) {
                    setButtonOpen.call($("button", parentListItem));
                    $(this).toggle();
                }
            }

            // toggle elements on button click
            var currentMenu = this;
            buttons.click(function(evt) {
                if ($(this).hasClass('open')) {
                    setButtonClose.call(this);
                } else {
                    setButtonOpen.call(this);
                }
                $(currentMenu).toggle();
            });
        });
    });
});

/*
 * sebeszet1 könyvtár oldalon használt funkció
 */

function PubList(doctor, doctorname) {
var options="toolbar=0,locationbar=0,personalbar=0,directories=0,copyhistory=0,statusbar=1,menubar=0,scrollbars=yes,noresizable,left=0,top=0,width=620,height=400";
var urls="http://pad.milanka.hu/orvos.php?doctor=" + doctor + "&doctorname=" + doctorname +"";
var popup = window.open(urls, "",  options);
}



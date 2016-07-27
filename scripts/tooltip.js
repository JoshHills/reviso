/*
 * To allow for dynamic-width tooltips, you must attach a script to recalculate their absolute position on-hover.
 * This requires some maths...
 */
function reposition() {

    /* Store position-calculations in variables to reduce method-chaining. */

    // Store the position of the anchor.
    var pos = $(this).position();

    // Get the parent container.
    var container = $(this).parent().parent();

    // Retrieve and store the next span (to be styled as a tooltip).
    var nextSpan = $(this).next('span');

    // Calculate the intended left-position of the tooltip if it were to be positioned centre above the anchor.
    var leftPos = pos.left - ((nextSpan.width() - $(this).width()) / 2)
                    - (parseInt(nextSpan.css('padding-left').replace("px", "")));

    // Calculate the resulting right-position of the tooltip for bounds-checking.
    var rightPos = leftPos + nextSpan.innerWidth();

    // Calculate the distance from the top.
    var spanTop = pos.top - nextSpan.height() - $(this).height() + 12;

    /* Check for overflow and set position accordingly. */

    // If the tooltip overflows to the right...
    if(rightPos > container.width() + parseInt(container.css('padding-right').replace("px", ""))) {

        // Set the tooltip's position to the far-right of the container.                
        nextSpan.css('left', (container.width() - nextSpan.innerWidth()) + parseInt(container.css('padding-right').replace("px", "")) + 'px');

    }
    // If the tooltip overflows to the left...
    else if(leftPos < parseInt(container.css('padding-left').replace("px", ""))) {

        // Set the tooltip's position to the far-left of the container.
        nextSpan.css('left', parseInt(container.css('padding-left').replace("px", "")));

    }
    // Otherwise just set the position normally...
    else {

        nextSpan.css('left', leftPos + 'px');   

    }

    // Set the height offset from the anchor.
    nextSpan.css('top', spanTop + 'px');

    /* Position 'speech bubble' pseudo-content if it exists. */
    var triangle = nextSpan.next('span');

    // If there exists such an element in the HTML...
    if(triangle) {

        // Center it above the anchor.
        triangle.css('left', (pos.left + ($(this).width() / 2)) + 'px');

        // Position it below the tooltip.
        triangle.css('top', (spanTop + nextSpan.innerHeight()) + 'px');

    }

}
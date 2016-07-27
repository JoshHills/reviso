/* File encapsulates the bespoke demonstration functions for this page. */

/* These are pretty straightforward! */

function changeColor() { $('#nav-container').css('background-color', $('#background-color').val()); }

function updatePadding() { $('#dynamic-div').css('padding', $('input#padding').val()); }

function updateBorder() { $('#dynamic-div').css('border', $('input#border').val() + 'px solid #ffffff'); }

function updatePosition() { $('#dynamic-div').css('left', $('input#position').val() + '%'); }
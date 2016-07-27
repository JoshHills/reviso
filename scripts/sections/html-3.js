/* File encapsulates the bespoke demonstration functions for this page. */

/* Create a 3D cube, tutorial taken from 'three.js'. */
$(document).ready(function() {
    
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 60, 2, 0.1, 1000 );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( 1000, 400 );
    $('#three').append(renderer.domElement);

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 2;

    var render = function () {
        requestAnimationFrame( render );

        cube.rotation.x += 0.1;
        cube.rotation.y += 0.1;

        renderer.render(scene, camera);
    };

    render();
    
});
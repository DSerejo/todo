/**
 * Created by dserejo on 1/22/2015.
 */
var teste;
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    console.log('oi');
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    alert('oi');
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}
interact('.post-it')
    .on('tap', function (event) {
       teste = event;
        event.preventDefault();
    })
    .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        restrict: {

            restriction: "parent",
            endOnly: true,
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },

        // call this function on every dragmove event
        onmove: function (event) {
//            if(!event.target.classList.contains('moving')){
//                event.target.classList.add('moving');
//            }

            var target = event.target,
            // keep the dragged position in the data-x/data-y attributes
                x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            // translate the element
            target.style.webkitTransform =
                target.style.transform =
                    'translate(' + x + 'px, ' + y + 'px) scale(0.25)'
                    ;
            // update the posiion attributes
            console.log(x,y);
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        },
        // call this function on every dragend event
        onend: function (event) {
            teste = event;
//            var textEl = event.target.querySelector('p');
            event.target.classList.remove('moving');
            var target = event.target;
            var x = target.getAttribute('data-x');
            var y = target.getAttribute('data-y');
            console.log(x,y);
            target.style.webkitTransform =
                target.style.transform =
                    'translate(' + x + 'px, ' + y + 'px) scale(1) rotate(2deg)'
            ;
//            textEl && (textEl.textContent =
//                'moved a distance of '
//                + (Math.sqrt(event.dx * event.dx +
//                event.dy * event.dy)|0) + 'px');
        }
    });
interact('.dropzone').dropzone({
    // only accept elements matching this CSS selector
    accept: '#yes-drop',
    // Require a 75% element overlap for a drop to be possible
    overlap: 0.75,

    // listen for drop related events:

    ondropactivate: function (event) {
        // add active dropzone feedback
        event.target.classList.add('drop-active');
    },
    ondragenter: function (event) {
        var draggableElement = event.relatedTarget,
            dropzoneElement = event.target;
        dropzoneElement.classList.add('drop-target');
        draggableElement.classList.add('can-drop');

    },
    ondragleave: function (event) {
        // remove the drop feedback style
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');
    },
    ondrop: function (event) {
        event.relatedTarget.textContent = 'Dropped';
    },
    ondropdeactivate: function (event) {
        // remove active dropzone feedback
        event.target.classList.remove('drop-active');
        event.target.classList.remove('drop-target');
    }

});
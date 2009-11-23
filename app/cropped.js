var image = new Image(),
    test = document.getElementById('test');
//     
image.onload = function() {
    test.appendChild(image);
}
//     
//     var x = uki.image.cropped(image, 0, 0, 133, 25);
//     x.style.position = 'absolute';
//     x.style.top = '30px';
//     x.style.left = '0';
//     // x.style.width = "133px"
//     // x.style.height = '30px';
//     test.appendChild(x);
//     
//     x = uki.image.cropped(image, 2, 0, 10, 12);
//     x.style.position = 'absolute';
//     x.style.top = '80px';
//     x.style.left = '0';
//     x.style.width = "200px"
//     x.style.height = "30px"
//     test.appendChild(x);
// };
image.src = '/app/coffee/i/button-normal.png';
// image.src = 'http://localhost:4867/app/coffee/i/button-disabled.png';


var b = uki.build({
    view: 'Base',
    rect: '0 0 1000px 1000px',
    children: [{
        view: 'Label',
        rect: '300px 100px 400px 28px', anchors: "top",
        autosize: 'width',
        text: 'uki is awesome!',
        align: 'center'
    }]
}).attachTo( document.getElementById('test') );

var button = uki.find('Base > [text^=uki]')[0];
button.dom().style.lineHeight = '27px'
// button.dom().style.background = 'red';
var bg = new uki.background.Sliced9('/app/coffee/i/button-normal.png', '4 5');
bg.attachTo(button);
// .bind('click', function() {
//     alert('Hello world!');
// });
uki.layout.perform();

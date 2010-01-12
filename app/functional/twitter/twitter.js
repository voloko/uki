/**
 * JSONP request
 */
function jsonp (url, callback) {
    var name = 'jsonp' +  +new Date,
        script = document.createElement('script'),
        head = document.getElementsByTagName('head')[0];
    window[name] = callback;
    script.src = url.replace(/=\?/, '=' + name);
    head.insertBefore(script, head.firstChild);
}

var template = new uki.theme.Template(
    '<a href="http://twitter.com/${screen_name}">${screen_name}</a> ${tweet}'
);

var tweets = [],
    loading = false;
    
function u (x) {
    return x;
}

function bubbleBg () {
    var prefix = "bubble-"; 
    return new uki.background.Sliced9({ 
        c: [prefix + "c.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAB3UlEQVQ4jZ2Uy6rCQAyG01rvqAtBV25U8P2XbnwPQXeCuFDwhnd7+kUzTCucek4gjLb5v0lnkgRxYpLYe9H18Xjo6jsWBEHKC4WCrvYOiwyCP59PheH3+9399oFA8CiKNJ7fYRi695GBcCC3202u16uuOM94hyEEVCwW1Uulkq484x0eJMExWQC5XC5yPp/leDxKo9GQdrutwb6xwXq9lv1+L/V6XSqVipTLZYXrESQBMZkYaLfbyWAw0J1/MzTz+VyazaYDownt3Mhuu91Kv9/XrLKXknViiEWDFgYsBbIbn1Cr1XIz841YNGhhOCD0zWYjnU4nN7Oso0FrGUZ2u4fDQQ/WSuRbQ4PWqkGBQDiHv8LMTKtAv9Kn0+m/gD5DgRQkNcTB8gl/MerXuuXNesEozsVi8dGveY4GrUEVyPW3Wi1ZLpda4N8asWjQalEDtGanzXq9nkwmEz3kvMyIIRYNWjc0LEN6dzgc6q7j8Vjbj/+0VDar2WymbTcajTQGrWUYJAUZW7cQTOMTjGi1WsnpdEpNm2q1Kt1uV0FsSnaujwEyYP05yK0xJGyisBHPMT7JvgYQQ8GmjLvp+GWpIWvD1TbKDlirDJuDqfONvfbI9ql1UbaIPyDvwsZ+AJRx0QDY+a16AAAAAElFTkSuQmCC"], 
        v: [prefix + "v.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAABDCAYAAACcAiVCAAAAeUlEQVRYw+2Ruw0AMQhDg/efh5EYgC6Vr6W5BiX3UYzkkifMQ2YyIujunHO24u6MCGYmMcqQbKUOKqg7dX/9hV3IXfb8cBtwxfys8oFAWZZlWZYUAWVZQFmWFEmRZUmR5dcrm1krz/3wwAsPqWxmA8AA0AbW/e9XvgByjcbOwf9hEQAAAABJRU5ErkJggg==", false, true], 
        h: [prefix + "h.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEcAAAAUCAYAAADfqiBGAAAAhUlEQVRYw+3XsQnAIBCFYU/cfwJncQ+HsLAQOy+JJqTJNSlCiv+BIJYf71CltaaOPCbsOE5V5yIrIjJXqLXOgzEGKme89wtJqYw9VtiA8268IKA54IDzJU7OGQUL53gJEnC4ymkOzflBc2KMc8OVfueaJkkp8TE3gKSUojTHaE7vHRwDZwNWIUEErINKQAAAAABJRU5ErkJggg=="], 
        m: [prefix + "m.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEcAAABDCAYAAADOIRgJAAAAhUlEQVR42u3VwQkAIAwEQU/sv9+8YgMKfoW5EobVpKp62HGrm81tE4Fy4MCB40NWDhw4cAyOa6UcOHDgwHGtlAOHAhw4PmTlwIEDB45rZcqBAwcOHNdKOXDgwDEfsnLgwIEDx7VSDhyDAweOa6UcOL/gJKHgz1GOcpQDx7NSDhzPypTzsA0USotmfAa77AAAAABJRU5ErkJggg==", false, true] 
    }, "10 10 10 10", {inset: '0 0 7 0'});
}

var widget = uki({ 
    view: 'Box', rect: '200 300', minSize: '200 300', visible: true, 
    anchors: 'left top right bottom', background: '#FFF',
    childViews: [
        { view: 'Box', rect: '200 51', anchors: 'left top right', background: 'theme(panel)', 
            childViews: [
            { view: 'MultilineTextField', rect: '5 5 130 42', 
                anchors: 'left top right', 
                placeholder: "What's happening?", fontSize: '12px' },
            { view: 'Button', rect: '140 5 55 24', anchors: 'right top', 
                text: 'Update' }
            ] },
        { view: 'ScrollPane', rect: '0 50 200 250',
            anchors: 'left top right bottom', childViews: [
                { view: 'VerticalFlow',  rect: '5 5 190 245', anchors: 'left top right bottom' }
            ] }
    ]
});

function renderRow (dataRow, flow) {
    dataRow.screen_name = dataRow.user.screen_name;
    dataRow.tweet = uki.escapeHTML(dataRow.text)
        .replace(/([\w]+:\/\/[a-z0-9$_.+()*,;\/?:@&~=-]+[a-z0-9\/])/ig, '<a href="$1">$1</a>')
        .replace(/(\@(\w+))/g, '<a href="http://twitter.com/$2">$1</a>');
        
    var row = uki({ 
        view: 'Box', 
        rect: '200 80', anchors: 'left top right', background: bubbleBg(),
        childViews: [
            { view: 'Image', rect: '10 10 50 50', anchors: 'left top', 
                src: dataRow.user.profile_image_url },
            { view: 'Label', rect: '65 10 120 40', anchors: 'left top right', 
                multiline: true, html: template.render(dataRow), fontSize: '11px', lineHeight: '13px' }
        ]
    });
    row.rect( new uki.geometry.Rect(flow.rect().width, row.rect().height) );
    row.find('Label').resizeToContents('height');
    row.resizeToContents('height');
    row.rect().height += 20;
    return row[0];
}

function updateRows (data) {
    var flow = widget.find('VerticalFlow');
    var i = 0, firstRow = flow.childViews()[0], firstTweet = tweets[0] || {id:-1};
    while (data[i] && data[i].id != firstTweet.id) {
        flow.insertBefore(renderRow(data[i], flow), firstRow);
        tweets.unshift(data[i]);
        i++;
    }
    flow.resizeToContents('height');
    widget.find('ScrollPane').layout();
}

function appendRows (data) {
    var flow = widget.find('VerticalFlow');
    loading = false;
    uki.each(data, function(i, dataRow) {
        flow.appendChild(renderRow(dataRow, flow));
    });
    flow.resizeToContents('height');
    widget.find('ScrollPane').layout();
    tweets = tweets.concat(data);
}

widget.find('Button').click(function() {
    if (this.disabled()) return;
    this.disabled(true);
    var form = uki.createElement('form', 'position:absolute;left:-999em', '<input type="text" name="status" value="' + uki.escapeHTML(widget.find('MultilineTextField').value()) + '">'),
        iframe = uki.createElement('iframe', 'position:absolute;left:-999em');
    
    iframe.name = 'target_' + +new Date();
    form.target = iframe.name;
    form.method = 'POST';
    form.action = 'http://twitter.com/statuses/update.xml';
    document.body.appendChild(form);
    document.body.appendChild(iframe);
    form.submit();
});

widget.find('ScrollPane').scroll(function() {
    if (this.contentsSize().height - this.scrollTop() - this.rect().height < 50) {
        if (!loading && tweets.length) {
            jsonp('http://api.twitter.com/1/statuses/home_timeline.json?callback=?&since_id=' + tweets[tweets.length - 1].id, appendRows);
            loading = true;
        }
    }
}); 

setTimeout(function() {
    if (loading) return; 
    jsonp('http://api.twitter.com/1/statuses/home_timeline.json?callback=?', updateRows);
}, 5 * 60 * 1000);

jsonp('http://api.twitter.com/1/statuses/home_timeline.json?callback=?', appendRows);

widget.attachTo( document.getElementById('container'), '200 300' );

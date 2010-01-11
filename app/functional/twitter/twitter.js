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

var lastStatusId = null;

var widget = uki({ 
    view: 'Box', rect: '200 300', minSize: '200 300', 
    anchors: 'left top right bottom', 
    childViews: [
        { view: 'Box', rect: '200 50', anchors: 'left top right', background: '#CCF', 
            childViews: [
            { view: 'MultilineTextField', rect: '5 5 130 42', 
                anchors: 'left top right', 
                placeholder: "What's happening?", fontSize: '12px' },
            { view: 'Button', rect: '140 5 55 24', anchors: 'right top', 
                text: 'Update' }
            ] },
        { view: 'ScrollPane', rect: '0 50 200 250', 
            anchors: 'left top right bottom', childViews: [
                { view: 'VerticalFlow',  rect: '200 250', anchors: 'left top right bottom' }
            ] }
    ]
});

function renderRow (dataRow) {
    dataRow.screen_name = dataRow.user.screen_name;
    dataRow.tweet = uki.escapeHTML(dataRow.text);
    return uki({ 
        view: 'Box', 
        rect: '200 80', anchors: 'left top right',
        childViews: [
            { view: 'Image', rect: '5 5 50 50', anchors: 'left top', 
                src: dataRow.user.profile_image_url },
            { view: 'Label', rect: '60 5 135 40', anchors: 'left top right', 
                multiline: true, html: template.render(dataRow), fontSize: '11px' }
        ]
    });
}

function appendRows (data) {
    var flow = widget.find('VerticalFlow');
    lastStatusId = data && data[data.length - 1].id;
    uki.each(data, function(i, dataRow) {
        var row = renderRow(dataRow);
        row.find('Label').resizeToContents('height');
        row.resizeToContents('height');
        row.rect( new uki.geometry.Rect(flow.rect().width, row.rect().height) );
        row.rect().height += 5;
        flow.appendChild(row[0]);
    });
    flow.resizeToContents('height');
    widget.find('ScrollPane').layout();
}

widget.find('Button').click(function() {
    if (this.disabled()) return;
    this.disabled(true);
});

widget.find('ScrollPane').scroll(function() {
    if (this.contentsSize().height - this.scrollTop() - this.rect().height < 50) {
        if (lastStatusId) {
            jsonp('http://api.twitter.com/1/statuses/home_timeline.json?callback=?&since_id=' + lastStatusId, appendRows);
            lastStatusId = null;
        }
    }
}); 

jsonp('http://api.twitter.com/1/statuses/home_timeline.json?callback=?', appendRows);

widget.attachTo( document.getElementById('container'), '200 300' );
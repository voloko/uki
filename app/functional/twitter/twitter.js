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
    
function bubbleBg () {
    var prefix = "i/bubble-"; 
    return new uki.background.Sliced9({ 
        c: [prefix + "c.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABj0lEQVQ4jZ2U666CQAyEF1g14A+jvv+jGZ9AiTEG78pXnU1FkwNnkrrr0hm6pW32aBFavBfD/X4P/kxrlmUfa57niaOz2CUiplV7L4ghhHHOyhl71iiCF7ndbmZeVIISK4rCzIumCHXN6/VqdrlcwmQyCdPp9ONa8muaJhyPxzAajUKM0Qxxe2kbyUNi5/M5nE6nsFgsvoS6gLPdbu3F4/HYRC16XRVBxObz+Z9i+iD4woGr1CRBouMKCr0P8IUD90uQvJAz/5H6GBy4PyMcEp2P0kcYVRLkwRf3EMAFJuirf7PZ/EvQa+TaYGq5IYAjPsj1hzra7XbpYV+DAze1JT8klgLd7/cpH32ALxy4aLxb89WHVVWF2WwW1ut1L1F88IUDV30eFSHtQ8vhuFqtrAv4z3W6QrRcXddhuVyaD1xFmLVJtZHIdMGZIoWAHQ4HGxR+2tAZFDNCWFmWaTiY4OOFVJgIU6gI06caYfYF36OLnCHkI1PqkiDwc9HvPRLRi7g6jNoI3sFP61/Puyt4Am0NjZ06AwKpAAAAAElFTkSuQmCC"],
        v: [prefix + "v.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAABDCAYAAACcAiVCAAAAeklEQVRYw+2WsQrAIAxEa///C/MZmTKI19WCS4NCxXdwkxhyvhu8I0LuLjNTrTVlM5O7KyJ0X50kpdzrNXCG1gzMRh1FXxv5ICj7RAYKUBIbttZS3rg2FJvIQAEKGwIFKEABChseXptSSsp82o9+w2mRRwdf1N//f+QHOSTzcjXgSDUAAAAASUVORK5CYII=", false, true],
        h: [prefix + "h.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEcAAAAUCAYAAADfqiBGAAAAd0lEQVQYGe3BQQ2AQBADwDYpBnihAP9KcIIA7lOyue+ug85orWVES2stFNuIjSSKvu9DsY3YSKLoPE9ET7YRPSFGQoxkG9ETYiTbiJ7e90X0hBiJJKInxEiIkRAjPc+D6Om+b0RP13Wh2EZsJFF0HAeKbcRGEuUHmnolQf2UKf0AAAAASUVORK5CYII="],
        m: [prefix + "m.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEcAAABDCAYAAADOIRgJAAAAiklEQVR42u3VwQkAIAwEQQP2X3FIbEDBrzgpYZnTmZk93PZmtzbHOBKIY1bkkEOOOGZFDjmOHHHMihxyyHkrTlWpQI444ojjKydHHLMix5FDjjhmRQ455JBDjjjOrMghhxxxzIoccshx4pgVOeSQQw454pjVt3EiQgWzEkccbw454pgVOeI4s7q4BXGJRsdjrAwPAAAAAElFTkSuQmCC", false, true]
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
                { view: 'VerticalFlow',  rect: '5 5 190 250', anchors: 'left top right bottom' }
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

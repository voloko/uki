include('../more.js');

uki.more.utils = {
    range: function (from, to) {
        for (var result = new Array(to - from), idx = 0; from <= to; from++, idx++) {
            result[idx] = from;
        };
        return result;
    }
};

uki.extend(uki, uki.more.utils);
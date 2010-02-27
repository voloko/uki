include('../more.js');

uki.more.utils = {
    range: function (from, to) {
        var result = new Array(to - from);
        for (var idx = 0; from <= to; from++, idx++) {
            result[idx] = from;
        };
        return result;
    },
    
    binarySearch: function (array, value) {
        var low = 0, high = array.length, mid;
        while (low < high) {
            mid = (low + high) >> 1;
            array[mid] < value ? low = mid + 1 : high = mid;
        }
        return low;
    }
};
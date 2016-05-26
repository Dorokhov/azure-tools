'use strict'
export module utils {
    export function isOfType(object: any, type: any) {
        return object.constructor.name === type.name;
    }

    if (!String.format) {
        String.format = function (format) {
            var args = Array.prototype.slice.call(arguments, 1);
            return format.replace(/{(\d+)}/g, function (match, number) {
                return typeof args[number] != 'undefined'
                    ? args[number]
                    : match;
            });
        };
    }
}
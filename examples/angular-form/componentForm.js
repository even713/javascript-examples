angular.module("component.form", [])
.constant("MAC_ADDRESS_REGEX", /^([0-9a-fA-F]{2}[:]){5}[0-9a-fA-F]{2}$/)
.filter("macAddressFormatter", function () {
        // format input to sth like CC:0A:BB:EE:3F:9B
        return function (input) {
            let value = input;
            var numbers = value.replace(/:/g, "");
            if (value.length % 3 === 0) {
                value = numbers.replace(/([0-9A-Za-z]{2})/g, "$&:");
            }
            return value.toUpperCase();
        }
});

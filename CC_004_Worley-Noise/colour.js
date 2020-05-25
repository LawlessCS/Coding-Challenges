function getColour(rValue, gValue, bValue, aValue) {
    switch (arguments.length) {
        case 1:
            return {
                r: rValue,
                g: rValue,
                b: rValue,
                a: 255,
            };
            break;
        case 2:
            return {
                r: rValue,
                g: rValue,
                b: rValue,
                a: gValue,
            };
            break;
        case 3:
            return {
                r: rValue,
                g: gValue,
                b: bValue,
                a: 255,
            };
            break;
        case 4:
            return {
                r: rValue,
                g: gValue,
                b: bValue,
                a: aValue,
            };
            break;
    }
}

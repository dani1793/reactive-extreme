// The function is the depiction of curry function it takes a function as an argument and set the partial arguments for that function
// The function is than called with the remaining arguments to complete the function call. When the arguments are complete the origial 
// function is called and the final value is returned
function partial(fn: Function, ...presetArg: any[]) {
    return function partiallyApplied(...laterArgs: any[]) {
        return fn(...presetArg, ...laterArgs);
    }
}

function curry(fn: Function) {
    const arity = fn.length;
    return (function nextCurried(prevArgs: any) {
        return function curried(nextArgs: any) {
            const args = prevArgs.concat([nextArgs]);
            if (args.length >= arity) {
                return fn(...args);
            } else {
                return nextCurried(args);
            }
        };
    })([]);
}

// Unary function is used to convert the function which takes multiple arguments into function which takes one argument
// It helps in chaning of the functions.
function unary(fn: Function): any {
    return function onlyOneArg(arg: any): Function {
        return fn(arg);
    };
};

function identity(v: any): any {
    return v;
}

function constant(v: any): Function {
    return function value(): any {
        return v;
    };
}

function spreadArgs(fn) {
    return function spreadFn(argsArr) {
        return fn(...argsArr);
    };
}

function gatherArgs(fn) {
    return function gatheredFn(...argsArr) {
        return fn(argsArr);
    };
}

function curryProps(fn: Function, arity = 1) {
    return (function nextCurried(prevArgsObj) {
        return function curried(nextArgObj = {}) {
            let [key] = Object.keys(nextArgObj);
            const allArgsObj = Object.assign({}, prevArgsObj, { [key]: nextArgObj[key] });

            if (Object.keys(allArgsObj).length >= arity) {
                return fn(allArgsObj);
            } else {
                return nextCurried(allArgsObj);
            }
        };
    })({});
}

function spreadArgProps(
    fn,
    propOrder =
        fn.toString()
            .replace(/^(?:(?:function.*\(([^]*?)\))|(?:([^\(\)]+?)\s*=>)|(?:\(([^]*?)\)\s*=>))[^]+$/, "$1$2$3")
            .split(/\s*,\s*/)
            .map(v => v.replace(/[=\s].*$/, ""))
) {
    return function spreadFn(argsObj) {
        return fn(...propOrder.map(k => argsObj[k]));
    };
}

function compose2(fn2: Function, fn1: Function): Function {
    return function composed(origValue: any): any {
        return fn2(fn1(origValue));
    };
}

function compose(...fns): any {
    return fns.reverse().reduce(function reducer(fn1: Function, fn2: Function) {
        return function composed(...args) {
            return fn2(fn1(...args));
        };
    });
}

function pipe(...fns): Function {
    return function piped(result) {
        let list = fns.slice();
        while (list.length > 0) {
            // take the first function from the list
            // and execute it
            result = list.shift()(result);
        }
        return result;
    };
}

function add(a, b) {
    return a + b;
}

function words(str: any): any {
    return String(str)
        .toLowerCase()
        .split(/\s|\b/)
        .filter(function alpha(v) {
            return /^[\w]+$/.test(v);
        });
}

function unique(list: any): any {
    let uniqList = [];

    for (let i = 0; i < list.length; i++) {
        // value not yet in the new list?
        if (uniqList.indexOf(list[i]) === -1) {
            uniqList.push(list[i]);
        }
    }

    return uniqList;
}

function skipShortWords(list: any): any {
    let filteredList = [];

    for (let i = 0; i < list.length; i++) {
        if (list[i].length > 4) {
            filteredList.push(list[i]);
        }
    }

    return filteredList;
}


export function pipeTest(): any[] {
    const text = 'To compose two functions together, pass the \
output of the first function call as the input of the \
second function call.';

    const biggerWords = pipe( words, unique, skipShortWords);

    return biggerWords(text);
}

export function composeTest(): any[] {
    const text = 'To compose two functions together, pass the \
output of the first function call as the input of the \
second function call.';

    const biggerWords = compose(skipShortWords, unique, words);

    const wordsUsed = biggerWords(text);

    return wordsUsed;
}
export function curryTest(): any[] {
    return [1, 2, 3, 4, 5].map(curry(add)(3));
}
export function partialTest(): number[] {
    return [1, 2, 3, 4, 5].map(partial(add, 3));

};

export function unaryTest(): any[] {
    return ['1', '2', '3', '4'].map(unary(Number.parseInt));
}

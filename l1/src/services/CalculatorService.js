class CalculatorService {
    getHelloText() {
        return "Hello world";
    }

    sum(param1, param2) {
        if (!param1 || !param2) {
            return {error: "no param"};
        }

        return  {result: param1 + param2};
    }

    div(param1, param2) {
        if (!param1 || !param2) {
            return {error: "no param"};
        } else if (param2 == 0) {
            return {error: "param2 is zero"};
        }

        return  {result: param1 / param2};
    }

    sub(param1, param2) {
        if (!param1 || !param2) {
            return {error: "no param"};
        }

        return  {result: param1 - param2};
    }

    mult(param1, param2) {
        if (!param1 || !param2) {
            return {error: "no param"};
        }

        return  {result: param1 * param2};
    }
}

// module.exports = HelloService;

export default CalculatorService;

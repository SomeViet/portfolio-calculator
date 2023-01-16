import "./App.css";
import { useState } from "react";
import { Wrapper, Screen, ButtonBox, Button } from "./components";

// Define all calculator buttons
let buttonValues = [
    ["AC", "+/-", "%", "÷"],
    [7, 8, 9, "x"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
];

// function to convert number to string
let toLocaleString = (num) => String(num);

let removeSpaces = (num) => num.toString();

// Basic math calculation logic
let math = (a, b, sign) =>
    sign === "+" ? a + b : sign === "-" ? a - b : sign === "x" ? a * b : a / b;

function App() {
    // State for calculator
    let [calc, setCalc] = useState({
        sign: "",
        num: 0,
        res: 0,
        history: "",
    });

    let numClickHandler = (e) => {
        e.preventDefault();
        let value = e.target.innerHTML;

        if (removeSpaces(calc.num).length < 16) {
            setCalc({
                ...calc,
                num:
                    // To prevent spamming 0s
                    calc.num === 0 && value === "0"
                        ? "0"
                        : removeSpaces(calc.num) % 1 === 0
                        ? toLocaleString(Number(removeSpaces(calc.num + value)))
                        : toLocaleString(calc.num + value),
                res: !calc.sign ? 0 : calc.res,
            });
        }
    };

    let decimalClickHandler = (e) => {
        e.preventDefault();
        let value = e.target.innerHTML;

        setCalc({
            ...calc,
            num: calc.num.toString().includes(".")
                ? calc.num
                : calc.num + value,
        });
    };

    let signClickHandler = (e) => {
        e.preventDefault();
        let value = e.target.innerHTML;

        setCalc({
            ...calc,
            sign: value,
            res: !calc.res && calc.num ? calc.num : calc.res,
            num: 0,
        });
    };

    let equalsClickHandler = () => {
        if (calc.sign && calc.num) {
            setCalc({
                ...calc,
                res:
                    calc.num === "0" && calc.sign === "÷"
                        ? "Cannot divide by zero"
                        : math(Number(calc.num), Number(calc.res), calc.sign),
                sign: "",
                num: 0,
            });
        }
    };

    let invertClickHandler = (e) => {
        e.preventDefault();
        setCalc({
            ...calc,
            num: calc.num ? calc.num * -1 : 0,
            res: calc.res ? calc.res * -1 : 0,
            sign: "",
        });
    };

    let percentClickHandler = (e) => {
        e.preventDefault();

        let numFloat = calc.num ? parseFloat(calc.num) : 0;
        let resFloat = calc.res ? parseFloat(calc.res) : 0;

        setCalc({
            ...calc,
            num: (numFloat /= 100),
            res: (resFloat /= 100),
            sign: "",
        });
    };

    let acClickHandler = (e) => {
        e.preventDefault();

        setCalc({
            ...calc,
            sign: "",
            num: 0,
            res: 0,
        });
    };

    return (
        <>
            <Wrapper>
                <Screen value={calc.num ? calc.num : calc.res} />
                <ButtonBox>
                    {buttonValues.flat().map((button, i) => {
                        return (
                            <Button
                                key={i}
                                className={
                                    button === "+" ||
                                    button === "-" ||
                                    button === "x" ||
                                    button === "÷" ||
                                    button === "="
                                        ? "button__bright"
                                        : button === "AC" ||
                                          button === "+/-" ||
                                          button === "%"
                                        ? "button__dull"
                                        : button === 0
                                        ? "button__large"
                                        : "button"
                                }
                                value={button}
                                onClick={
                                    button === "AC"
                                        ? acClickHandler
                                        : button === "%"
                                        ? percentClickHandler
                                        : button === "+/-"
                                        ? invertClickHandler
                                        : button === "="
                                        ? equalsClickHandler
                                        : button === "+" ||
                                          button === "-" ||
                                          button === "x" ||
                                          button === "÷"
                                        ? signClickHandler
                                        : button === "."
                                        ? decimalClickHandler
                                        : numClickHandler
                                }
                            />
                        );
                    })}
                </ButtonBox>
            </Wrapper>
        </>
    );
}

export default App;

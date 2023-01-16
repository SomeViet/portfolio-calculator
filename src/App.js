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

        if (calc.history && calc.res && !calc.num && !calc.sign) {
            setCalc({ ...calc, history: "", sign: "", num: value, res: 0 });
        } else if (removeSpaces(calc.num).length < 16) {
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

        if (calc.num || (!calc.num && !calc.sign)) {
            setCalc({
                ...calc,
                res:
                    // If all 3 variables exist, calculate and store result into variable before storing new sign
                    calc.num && calc.res && calc.sign
                        ? math(Number(calc.num), Number(calc.res), calc.sign)
                        : calc.num && !calc.res
                        ? calc.num
                        : calc.res,
                history: toLocaleString(
                    calc.history && calc.res && !calc.num
                        ? calc.history + " " + value
                        : calc.history + " " + calc.num + " " + value
                ),
                num: 0,
                sign: value,
            });
        }
    };

    let equalsClickHandler = () => {
        if (calc.sign && calc.num) {
            setCalc({
                ...calc,
                res:
                    calc.num === "0" && calc.sign === "÷"
                        ? "Cannot divide by zero"
                        : math(Number(calc.num), Number(calc.res), calc.sign),
                history: toLocaleString(calc.history + " " + calc.num),
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
            history: "",
        });
    };

    return (
        <>
            <Wrapper>
                <Screen
                    value={calc.num ? calc.num : calc.res}
                    history={calc.history}
                />
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

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
// let toLocaleString = (num) => String(num);

// let removeSpaces = (num) => num.toString();

function App() {
    // State for calculator
    let [calc, setCalc] = useState({
        sign: "",
        num: 0,
        res: 0,
        history: "",
    });

    return (
        <>
            <Wrapper>
                <Screen value={"123"} />
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
                                        ? "bright"
                                        : button === "AC" ||
                                          button === "+/-" ||
                                          button === "%"
                                        ? "dull"
                                        : button === 0
                                        ? "large"
                                        : ""
                                }
                                value={button}
                                onClick={""}
                            />
                        );
                    })}
                </ButtonBox>
            </Wrapper>
        </>
    );
}

export default App;

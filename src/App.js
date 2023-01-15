import "./App.css";

import { Wrapper, Screen, ButtonBox } from "./components";

function App() {
    return (
        <>
            <Wrapper>
                <div>history screen</div>
                <Screen value={"123"} />
                <ButtonBox>
                    buttonbox
                    <div>mapped out buttons</div>
                </ButtonBox>
            </Wrapper>
        </>
    );
}

export default App;

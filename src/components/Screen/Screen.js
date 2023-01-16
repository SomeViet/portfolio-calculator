import "./Screen.scss";
import { Textfit } from "react-textfit";

export default function Screen({ value, history }) {
    return (
        <>
            <div className="screen">
                <Textfit className="screen__history" mode="single" max={30}>
                    {history}
                </Textfit>
                <Textfit className="screen__value" mode="single" max={50}>
                    {value}
                </Textfit>
            </div>
        </>
    );
}

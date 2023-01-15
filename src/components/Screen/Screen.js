import "./Screen.scss";
import { Textfit } from "react-textfit";

export default function Screen({ value }) {
    return (
        <Textfit className="screen" mode="single" max={20}>
            {value}
        </Textfit>
    );
}

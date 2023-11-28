import { Fragment, FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type GovernmentsProps = {};

export const Governments: FunctionComponent<GovernmentsProps> = ({ }) => {
    const asd = 4;
    const governments = useSelector(
        (state: RootState) => state.data1.governments
    ); // see store.ts

    return (
        <Fragment>
            <div>
                {governments.map((govI) => (
                    <li>{govI.name}</li>
                ))}
            </div>
        </Fragment>
    );
};

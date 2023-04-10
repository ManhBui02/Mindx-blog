import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import Heading from "./Heading";
import Footer from "./Footer";

export default function Theme(){
    return (
        <Fragment>
            <Heading/>
            <Outlet/>
            <Footer/>
        </Fragment>
    );
}
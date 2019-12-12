import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

class Layout extends React.Component {
    render() {
        return <div>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        {this.props.children}
                    </div>
                    <Sidebar />
                </div>
            </div>
        </div>
    }
}

export default Layout;

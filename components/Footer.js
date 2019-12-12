import React from "react";
import Head from "next/dist/next-server/lib/head";

class Footer extends React.Component {
    render() {
        return(
            <div className="footer">
                <div className="container d-flex justify-content-between align-items-center h-100">
                    <div>Copyright &copy; 2019 | Tüm Hakları Saklıdır</div>
                    <div>Bu site bir <b>Furkan Gezek</b> projesidir.</div>
                </div>
                <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
                <script src="/assets/js/bootstrap.min.js"></script>
            </div>
        )
    }
}

export default Footer;

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import ufpaLogo from '../../assets/ufpa.png';
import logoHospital from '../../assets/hospital-logo.png';
import { Grid } from '@material-ui/core';

import { Desc } from "./styles";

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <Desc>
          <div className="row">
            <p className="col-sm">
              &copy;{new Date().getFullYear()} Khalig | Todos os direitos reservados |
            </p>
          </div>
        </Desc>
      </div>
    </div>
  );
}

export default Footer;
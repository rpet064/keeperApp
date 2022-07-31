import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
  return (
    <footer>
    <div>
        <a href="https://github.com/rpet064"><LinkedInIcon /></a>
        <a href="www.linkedin.com/in/robert-pether-ba9968113"><GitHubIcon/></a>
        <a href="mailto:rpether@hotmail.co.nz"><MailOutlineIcon /></a>
      </div>
     <p>Copyright Robert Pether {new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;
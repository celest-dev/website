// swizzle of the NavbarLogo component from the docusaurus theme.

import React from "react";
import Logo from "@theme/Logo";
export default function NavbarLogo() {
  return (
    <a className="navbar__brand" href="/">
      <div className="navbar__logo">
        <picture className='navbar-logo themedComponent_FXRw themedComponent--light_RIle'>
         <source srcSet="/img/logo.webp" type="image/webp" />
         <img src="/img/logo.png" alt="Celest Logo" />
       </picture>
      </div>
      <b className="navbar__title text--truncate">Celest</b>
    </a>
  );
}

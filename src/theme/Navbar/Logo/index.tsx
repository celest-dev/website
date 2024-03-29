// swizzle of the NavbarLogo component from the docusaurus theme.

import React from "react";

export default function NavbarLogo() {
  return (
    <a className="navbar__brand" href="/">
      <div className="navbar__logo">
        <picture className='navbar-logo themedComponent_FXRw themedComponent--light_RIle'>
         <source srcSet="/img/logo-small.webp" type="image/webp" width={60} height={60} />
         <img src="/img/logo-small.png" alt="Celest Logo" width={60} height={60} />
       </picture>
      </div>
      <b className="navbar__title text--truncate">Celest</b>
    </a>
  );
}

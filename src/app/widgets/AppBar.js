import React from 'react';
import Image from 'next/image';
import '../../styles/appBar.scss';

const AppBar = () => (
  <header className="d-flex align-items-center app-bar bg-dark">
    <div className="logo-part">
      <Image
        src="/images/logo.png"
        width={150}
        height={150}
        alt="Picture of the author"
      />
    </div>
    <div className="text-part d-flex flex-column flex-grow-1">
      <div className="top-bar bg-success text-white">
        {/* <p className="m-0">kwayu</p> */}
      </div>
      <div className="bottom-bar bg-dark">
      {/* <p className="m-0">kwayu</p> */}
      </div>
    </div>
  </header>
);

export default AppBar;

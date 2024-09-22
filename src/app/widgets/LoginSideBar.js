import React from 'react';
import Image from 'next/image';
import styles from '../../styles/appBar.module.scss';

const LoginSideBar = ({ toggleLoginSidebar }) => (
    <div>
        <div className={styles.LoginSearch}>
            <div className={styles.topperSearch}>
                <h5 className={styles.title}>Register</h5>
                <button type="button" className="btn-close btn-close-white" onClick={toggleLoginSidebar}></button>
            </div>
            <div>
                <Image
                    src="/images/logo.png"
                    width={150}
                    height={150}
                    alt="Picture of the author"
                />
                <p className={styles.paragraph}>Register free today for access to exclusive
                    Singida Black Stars content and benefits.</p>
                <button type="button" class="btn btn-light btn-lg btn-block w-100"><i className="bi bi-person-circle"></i> Register</button>
            </div>
        </div>
        <div className="offcanvas-body">
            <p className={styles.paragraph2}>Already Registered?</p>
            <p>If you had an black stars' account during the 2023/24 season, please
                login below with your credentials and then follow the instructions to reset your password</p>
        </div>
        <div>
            <form>
                <div className="mb-3 p-3">
                <p className={styles.paragraph2}>Login</p>
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Email"
                    />
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Password"
                    />
                    <p className={styles.paragraph3}>Forgotten your password?</p>
                    <p className={styles.paragraph3}>Got a password reset code?</p>
                    <button type="button" class="btn btn-success btn-lg btn-block w-100"><i className="bi bi-person-circle"></i> Login</button>
                </div>
            </form>
        </div>
    </div>
);

export default LoginSideBar;

"use client"
import React from "react";
import styles from '../../styles/contacts.module.scss';

export default function Ownership() {
    return (
        <div>
            <div className={styles.subNeck}>
                <p className={styles.title}><strong>Ownership Statement</strong></p>
            </div>
            <p className={styles.titleHistory}>
                <strong>
                    CRAWLEY TOWN FOOTBALL AND SOCIAL CLUB LTD.
                </strong>
            </p>
            <p className={styles.fullHistory}>
                The Club is a member of the English Football League (EFL) and is subject to the EFL’s rules and regulations. As required by those regulations, the Club can confirm the following person(s) have a ‘significant interest’ (as that term is defined within the EFL regulations) in the Club:

                Crawley Town Football Club Limited is owned by majority shareholders WAGMI United LLC, headed by Preston Johnson and Ben Levin.

                Crawley Town Directors: Preston Johnson & Ben Levin

                In using this website, you agree to the Terms of Use (including the Privacy Policy). If you do not accept any of them, you should exit this website now.

                Registered in England: Company No: 03858150
                VAT Registration Number: 725 1175 54
            </p>
        </div>
    );
}

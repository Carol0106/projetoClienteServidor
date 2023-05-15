import React, { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../../components/Header";
import DivImagemNM from "../../components/DivImagemNM";
import useWindowSize from "react-use/lib/useWindowSize";
import { useDispatch, useSelector } from "react-redux";
import styles from "../public/assets/css/style.css";


export default function NossoMundo() {
	const [etapas, setEtapas] = useState([]);
	const [total, setTotal] = useState(0);
	const [showConfetti, setShowConfetti] = useState(false);
	const { user } = useSelector((state) => state.user);
	const { width, height } = useWindowSize();

	return (
		<div>
			<Head>
				<title>Dashboard - Mundo Mapping</title>
			</Head>

			<Header menu perfil active="NOSSO MUNDO" />

			<div className={styles.background}>
				<div className={`container ${styles.container}`}>
					<h1 className={`${styles.nossoMundoTitle}`}>NOSSO MUNDO</h1>
					<DivImagemNM/>
				</div>
            </div>
			
		</div>
	);
}

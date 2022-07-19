import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/main-header';
import Footer from '../components/main-footer';
import AddRecipe from '../components/add-recipe';
import BuyIngredients from '../components/buy-Ingredients';
import AlertBox from '../components/AlertBox';
import { useRecoilState } from 'recoil';
import { alertData } from '../atom/alertData';
import { alert } from '../atom/alert';

/**
 * ## Layout
 * # Layout Component it will use to create
 * # Static layout for web app in this file
 * # We have Header and footer
 *
 * @retruns Layout
 */

export default function Layout() {
	const [isAlertOn, setIsAlertOn] = useRecoilState(alert);
	return (
		<div className="relative">
			{/* Alert Box */}
			{isAlertOn && <AlertBox />}

			{/* Header */}
			<Header />
			{/* rendering children using router's outlet */}
			<Outlet />
			{/* Footer */}
			<Footer />

			<AddRecipe />
			<BuyIngredients />
		</div>
	);
}

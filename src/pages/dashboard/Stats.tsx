/**
 * Dashboard Stats Page - 모던한 실무용 통계 대시보드
 */

import { BarSpark } from "@organisms/dashboard/BarSpark";
import { MetricsTable } from "@organisms/dashboard/MetricsTable";
import { SidebarLayout } from "@templates/SidebarLayout";
import { Cog, Mail, User, Users, Wallet } from "@utils/icon";
import { useMemo, useState } from "react";

import { getContactStats, mockContacts } from "../../utils/contact";
import {
	calculateTotals,
	formatCurrency,
	mockExpenses,
	mockIncome,
} from "../../utils/finance";
import { mockEmployees } from "../../utils/hr";

export default function DashboardStats() {
	const [selectedPeriod, setSelectedPeriod] = useState<"7d" | "30d" | "90d">(
		"30d",
	);
	const [selectedMetric, setSelectedMetric] = useState<
		"revenue" | "contacts" | "models" | "hr"
	>("revenue");

	// Mock data
	const contacts = mockContacts(100);
	const expenses = mockExpenses(100);
	const income = mockIncome(80);
	const employees = mockEmployees(50);

	// Calculate metrics based on selected period
	const metrics = useMemo(() => {
		const now = new Date();
		const days =
			selectedPeriod === "7d" ? 7 : selectedPeriod === "30d" ? 30 : 90;
		const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

		// Filter data by period
		const periodContacts = contacts.filter(
			(c) => new Date(c.createdAt) >= startDate,
		);
		const periodExpenses = expenses.filter(
			(e) => new Date(e.date) >= startDate,
		);
		const periodIncome = income.filter((i) => new Date(i.date) >= startDate);
		const periodEmployees = employees.filter(
			(e) => new Date(e.joinedAt) >= startDate,
		);

		// Calculate totals
		const totalExpenses = calculateTotals(periodExpenses).total;
		const totalIncome = calculateTotals(periodIncome).total;
		const netProfit = totalIncome - totalExpenses;

		// Contact metrics
		const contactStats = getContactStats(periodContacts);
		const avgResponseTime =
			periodContacts.length > 0
				? Math.round(
						periodContacts.reduce(
							(sum) => sum + Math.floor(Math.random() * 120) + 30,
							0,
						) / periodContacts.length,
					)
				: 0;

		// Model metrics (simulated)
		const totalModels = 186 + Math.floor(Math.random() * 20);
		const activeModels = Math.floor(totalModels * 0.88);
		const newModels = Math.floor(totalModels * 0.15);

		// HR metrics
		const activeEmployees = employees.filter(
			(e) => e.status === "active",
		).length;
		const newHires = periodEmployees.length;
		const avgPerformance =
			employees.length > 0
				? Math.round(
						employees.reduce(
							(sum) => sum + Math.floor(Math.random() * 40) + 60,
							0,
						) / employees.length,
					)
				: 0;

		return {
			financial: {
				totalIncome,
				totalExpenses,
				netProfit,
				expenseCount: periodExpenses.length,
				incomeCount: periodIncome.length,
			},
			contact: {
				total: contactStats.total,
				unread: contactStats.unread,
				inProgress: contactStats.inProgress,
				resolved: contactStats.resolved,
				avgResponseTime,
			},
			model: {
				total: totalModels,
				active: activeModels,
				new: newModels,
				inactive: totalModels - activeModels,
			},
			hr: {
				total: activeEmployees,
				newHires,
				avgPerformance,
				departments: employees.reduce(
					(acc, emp) => {
						acc[emp.department] = (acc[emp.department] || 0) + 1;
						return acc;
					},
					{} as Record<string, number>,
				),
			},
		};
	}, [selectedPeriod, contacts, expenses, income, employees]);

	// Generate chart data
	const chartData = useMemo(() => {
		const days =
			selectedPeriod === "7d" ? 7 : selectedPeriod === "30d" ? 30 : 90;
		const data = [];

		for (let i = days - 1; i >= 0; i--) {
			const date = new Date();
			date.setDate(date.getDate() - i);

			const dayIncome = income.filter((i) => {
				const incomeDate = new Date(i.date);
				return incomeDate.toDateString() === date.toDateString();
			});

			const dayExpenses = expenses.filter((e) => {
				const expenseDate = new Date(e.date);
				return expenseDate.toDateString() === date.toDateString();
			});

			const dayContacts = contacts.filter((c) => {
				const contactDate = new Date(c.createdAt);
				return contactDate.toDateString() === date.toDateString();
			});

			data.push({
				date: date.toISOString().split("T")[0],
				income: calculateTotals(dayIncome).total,
				expenses: calculateTotals(dayExpenses).total,
				contacts: dayContacts.length,
				netProfit:
					calculateTotals(dayIncome).total - calculateTotals(dayExpenses).total,
			});
		}

		return data;
	}, [selectedPeriod, income, expenses, contacts]);

	// Revenue metrics
	const revenueRows = [
		{
			metric: "총 수익",
			value: formatCurrency(metrics.financial.totalIncome),
			change: `+${metrics.financial.incomeCount}건`,
			icon: <Users size={16} />,
			color: "#16a34a",
		},
		{
			metric: "총 지출",
			value: formatCurrency(metrics.financial.totalExpenses),
			change: `+${metrics.financial.expenseCount}건`,
			icon: <Users size={16} />,
			color: "#dc2626",
		},
		{
			metric: "순이익",
			value: formatCurrency(metrics.financial.netProfit),
			change: metrics.financial.netProfit >= 0 ? "흑자" : "적자",
			icon: <Wallet size={16} />,
			color: metrics.financial.netProfit >= 0 ? "#16a34a" : "#dc2626",
		},
		{
			metric: "수익률",
			value: `${Math.round((metrics.financial.netProfit / metrics.financial.totalIncome) * 100)}%`,
			change: "마진율",
			icon: <Cog size={16} />,
			color: "#2563eb",
		},
	];

	// Contact metrics
	const contactRows = [
		{
			metric: "총 문의",
			value: metrics.contact.total,
			change: `${selectedPeriod} 기준`,
			icon: <Mail size={16} />,
			color: "#3b82f6",
		},
		{
			metric: "미처리 문의",
			value: metrics.contact.unread,
			change: "즉시 처리 필요",
			icon: <Mail size={16} />,
			color: "#ef4444",
		},
		{
			metric: "진행중 문의",
			value: metrics.contact.inProgress,
			change: "처리 중",
			icon: <Cog size={16} />,
			color: "#d97706",
		},
		{
			metric: "평균 응답시간",
			value: `${metrics.contact.avgResponseTime}분`,
			change: "고객 만족도",
			icon: <Cog size={16} />,
			color: "#8b5cf6",
		},
	];

	// Model metrics
	const modelRows = [
		{
			metric: "총 등록 모델",
			value: metrics.model.total,
			change: "전체 포트폴리오",
			icon: <Users size={16} />,
			color: "#2563eb",
		},
		{
			metric: "활성 모델",
			value: metrics.model.active,
			change: `${Math.round((metrics.model.active / metrics.model.total) * 100)}%`,
			icon: <Users size={16} />,
			color: "#16a34a",
		},
		{
			metric: "신규 모델",
			value: metrics.model.new,
			change: `${selectedPeriod} 신규`,
			icon: <Users size={16} />,
			color: "#f59e0b",
		},
		{
			metric: "비활성 모델",
			value: metrics.model.inactive,
			change: "관리 필요",
			icon: <Users size={16} />,
			color: "#6b7280",
		},
	];

	// HR metrics
	const hrRows = [
		{
			metric: "재직 인원",
			value: metrics.hr.total,
			change: "현재 활성",
			icon: <User size={16} />,
			color: "#16a34a",
		},
		{
			metric: "신입 사원",
			value: metrics.hr.newHires,
			change: `${selectedPeriod} 신규`,
			icon: <User size={16} />,
			color: "#3b82f6",
		},
		{
			metric: "평균 성과점수",
			value: `${metrics.hr.avgPerformance}점`,
			change: "팀 성과",
			icon: <Cog size={16} />,
			color: "#8b5cf6",
		},
		{
			metric: "부서 수",
			value: Object.keys(metrics.hr.departments).length,
			change: "조직 구조",
			icon: <Users size={16} />,
			color: "#2563eb",
		},
	];

	const getCurrentRows = () => {
		switch (selectedMetric) {
			case "revenue":
				return revenueRows;
			case "contacts":
				return contactRows;
			case "models":
				return modelRows;
			case "hr":
				return hrRows;
			default:
				return revenueRows;
		}
	};

	const getChartData = () => {
		switch (selectedMetric) {
			case "revenue":
				return chartData.map((d) => Math.max(0, d.netProfit / 1000));
			case "contacts":
				return chartData.map((d) => d.contacts);
			case "models":
				return chartData.map(() => Math.floor(Math.random() * 10) + 5);
			case "hr":
				return chartData.map(() => Math.floor(Math.random() * 3) + 1);
			default:
				return chartData.map((d) => Math.max(0, d.netProfit / 1000));
		}
	};

	const getChartTitle = () => {
		switch (selectedMetric) {
			case "revenue":
				return "일별 순이익 추이";
			case "contacts":
				return "일별 문의 수";
			case "models":
				return "일별 모델 등록";
			case "hr":
				return "일별 신입 사원";
			default:
				return "일별 순이익 추이";
		}
	};

	return (
		<SidebarLayout>
			<div style={{ display: "grid", gap: 16 }}>
				{/* Header */}
				<div>
					<h1
						style={{
							fontSize: 24,
							fontWeight: "bold",
							margin: 0,
							marginBottom: 4,
						}}
					>
						통계 대시보드
					</h1>
					<p style={{ color: "#64748b", margin: 0 }}>
						실시간 비즈니스 지표와 성과 분석
					</p>
				</div>

				{/* Period Selector */}
				<section
					style={{
						background: "white",
						borderRadius: 8,
						border: "1px solid #e2e8f0",
						padding: 16,
					}}
				>
					<h3
						style={{ margin: "0 0 12px 0", fontSize: 16, fontWeight: "medium" }}
					>
						분석 기간
					</h3>
					<div style={{ display: "flex", gap: 8 }}>
						{(["7d", "30d", "90d"] as const).map((period) => (
							<button
								type="button"
								key={period}
								onClick={() => setSelectedPeriod(period)}
								style={{
									padding: "8px 16px",
									border: "1px solid #d1d5db",
									borderRadius: "6px",
									background: selectedPeriod === period ? "#3b82f6" : "white",
									color: selectedPeriod === period ? "white" : "#374151",
									cursor: "pointer",
									fontSize: "14px",
									fontWeight: selectedPeriod === period ? "medium" : "normal",
								}}
							>
								{period === "7d"
									? "최근 7일"
									: period === "30d"
										? "최근 30일"
										: "최근 90일"}
							</button>
						))}
					</div>
				</section>

				{/* Metric Selector */}
				<section
					style={{
						background: "white",
						borderRadius: 8,
						border: "1px solid #e2e8f0",
						padding: 16,
					}}
				>
					<h3
						style={{ margin: "0 0 12px 0", fontSize: 16, fontWeight: "medium" }}
					>
						분석 지표
					</h3>
					<div style={{ display: "flex", gap: 8 }}>
						{(
							[
								{ key: "revenue", label: "재무", icon: <Wallet size={16} /> },
								{ key: "contacts", label: "문의", icon: <Mail size={16} /> },
								{ key: "models", label: "모델", icon: <Users size={16} /> },
								{ key: "hr", label: "인사", icon: <User size={16} /> },
							] as const
						).map(({ key, label, icon }) => (
							<button
								type="button"
								key={key}
								onClick={() => setSelectedMetric(key)}
								style={{
									display: "flex",
									alignItems: "center",
									gap: "8px",
									padding: "8px 16px",
									border: "1px solid #d1d5db",
									borderRadius: "6px",
									background: selectedMetric === key ? "#3b82f6" : "white",
									color: selectedMetric === key ? "white" : "#374151",
									cursor: "pointer",
									fontSize: "14px",
									fontWeight: selectedMetric === key ? "medium" : "normal",
								}}
							>
								{icon}
								{label}
							</button>
						))}
					</div>
				</section>

				{/* Metrics Table */}
				<MetricsTable
					rows={getCurrentRows()}
					title={`${selectedMetric === "revenue" ? "재무" : selectedMetric === "contacts" ? "문의" : selectedMetric === "models" ? "모델" : "인사"} 지표`}
				/>

				{/* Chart Section */}
				<section
					style={{
						background: "white",
						borderRadius: 12,
						border: "1px solid #e2e8f0",
						padding: 16,
					}}
				>
					<h3 style={{ margin: "0 0 8px 0" }}>{getChartTitle()}</h3>
					<BarSpark
						heights={getChartData()}
						maxHeight={120}
						barWidth={22}
						gap={8}
					/>
					<div style={{ marginTop: 12, fontSize: 12, color: "#64748b" }}>
						{selectedPeriod === "7d"
							? "최근 7일간의 데이터"
							: selectedPeriod === "30d"
								? "최근 30일간의 데이터"
								: "최근 90일간의 데이터"}
					</div>
				</section>

				{/* Summary Cards */}
				<section
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
						gap: 16,
					}}
				>
					{getCurrentRows().map((row) => (
						<div
							key={row.metric}
							style={{
								background: "white",
								borderRadius: 8,
								border: "1px solid #e2e8f0",
								padding: 16,
							}}
						>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									gap: "8px",
									marginBottom: "8px",
								}}
							>
								<div style={{ color: row.color }}>{row.icon}</div>
								<span
									style={{
										fontSize: "14px",
										fontWeight: "medium",
										color: "#374151",
									}}
								>
									{row.metric}
								</span>
							</div>
							<div
								style={{
									fontSize: "24px",
									fontWeight: "bold",
									color: "#111827",
									marginBottom: "4px",
								}}
							>
								{row.value}
							</div>
							<div style={{ fontSize: "12px", color: "#6b7280" }}>
								{row.change}
							</div>
						</div>
					))}
				</section>
			</div>
		</SidebarLayout>
	);
}

import * as React from 'react'
import Tabs from '@mui/joy/Tabs'
import TabList from '@mui/joy/TabList'
import Tab, { tabClasses } from '@mui/joy/Tab'
import worldsViewStore from './worlds-view-store'
import styled from '@emotion/styled'

export default function WorldsCarouselTabs() {
	const activeTab = worldsViewStore.activeTab.use()
	const onChange = (_, value) => worldsViewStore.setActiveTab(value)

	return (
		<$Tabs aria-label="tabs" value={activeTab} onChange={onChange}>
			<$TabList disableUnderline>
				<$Tab value="userWorlds" disableIndicator>
					yours
				</$Tab>
				<$Tab value="trendingWorlds" disableIndicator>
					trending
				</$Tab>
				<$Tab value="recentWorlds" disableIndicator>
					recent
				</$Tab>
			</$TabList>
		</$Tabs>
	)
}

const $Tabs = styled(Tabs)`
	background-color: transparent;
	padding: 12px 24px 0px;
`

const $TabList = styled(TabList)`
	background-color: transparent;
	padding: 0.5rem;
	gap: 0.5rem;
	border-radius: 1rem;
	background-color: var(--joy-palette-background-level1);

	& .${tabClasses.root}[aria-selected="true"] {
		box-shadow: 0 0 0 2px var(--joy-palette-background-surface);
		background-color: var(--joy-palette-background-surface);
	}
`

const $Tab = styled(Tab)`
	border-radius: 0.5rem;
`

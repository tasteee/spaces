import React, { useState } from 'react'
import { Button, Typography, Link, Box } from '@mui/joy'
import styled from '@emotion/styled'
import worldsViewStore from './worlds-view-store'
import WorldsCarouselTabs from './worlds-carousel-tabs'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { Flow } from '../../components/Flow'

export default function WorldsCarousel() {
	worldsViewStore.useHydrator()
	const worldsList = worldsViewStore.useActiveTabWorldsList()
	const focusedIndex = worldsViewStore.focusedIndex.use()

	return (
		<MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
			<$Container data-testid="$Container">
				<WorldsCarouselTabs />
				<$CarouselWrapper data-testid="$CarouselWrapper">
					<$CarouselContent data-testid="$CarouselContent">
						{worldsList.map((world) => (
							<WorldDetail
								key={world.id}
								activeIndex={focusedIndex}
								isFocused={worldsList.indexOf(world) === focusedIndex}
								{...world}
							/>
						))}
						<AnimatePresence initial={false}>
							{focusedIndex > 0 && <LeftArrowButton onClick={worldsViewStore.decrementFocusedIndex} />}
						</AnimatePresence>
						<AnimatePresence initial={false}>
							{focusedIndex + 1 < worldsList.length && (
								<RightArrowButton onClick={worldsViewStore.incrementFocusedIndex} />
							)}
						</AnimatePresence>
					</$CarouselContent>
				</$CarouselWrapper>
			</$Container>
		</MotionConfig>
	)
}

const $Container = styled('div')`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 24px;
	background-color: black;
	height: 100%;
`

const $CarouselWrapper = styled('div')`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 400px;
`

const $CarouselContent = styled('div')`
	position: relative;
	overflow: hidden;
	width: 100%;
	max-width: 100vw;
	height: 100%;
	display: flex;
`

const LeftArrowButton = (props) => {
	return (
		<$ArrowButton className="LeftArrowButton left-4" {...LEFT_ARROW_BUTTON_PROPS} onClick={props.onClick}>
			<ChevronLeftIcon className="h-8 w-8 text-white" />
		</$ArrowButton>
	)
}

const RightArrowButton = (props) => {
	return (
		<$ArrowButton className="RightArrowButton right-4" {...RIGHT_ARROW_BUTTON_PROPS} onClick={props.onClick}>
			<ChevronRightIcon className="h-8 w-8 text-white" />
		</$ArrowButton>
	)
}

const LEFT_ARROW_BUTTON_PROPS = {
	initial: { opacity: 0, x: -20 },
	animate: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: -20, pointerEvents: 'none' },
	whileHover: { scale: 1.1 },
	whileTap: { scale: 0.9 }
}

const RIGHT_ARROW_BUTTON_PROPS = {
	initial: { opacity: 0, x: 20 },
	animate: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: 20, pointerEvents: 'none' },
	whileHover: { scale: 1.1 },
	whileTap: { scale: 0.9 }
}

const $ArrowButton = styled(motion.button)`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	display: flex;
	align-items: center;
	justify-content: center;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 1000;
	border: none;
	cursor: pointer;

	&:focus {
		outline: none;
	}

	&.left-4 {
		left: 16px;
	}

	&.right-4 {
		right: 16px;
	}
`

function WorldDetail(props) {
	const xPercent = props.activeIndex * 100
	const animate = { x: `-${xPercent}%` }

	return (
		<$MotionDiv
			data-testid="WorldDetail"
			animate={animate}
			className="flex"
			worldname={props.name}
			thumbnail_url={props.thumbnail_url}
		>
			<Flow isRow gap="12px">
				<$Thumbnail src={props.thumbnail_url} alt={props.name} color={props.color} />
				<Flow isColumn gap="4px">
					<Typography level="h2">{props.name}</Typography>
					<Flow isRow gap="8px">
						by
						<Link color="primary" disabled={false} level="body-md" underline="always" variant="plain">
							{props.owner_username}
						</Link>
					</Flow>
				</Flow>
			</Flow>
			<$WorldDetailInfo>
				<Typography level="body2">{props.description}</Typography>
				{props.isFocused && <Button variant="solid">{"Let's Go!"}</Button>}
			</$WorldDetailInfo>
		</$MotionDiv>
	)
}

const $MotionDiv = styled(motion.div)`
	display: flex;
	flex-direction: column;
	flex: 0 0 100%;
	padding: 10% 10% 0 10%;
	gap: 24px;
	width: 50vw;
	min-width: 500px;
	background-image: linear-gradient(to right, #000000f2, #00000021, #000000ee),
		linear-gradient(to bottom, #000000f2, #00000047, #000000ee),
		${(props) => (props.thumbnail_url ? `url(${props.thumbnail_url})` : 'none')};
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
`

const $WorldDetail = styled('div')``

const $Thumbnail = styled('img')`
	width: 64px;
	height: 64px;
	border-radius: 8px;
	object-fit: cover;
	border: 2px solid ${(props) => props.color};
	box-shadow: -20px 0 100px -5px ${(props) => props.color};
`

const $WorldDetailInfo = styled('div')`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 12px;
`

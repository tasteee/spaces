import { Link, Avatar } from '@mui/joy'
import styled from '@emotion/styled'
import WorldsCarousel from './worlds-carousel'
import worldsViewStore from './worlds-view-store'
import { useEffect } from 'react'

export default function WorldsView() {
	return (
		<$Container>
			<TopBar />
			<WorldsCarousel />
		</$Container>
	)
}

export function TopBar() {
	return (
		<$TopBar id="TopBar">
			{/* <$Logo src="/logo.png" /> */}
			<h2>liife</h2>
			<Navigation />
			<UserMenu />
		</$TopBar>
	)
}

const Navigation = () => {
	return (
		<$Navigation>
			<Link href="/">worlds</Link>
			<Link href="/friends">friends</Link>
			<Link href="/news">news</Link>
		</$Navigation>
	)
}

const UserMenu = () => {
	return (
		<$UserMenu>
			<Avatar color="neutral" size="md" variant="plain">
				HR
			</Avatar>
		</$UserMenu>
	)
}

const $Navigation = styled('div')`
	display: flex;
	gap: 24px;
	align-items: center;
	height: 100%;
`

const $UserMenu = styled('div')`
	display: flex;
	align-items: center;
	height: 100%;
`

const $Logo = styled('img')`
	width: 90px;
	height: 64px;
	border: 1px solid black;
	background: #0000005e;
`

const $TopBar = styled('div')`
	width: 100%;
	height: 80px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 12px 24px;
`

const $Container = styled('div')`
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	display: flex;
	flex-direction: column;
`

/*
<TopBar />
[(logo)     worlds  friends  news     (avatar)]

<WorldsTabs />
[  yours  trending  recents              new  ]

<WorldsCarousel />
A horizontally scrolling carousel of <WorldDetail />
components that have a thumbnail on the left and the
world name, description, and "Let's Go!" button on the right.
In the center is the focused world. WorldDetail components
to the left nad right are slightly dimmed.
The carousel will scroll infinitely, looping on the worlds
available to show. I would like for the focused world to be
flat, but the others to be slightly turned as to give a sense
that the carousel is a curcle goung around a circle.

Use components from @mui/joy and style them with emotion.
import { Flex } from '@mui/joy'
import styled from '@emotion/styled'


const useWorlds = (tabName) => {
  const [list, setList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)

    wretch('/api/getWorldsList/' + tabName)
      .json((data) => setList(data))
      .then(() => setIsLoading(false))
  }, [tabName])

  return {list, isLoading}
}

export default function WorldsCarousel() {
  const [focusedIndex, setFocusedIndex] = useState(0)
  const [tabName, setTabName] = useState('yours')
  const worlds = useWorlds(tabName)


  return <$Container>
    // since focusedIndex is 0, then the -1 index item
    // in worlds.list will be rendered here...

    // since the focusedIndex is 0, then the 0 index item
    // in worlds.list will be rendered here...

    // since the focusedIndex is 0, then the 1 index item
    // in worlds.list will be rendered here...
  </$Container>
}

const $Container = styled(Flex)`
  css to make it work on a circular track
`

// All styled component names start with $
// followed by capitalized name.
const $Whatever = styled(<something>)``
*/

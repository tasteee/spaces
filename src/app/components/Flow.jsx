import styled from '@emotion/styled'

export const Flow = (props) => {
	const testId = `Flow ${props.testid || ''}`
	return <$Flow {...props} data-testid={testId} />
}

const isNullish = (value) => {
	return value === null || value === undefined
}

const propertyHandler = (property, handler) => {
	const prefix = `${property}: `
	return (props) => {
		const value = handler(props)
		const shouldSkip = isNullish(value)
		const isArray = Array.isArray(value)
		if (shouldSkip) return null
		if (isArray) return `${prefix}${value.join(', ')};`
		return `${prefix}${value};`
	}
}

const sizingHandler = (prop) => (props) => {
	if (!props[prop]) return null
	const value = props[prop]
	return typeof value === 'number' ? `${value}px` : value
}

const simpleHandler = (prop) => (props) => props[prop]

const marginPaddingHandler = (prop) => (props) => {
	const value = props[prop]
	if (isNullish(value)) return null
	return typeof value === 'number' ? `${value}px` : value
}

const handleWidth = propertyHandler('width', sizingHandler('width'))
const handleMinWidth = propertyHandler('min-width', sizingHandler('minWidth'))
const handleMaxWidth = propertyHandler('max-width', sizingHandler('maxWidth'))
const handleHeight = propertyHandler('height', sizingHandler('height'))
const handleMinHeight = propertyHandler('min-height', sizingHandler('minHeight'))
const handleMaxHeight = propertyHandler('max-height', sizingHandler('maxHeight'))

const handleFlexDirection = propertyHandler('flex-direction', (props) => {
	return props.isColumn ? 'column' : 'row'
})

const handlePosition = propertyHandler('position', simpleHandler('position'))
const handleTop = propertyHandler('top', sizingHandler('top'))
const handleLeft = propertyHandler('left', sizingHandler('left'))
const handleRight = propertyHandler('right', sizingHandler('right'))
const handleBottom = propertyHandler('bottom', sizingHandler('bottom'))

const handleMargin = propertyHandler('margin', marginPaddingHandler('margin'))
const handlePadding = propertyHandler('padding', marginPaddingHandler('padding'))

const handleMarginTop = propertyHandler('margin-top', marginPaddingHandler('marginTop'))
const handleMarginRight = propertyHandler('margin-right', marginPaddingHandler('marginRight'))
const handleMarginBottom = propertyHandler('margin-bottom', marginPaddingHandler('marginBottom'))
const handleMarginLeft = propertyHandler('margin-left', marginPaddingHandler('marginLeft'))

const handlePaddingTop = propertyHandler('padding-top', marginPaddingHandler('paddingTop'))
const handlePaddingRight = propertyHandler('padding-right', marginPaddingHandler('paddingRight'))
const handlePaddingBottom = propertyHandler('padding-bottom', marginPaddingHandler('paddingBottom'))
const handlePaddingLeft = propertyHandler('padding-left', marginPaddingHandler('paddingLeft'))

const handleZIndex = propertyHandler('z-index', simpleHandler('zIndex'))
const handleGap = propertyHandler('gap', sizingHandler('gap'))
const handleJustifyContent = propertyHandler('justify-content', simpleHandler('justify'))
const handleAlignItems = propertyHandler('align-items', simpleHandler('align'))

const $Flow = styled('div')`
	display: flex;
	box-sizing: border-box;
	${(props) => handleWidth(props)}
	${(props) => handleMinWidth(props)}
  ${(props) => handleMaxWidth(props)}
  ${(props) => handleHeight(props)}
  ${(props) => handleMinHeight(props)}
  ${(props) => handleMaxHeight(props)}
  ${(props) => handleFlexDirection(props)}
  ${(props) => handlePosition(props)}
  ${(props) => handleTop(props)}
  ${(props) => handleLeft(props)}
  ${(props) => handleRight(props)}
  ${(props) => handleBottom(props)}
  ${(props) => handleMargin(props)}
  ${(props) => handlePadding(props)}
  ${(props) => handleMarginTop(props)}
  ${(props) => handleMarginRight(props)}
  ${(props) => handleMarginBottom(props)}
  ${(props) => handleMarginLeft(props)}
  ${(props) => handlePaddingTop(props)}
  ${(props) => handlePaddingRight(props)}
  ${(props) => handlePaddingBottom(props)}
  ${(props) => handlePaddingLeft(props)}
  ${(props) => handleZIndex(props)}
  ${(props) => handleGap(props)}
  ${(props) => handleJustifyContent(props)}
  ${(props) => handleAlignItems(props)}
`

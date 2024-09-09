import { LatLng, LatLngExpression } from "leaflet"
import { useEffect, useRef, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet"

const LeafletMap = ({
	center,
	leafletZoom,
	markerLatLng = [0, 0],
	onMarkerSelection,
}: {
	center: LatLngExpression
	markerLatLng: LatLngExpression
	leafletZoom: number
	// eslint-disable-next-line no-unused-vars
	onMarkerSelection: (latlang: LatLng) => void
}) => {
	const mapRef = useRef<any>(null)
	const [markerPosition, setMarkerPosition] = useState<LatLngExpression>(markerLatLng)
	const handleClick = (latlng: LatLng) => {
		setMarkerPosition(latlng)
		onMarkerSelection(latlng)
	}

	useEffect(() => {
		setMarkerPosition(markerLatLng)
	}, [markerLatLng])

	useEffect(() => {
		if (mapRef.current) {
			mapRef.current.flyTo(center, leafletZoom, {
				duration: 2, // Duration in seconds
			})
		}
	}, [center])

	const MapEvents = ({ onClick }: { onClick: any }) => {
		useMapEvents({
			click(e) {
				onClick(e.latlng)
			},
		})

		return null
	}

	return (
		<div>
			<MapContainer
				center={center}
				zoom={leafletZoom} // Replace with the actual zoom level you want
				scrollWheelZoom={false}
				className='w-full h-full'
				ref={mapRef}
			>
				<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
				<MapEvents onClick={handleClick} />
				<Marker position={markerPosition}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</MapContainer>
		</div>
	)
}

export default LeafletMap

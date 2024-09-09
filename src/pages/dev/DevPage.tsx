import React from "react"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"

function DevPage() {
	return (
		<div className='h-screen'>
			<MapContainer center={[51.505, -0.09]} zoom={13} className='h-full'>
				<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
				<Marker position={[51.505, -0.09]}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</MapContainer>
		</div>
	)
}

export default DevPage

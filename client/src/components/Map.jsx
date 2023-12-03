
import { useEffect, useState } from 'react';
import {Marker,  Popup, useMap} from 'react-leaflet';
import L from 'leaflet'
import "leaflet/dist/leaflet.css"
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import * as ELG from 'esri-leaflet-geocoder'

export default function Map({address}) {
  const map = useMap()
  const [position, setPosition] = useState([60, 19])
  let DefaultIcon = L.icon ({
    iconUrl: icon,
    shadowUrl: iconShadow
  })

  useEffect(() => {
    ELG.geocode().text(address).run((err, results, response) => {
      if(results?.results?.length > 0){
        const {lat, lng} = results?.results[0].latlng
        setPosition([lat, lng])
        map.flyTo([lat, lng], 6)
      }
    })
  }, [address])

  L.Marker.prototype.options.id = DefaultIcon
  return (
    <Marker position={position} icon={DefaultIcon}>
      <Popup/>
    </Marker>
  )
}
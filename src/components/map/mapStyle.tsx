export default [
  {featureType: 'administrative', elementType: 'labels.text', stylers: [{color: '#fe5c6c'}]},
  {featureType: 'administrative', elementType: 'labels.text.stroke', stylers: [{color: '#ffffff'}]},
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text',
    stylers: [{color: '#d6949b'}],
  },
  {
    featureType: 'administrative.neighborhood',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d6949b'}],
  },
  {featureType: 'landscape.man_made', elementType: 'geometry.fill', stylers: [{color: '#fff8f0'}]},
  {featureType: 'landscape.natural', elementType: 'geometry.fill', stylers: [{color: '#fff8f0'}]},
  {featureType: 'road', elementType: 'geometry.stroke', stylers: [{visibility: 'off'}]},
  {featureType: 'road', elementType: 'labels.text', stylers: [{color: '#70b0e1'}]},
  {featureType: 'road', elementType: 'labels.text.stroke', stylers: [{color: '#ffffff'}]},
  {featureType: 'road.highway', elementType: 'labels.icon', stylers: [{visibility: 'off'}]},
  {featureType: 'transit', stylers: [{visibility: 'off'}]},
  {featureType: 'water', elementType: 'geometry.fill', stylers: [{color: '#99ddf0'}]},
]

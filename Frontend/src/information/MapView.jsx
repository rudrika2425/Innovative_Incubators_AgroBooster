// const MapView = ({ userLocation, labLocation, onClose }) => {
//   const [distance, setDistance] = useState(null);
//   const [duration, setDuration] = useState(null);

//   useEffect(() => {
//     let map, directionsService, directionsRenderer;
//     console.log("MapView mounted with:", { userLocation, labLocation });

//     const loadMap = async () => {
//       try {
//         // Load Google Maps script if not already loaded
//         await new Promise((resolve, reject) => {
//           if (window.google && window.google.maps) {
//             resolve();
//             return;
//           }

//           const script = document.createElement("script");
//           script.src = `https://maps.googleapis.com/maps/api/js?key=${YOUR_GOOGLE_MAPS_API_KEY}`;
//           script.async = true;
//           script.onload = resolve;
//           script.onerror = reject;
//           document.head.appendChild(script);
//         });

//         const mapElement = document.getElementById("map");
//         if (!mapElement) {
//           console.error("Map element not found");
//           return;
//         }

//         // Initialize the map
//         map = new google.maps.Map(mapElement, {
//           zoom: 12,
//           center: userLocation || labLocation,
//           mapTypeControl: true,
//           fullscreenControl: true,
//           streetViewControl: true,
//           zoomControl: true
//         });

//         // Initialize Directions API
//         directionsService = new google.maps.DirectionsService();
//         directionsRenderer = new google.maps.DirectionsRenderer({
//           map: map,
//           suppressMarkers: false,
//           preserveViewport: false
//         });

//         if (!userLocation) {
//           // Show only lab location if user location is not available
//           console.log("Showing only lab location");
//           new google.maps.Marker({
//             position: labLocation,
//             map: map,
//             title: "Lab Location",
//             animation: google.maps.Animation.DROP
//           });
//         } else {
//           // Request route from userLocation to labLocation
//           console.log("Calculating route...");
//           const request = {
//             origin: userLocation,
//             destination: labLocation,
//             travelMode: google.maps.TravelMode.DRIVING,
//             optimizeWaypoints: true
//           };

//           directionsService.route(request, (result, status) => {
//             if (status === google.maps.DirectionsStatus.OK) {
//               console.log("Route calculated successfully:", result);
//               directionsRenderer.setDirections(result);

//               // Extract distance and duration
//               const routeLeg = result.routes[0].legs[0];
//               setDistance(routeLeg.distance.text);
//               setDuration(routeLeg.duration.text);
//             } else {
//               console.error("Directions request failed:", status);
//               alert("Unable to get directions. Showing locations only.");

//               // Show markers if route fails
//               new google.maps.Marker({
//                 position: userLocation,
//                 map: map,
//                 title: "Your Location",
//                 animation: google.maps.Animation.DROP
//               });
//               new google.maps.Marker({
//                 position: labLocation,
//                 map: map,
//                 title: "Lab Location",
//                 animation: google.maps.Animation.DROP
//               });

//               // Fit both markers in view
//               const bounds = new google.maps.LatLngBounds();
//               bounds.extend(userLocation);
//               bounds.extend(labLocation);
//               map.fitBounds(bounds);
//             }
//           });
//         }
//       } catch (error) {
//         console.error("Error loading map:", error);
//         alert("Error loading map. Please try again.");
//       }
//     };

//     loadMap();

//     return () => {
//       if (directionsRenderer) {
//         directionsRenderer.setMap(null);
//       }
//     };
//   }, [userLocation, labLocation]);

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg w-full max-w-4xl">
//         <div className="p-4 border-b flex justify-between items-center">
//           <h3 className="text-xl font-bold">
//             {userLocation ? "Directions to " : "Location of "} Lab
//           </h3>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//             <FontAwesomeIcon icon={faXmark} size="lg" />
//           </button>
//         </div>

//         {/* Show Distance and Duration */}
//         {distance && duration && (
//           <div className="p-4 text-lg font-medium text-gray-700">
//             Distance: {distance} | Estimated Time: {duration}
//           </div>
//         )}

//         <div id="map" className="w-full h-[500px] rounded-b-lg"></div>
//       </div>
//     </div>
//   );
// };
// // 
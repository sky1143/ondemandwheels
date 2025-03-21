const axios = require('axios');

module.exports.getAddressCordinate = async (address) => {
   
    if (!address || typeof address !== "string" || /^https?:\/\//.test(address)) {
        throw new Error("Invalid address format. Absolute URLs are not allowed.");
    }

    
    const baseURL = process.env.BASE_URL_ADDRESS_COORDINATE;
    const url = new URL(baseURL);
    url.searchParams.append("q", address);
    url.searchParams.append("format", "json");
    url.searchParams.append("limit", "1");

    try {
        console.log(`Requesting Nominatim API for address: ${address}`);

        const response = await axios.get(url.toString());
        console.log("Nominatim API Response:", response.data);

        if (response.data.length > 0) {
            const location = response.data[0];
            const result = {
                lat: location.lat,
                lng: location.lon
            };
            console.log("Fetched cordinates", result);
            return result;
        } else {
            throw new Error("Unable to fetch coordinates");
        }
    } catch (error) {
        console.error("Error fetching coordinates:", error.message);
        throw new Error("Coordinates not found");
    }
};


const getCoordinates = async (place) => {
    const geoUrl = `${process.env.GEO_URL}?format=json&q=${encodeURIComponent(place)}&limit=1`;

    try {
        const response = await axios.get(geoUrl);
        if (response.data.length > 0) {
            const { lat, lon } = response.data[0];
            return `${lon},${lat}`; // Format: "longitude,latitude"
        } else {
            throw new Error(`Coordinates not found for ${place}`);
        }
    } catch (error) {
        console.error(`Error fetching coordinates for ${place}:`, error.message);
        throw new Error(`Failed to fetch coordinates for ${place}`);
    }
};

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apikey = process.env.OPENROUTE_API_KEY;
    

    try {
       
        const originCoords = await getCoordinates(origin);
        const destinationCoords = await getCoordinates(destination);

        console.log(`Origin coordinates: ${originCoords}`);
        console.log(`Destination coordinates: ${destinationCoords}`);

        
        const baseURL = process.env.BASE_URL_DISTANCETIME;
        const url = `${baseURL}?api_key=${apikey}&start=${originCoords}&end=${destinationCoords}`;

        console.log(`Requesting OpenRouteService for distance and time between ${origin} and ${destination}`);
        const response = await axios.get(url);
        console.log("OpenRouteService Response:", response.data);

        if (response.data.features && response.data.features.length > 0) {
            const route = response.data.features[0].properties.segments[0];
            const distanceInKm = route.distance / 1000; 
            const durationInMinutes = Math.round(route.duration / 60); 

            // Format distance with commas (e.g., 1,125 km)
            const formattedDistance = `${new Intl.NumberFormat().format(distanceInKm.toFixed(1))} km`;

            //  Convert minutes to days, hours, and minutes
            const days = Math.floor(durationInMinutes / (24 * 60));
            const hours = Math.floor((durationInMinutes % (24 * 60)) / 60);
            const minutes = durationInMinutes % 60;

            let formattedDuration = "";
            if (days > 0) formattedDuration += `${days} day${days > 1 ? 's' : ''} `;
            if (hours > 0) formattedDuration += `${hours}h `;
            if (minutes > 0) formattedDuration += `${minutes}min`;

            return {
                distance: parseInt(formattedDistance),
                duration: parseInt(formattedDuration.trim())
            };
        } else {
            throw new Error("No route found");
        }
    } catch (error) {
        console.error("Error fetching distance and time:", error.message);
        throw new Error("Failed to calculate distance and time");
    }
};



module.exports.getAutoCompleteSuggestion = async (input) => {
   
    if (!input || typeof input !== 'string') {
        throw new Error('Input is required and must be a string');
    }

    
    const baseURL = process.env.BASE_URL_AUTOCOMPLETE_SUGESSTION;
    const url = new URL(baseURL);
    url.searchParams.append("q", input);
    url.searchParams.append("format", "json");
    url.searchParams.append("limit", "5"); 

    try {
        console.log(`Requesting Nominatim API for suggestion with input: ${input}`);

        // Send GET request to Nominatim API
        const response = await axios.get(url.toString());
        console.log("Nominatim API Response:", response.data);

        if (response.data.length > 0) {
           
            const suggestions = response.data.map((place) => place.display_name);
            console.log("Fetched suggestions:", suggestions);
            return suggestions;
        } else {
            throw new Error("No suggestions found");
        }
    } catch (error) {
        console.error("Error fetching suggestions:", error.message);
        throw new Error("Failed to fetch suggestions");
    }
};



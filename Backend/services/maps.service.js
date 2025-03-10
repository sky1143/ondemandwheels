const axios = require('axios');

module.exports.getAddressCordinate = async (address) => {
    const apikey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apikey}`;

    try {
        console.log(`Requesting Google Maps API for address: ${address}`); // Debugging log
        console.log(`API URL: ${url}`);

        const response = await axios.get(url);

        console.log('Google Maps API Response:', response.data); // Log full API response

        if (response.data.status === 'OK' && response.data.results.length > 0) {
            const location = response.data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng
            };
        } else {
            console.error('Google Maps API Error:', response.data.status, response.data.error_message);
            throw new Error('Unable to fetch Coordinates');
        }

    } catch (error) {
        console.error('Error fetching coordinates:', error.message);
        throw new Error('Coordinates not found');
    }
};

const axios = require('axios');

module.exports.getAddressCordinate = async (address) => {
    const apikey = process.env.GOOGLE_MAPS_API;
    const baseURL = "https://maps.googleapis.com/maps/api/geocode/json";

    // 🛑 Prevent SSRF: Reject absolute URLs in address
    if (!address || typeof address !== "string" || /^https?:\/\//.test(address)) {
        throw new Error("Invalid address format. Absolute URLs are not allowed.");
    }

    // Construct URL safely
    const url = new URL(baseURL);
    url.searchParams.append("address", address);
    url.searchParams.append("key", apikey);

    try {
        console.log(`Requesting Google Maps API for address: ${address}`); // Debugging log
        console.log(`Safe API URL: ${baseURL}`); // Do NOT log full URL with API key

        const response = await axios.get(url.toString());

        console.log("Google Maps API Response Status:", response.data.status); // Log response status

        if (response.data.status === "OK" && response.data.results.length > 0) {
            const location = response.data.results[0].geometry.location;
            return { lat: location.lat, lng: location.lng };
        } else {
            console.error("Google Maps API Error:", response.data.status, response.data.error_message);
            throw new Error("Unable to fetch Coordinates");
        }
    } catch (error) {
        console.error("Error fetching coordinates:", error.message);
        throw new Error("Coordinates not found");
    }
};

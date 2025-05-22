import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;

// Ensure the API key is valid
if (!apiKey) {
    throw new Error("API key is missing. Please set VITE_GOOGLE_GEMINI_AI_API_KEY in your .env file.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

// Define the travel plan JSON response
const travelPlan = {
    location: "Las Vegas",
    budget: "Cheap",
    hotels: [
        {
            name: "Golden Nugget Las Vegas Hotel & Casino",
            address: "129 Fremont St, Las Vegas, NV 89101",
            price: "$50-$100 per night",
            image_url: "https://www.goldennugget.com/las-vegas/",
            geo_coordinates: { latitude: 36.1716, longitude: -115.1442 },
            rating: 4.3,
            description: "A classic downtown Vegas hotel with a casino, pool, and affordable rooms."
        },
        {
            name: "Plaza Hotel & Casino",
            address: "1 Main St, Las Vegas, NV 89101",
            price: "$60-$120 per night",
            image_url: "https://www.plazahotelcasino.com/",
            geo_coordinates: { latitude: 36.1718, longitude: -115.1467 },
            rating: 4.1,
            description: "Budget-friendly hotel with a rooftop pool and easy access to Fremont Street."
        },
        {
            name: "Downtowner Boutique Hotel",
            address: "129 N 8th St, Las Vegas, NV 89101",
            price: "$40-$80 per night",
            image_url: "https://downtownerlv.com/",
            geo_coordinates: { latitude: 36.1675, longitude: -115.1348 },
            rating: 3.9,
            description: "A stylish boutique hotel with affordable rates and a relaxed atmosphere."
        }
    ],
    itinerary: [
        {
            day: 1,
            places: [
                {
                    name: "Las Vegas Strip",
                    details: "Walk along the Strip and explore iconic hotels like Bellagio, Luxor, and New York-New York.",
                    url: "https://bevandshams.com/amazing-3-days-in-las-vegas-itinerary/",
                    geo_coordinates: { latitude: 36.1147, longitude: -115.1728 },
                    ticket_price: "Free",
                    rating: 4.8,
                    travel_time: "Walking distance",
                    best_time_to_visit: "Morning or evening"
                },
                {
                    name: "Bellagio Fountain Show",
                    details: "Watch the mesmerizing water show at Bellagio.",
                    url: "https://www.bellagio.com/en/entertainment/fountains-of-bellagio.html",
                    geo_coordinates: { latitude: 36.1126, longitude: -115.1763 },
                    ticket_price: "Free",
                    rating: 4.9,
                    travel_time: "5 min walk",
                    best_time_to_visit: "Evening"
                }
            ]
        },
        {
            day: 2,
            places: [
                {
                    name: "Red Rock Canyon",
                    details: "Enjoy scenic views and hiking trails.",
                    url: "https://www.redrockcanyonlv.org/",
                    geo_coordinates: { latitude: 36.1352, longitude: -115.4270 },
                    ticket_price: "$15 per vehicle",
                    rating: 4.7,
                    travel_time: "30 min drive",
                    best_time_to_visit: "Morning"
                },
                {
                    name: "Fremont Street Experience",
                    details: "Explore the historic downtown area with free light shows.",
                    url: "https://vegasexperience.com/",
                    geo_coordinates: { latitude: 36.1718, longitude: -115.1444 },
                    ticket_price: "Free",
                    rating: 4.6,
                    travel_time: "10 min drive",
                    best_time_to_visit: "Evening"
                }
            ]
        },
        {
            day: 3,
            places: [
                {
                    name: "Hoover Dam",
                    details: "Take a budget-friendly day trip to Hoover Dam.",
                    url: "https://www.usbr.gov/lc/hooverdam/",
                    geo_coordinates: { latitude: 36.0156, longitude: -114.7378 },
                    ticket_price: "$10 per person",
                    rating: 4.8,
                    travel_time: "45 min drive",
                    best_time_to_visit: "Morning"
                },
                {
                    name: "The Neon Museum",
                    details: "Explore vintage Vegas signs and history.",
                    url: "https://www.neonmuseum.org/",
                    geo_coordinates: { latitude: 36.1773, longitude: -115.1340 },
                    ticket_price: "$20 per person",
                    rating: 4.5,
                    travel_time: "10 min drive",
                    best_time_to_visit: "Afternoon"
                }
            ]
        }
    ]
};

// Start a chat session
export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: 'user',
            parts: [
                {
                    text: `Generate travel plan for location: Las Vegas, for 3 Days for a couple with a Cheap Budget. 
                    Provide a list of hotels with name, address, price, image URL, geo-coordinates, rating, and description. 
                    Suggest an itinerary with places, details, URLs, geo-coordinates, ticket pricing, rating, and travel time 
                    for each location over 3 days, including the best time to visit. Format the response in JSON.`
                },
            ],
        },
        {
            role: "model",
            parts: [
                {
                    text: JSON.stringify(travelPlan, null, 2) // Convert JSON object to a formatted string
                }
            ],
        },   
    ],
});
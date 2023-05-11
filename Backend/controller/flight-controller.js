const FLIGHT = require('../model/flightSchema')
const axios = require('axios');
module.exports.FINDFLIGHTS = async (req, res) => {
    try {
        // The data we want to send in the request
        // const data = {
        //     grant_type: "client_credentials",
        //     client_id: "KwEgZXCPayLAfYT0oD91AxVo8tJEwaKl",
        //     client_secret: "ESSORuKAu6gzh1f0"
        // };
        const data = {
            grant_type: "client_credentials",
            client_id: "KwEgZXCPayLAfYT0oD91AxVo8tJEwaKl",
            client_secret: "ESSORuKAu6gzh1f0"
        };

        // Send the POST request to the specified URL with the x-www-form-urlencoded data
        const result = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        // Send the response data back to the client
        auth = result.data.access_token;

        // Send the POST request to the specified URL with the x-www-form-urlencoded data
        const source = req.params.source;
        const destination = req.params.destination;
        const date = req.params.date;

        const response = await axios.get(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${source}&destinationLocationCode=${destination}&departureDate=${date}&adults=1&currencyCode=INR`, {
            headers: {
                'Authorization': 'Bearer ' + auth
            }
        });

        // Send the response data back to the client
        // auth = response.data.access_token;
        // console.log(auth);
        // console.log(Object.keys(response.data.data).length);
        const obj = new Object();
        let arr = [];
        console.log(response.data.data[0].itineraries[0].segments[1]);
        for (let i = 0; i < Object.keys(response.data.data).length; i++) {
            // mymap.set(response.data.data[i].itineraries[0].segments[0].operating, response.data.data[i].price.total)
            const myobj = {
                "airline": response.data.data[i].itineraries[0].segments[0].operating,
                "tariff": response.data.data[i].price.total,
                "duration": response.data.data[i].itineraries[0].segments[0].duration
            }
            arr.push(myobj)
        }
        return res.status(200).json({
            data: arr
            // console.log(response.data.data[i].itineraries[0].segments[0].operating);
            // console.log(response.data.data[i].price.total);

        })

        // res.send(response.data.data);
    } catch (error) {
        console.error(error);
        res.status(500).json('Error occurred,error is ', error);
    }
}
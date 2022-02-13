// Axios calls will need to be formatted like this:
// axios.get("your endpoint url",
//     {
//       "x-api-key": "your API Key
//     })
const BASE_URL = `https://api.thecatapi.com/v1/`;
const API_KEY = `f009e5da-db1f-40c9-96ec-ca4569121ab3`;

const button = document.querySelector("#try-me");
const dropdown = document.querySelector("select");
const picDisplay = document.querySelector("#catpic");

//1st api call to populate the dropdown
let response = async () => {
    await axios.get(`${BASE_URL}categories`,
        {
            "x-api-key": API_KEY  // x-api-key format mentioned on cat-api website under documentation/authentication
        }).then(res => {
            console.log(res);
            const catCategories = res.data; //storing all data objects into catCategories from inspect page
            //console.log(catCategories);
            for (let i = 0; i < catCategories.length; i++) {
                // console.log(catCategories[i].name); //prints names from object array
                //each name from the categories added to the dropdown
                dropdown.innerHTML += `<option id=${catCategories[i].id}>${catCategories[i].name}</option>`
                //console.log(dropdown[dropdown.selectedIndex].id); 
            }
        }).catch(err => {
            console.log(err);
        })
}

//2nd api call

button.addEventListener('click', async () => {
    const categoryId = dropdown[dropdown.selectedIndex].id;
    try {
        const response = await axios.get(`${BASE_URL}images/search?category_id=${categoryId}`,
            {
                "x-api-key": API_KEY
            })
        //    console.log(response);
        const catPhoto = response.data[0].url;
        //innerHTML inserts content on to the DIV
        picDisplay.innerHTML = `<img src=${catPhoto}>`
    } catch (e) {
        console.log(e);
    }
})

response();

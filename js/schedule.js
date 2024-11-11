const url = 'https://script.google.com/macros/s/AKfycbwT11QqWIuRCreUy_AbWsuFvxUAUu3uLncczycePK3OfQBiMi86WfRqtuJSCa5swLse/exec'; // Replace with your web app URL

// Function to fetch data and populate the table
function populateScheduleTable() {
    // Log the URL to verify it is correct
    console.log("Fetching data from URL:", url);

    fetch(url)
        .then(response => {
            // Log the response status to check if the fetch was successful
            console.log("Response Status:", response.status);
            return response.json();
        })
        .then(data => {
            // Log the fetched JSON data to verify the output
            console.log("Fetched Data:", data);


            // TABELA MLODSZYCH
            const mlodsza_body = document.getElementById("mlodsza-body");
            // Clear any existing rows in the table body
            mlodsza_body.innerHTML = "";

            data.data_grupa1.forEach(entry => {
                // Create a new row
                const row = document.createElement("tr");

                const dzienCell = document.createElement("td");
                dzienCell.textContent = entry.Dzień;
                row.appendChild(dzienCell);

                const godzinaCell = document.createElement("td");
                godzinaCell.textContent = entry.Godzina;
                row.appendChild(godzinaCell);

                const trenerCell = document.createElement("td");
                trenerCell.textContent = entry.Trener;
                row.appendChild(trenerCell);

                // Append the row to the table body
                mlodsza_body.appendChild(row);
            });


            // TABELA SREDNICH
            const srednia_body = document.getElementById("srednia-body");
            // Clear any existing rows in the table body
            srednia_body.innerHTML = "";

            data.data_grupa2.forEach(entry => {
                // Create a new row
                const row = document.createElement("tr");

                const dzienCell = document.createElement("td");
                dzienCell.textContent = entry.Dzień;
                row.appendChild(dzienCell);

                const godzinaCell = document.createElement("td");
                godzinaCell.textContent = entry.Godzina;
                row.appendChild(godzinaCell);

                const trenerCell = document.createElement("td");
                trenerCell.textContent = entry.Trener;
                row.appendChild(trenerCell);

                // Append the row to the table body
                srednia_body.appendChild(row);
            });

            // TABELA STARSZYCH
            const starsza_body = document.getElementById("starsza-body");
            // Clear any existing rows in the table body
            starsza_body.innerHTML = "";

            // Assuming "table1" contains the schedule data in the JSON response
            data.data_grupa3.forEach(entry => {
                // Create a new row
                const row = document.createElement("tr");

                const dzienCell = document.createElement("td");
                dzienCell.textContent = entry.Dzień;
                row.appendChild(dzienCell);

                const godzinaCell = document.createElement("td");
                godzinaCell.textContent = entry.Godzina;
                row.appendChild(godzinaCell);

                const trenerCell = document.createElement("td");
                trenerCell.textContent = entry.Trener;
                row.appendChild(trenerCell);

                // Append the row to the table body
                starsza_body.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching schedule data:', error));
}

// Run the function to populate the table when the page loads
document.addEventListener("DOMContentLoaded", populateScheduleTable);

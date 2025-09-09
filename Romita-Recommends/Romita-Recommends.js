fetch('Romita-Recommends/Romita-Recommends.json')
    .then(response => response.json())
    .then(data => {
        const mainTableBody = document.getElementById('main-table-body');

        function renderTableBody(data) {
            ;
            data.forEach(recommendation => {
                // Create table row
                const row = document.createElement('tr');

                // Create table cells
                const nameCell = document.createElement('td');
                const iconCell = document.createElement('td');
                const typeCell = document.createElement('td');
                const pricingCell = document.createElement('td');
                const platformCell = document.createElement('td');
                const descriptionCell = document.createElement('td');
                const tagCell = document.createElement('td');

                // Set cell content
                nameCell.innerHTML = `<a href="${recommendation.url}" target="_blank">${recommendation._NAME}</a>`;
                iconCell.innerHTML = `<img class="icon" src="${recommendation.iconPath}" alt="N/A">`;
                typeCell.innerHTML = `<div class="type">${recommendation.type ? recommendation.type : ''}</div>`;
                pricingCell.innerHTML = `<div class="pricing">${recommendation.pricingModel ? recommendation.pricingModel : ''}</div>`;
                platformCell.textContent = recommendation.platforms ? recommendation.platforms.join(', ') : '';
                descriptionCell.textContent = recommendation.description;
                tagCell.textContent = recommendation.tags ? recommendation.tags.join(', ') : '';

                // Append cells to row
                row.appendChild(nameCell);
                row.appendChild(iconCell);
                row.appendChild(typeCell);
                row.appendChild(pricingCell);
                row.appendChild(platformCell);
                row.appendChild(descriptionCell);
                row.appendChild(tagCell);

                // Append row to table
                mainTableBody.appendChild(row);
            });

            // Sort by the first column `_NAME` by default
            var columnIndex = 0

            // Get the table rows
            var rows = document.querySelectorAll("tbody tr");

            // Convert the NodeList of table rows into an array
            var rowsArray = Array.prototype.slice.call(rows);

            // Sort the array of table rows based on the data in the clicked column
            rowsArray.sort(function (rowA, rowB) {
                var cellA = rowA.cells[columnIndex].textContent;
                var cellB = rowB.cells[columnIndex].textContent;

                // Compare the data in the clicked column
                if (cellA < cellB) {
                    return -1;
                } else if (cellA > cellB) {
                    return 1;
                } else {
                    return 0;
                }
            });

            // Append the sorted table rows back to the table
            var tableBody = document.querySelector("tbody");
            tableBody.innerHTML = "";
            rowsArray.forEach(function (row) {
                tableBody.appendChild(row);
            });
        }

        renderTableBody(data);

        // Get the buttons
        var buttons = document.querySelectorAll("button");

        // Attach an event listener to each button
        buttons.forEach(function (button) {
            button.addEventListener("click", function () {
                // Get the column index of the clicked button
                var columnIndex = this.getAttribute("data-column-index");

                // Get the table rows
                var rows = document.querySelectorAll("tbody tr");

                // Convert the NodeList of table rows into an array
                var rowsArray = Array.prototype.slice.call(rows);

                // Sort the array of table rows based on the data in the clicked column
                rowsArray.sort(function (rowA, rowB) {
                    var cellA = rowA.cells[columnIndex].textContent;
                    var cellB = rowB.cells[columnIndex].textContent;

                    // Compare the data in the clicked column
                    if (cellA < cellB) {
                        return -1;
                    } else if (cellA > cellB) {
                        return 1;
                    } else {
                        return 0;
                    }
                });

                // Append the sorted table rows back to the table
                var tableBody = document.querySelector("tbody");
                tableBody.innerHTML = "";
                rowsArray.forEach(function (row) {
                    tableBody.appendChild(row);
                });
            });
        });

    });
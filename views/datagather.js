let xlabels_titles = [];
let dataSavings = [];

chartIt();

async function chartIt() {

    await loadData();

    const ctx = document.getElementById('chart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: xlabels_titles,
            datasets: [{
                label: 'best deals on steam, in %-savings',
                data: dataSavings,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }

    });
}



async function loadData() {



}
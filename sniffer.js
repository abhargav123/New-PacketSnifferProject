let packetId = 1;
let protocolCount = { TCP: 0, UDP: 0, ICMP: 0 };
let packetChart = null;

// Random number
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Random IP
function randomIP() {
    return `${rand(1, 255)}.${rand(0, 255)}.${rand(0, 255)}.${rand(1, 255)}`;
}

// Random protocol
function randomProtocol() {
    const protocols = ["TCP", "UDP", "ICMP"];
    return protocols[rand(0, 2)];
}

// Create Chart when button is clicked
function createChart() {
    let ctx = document.getElementById("packetChart").getContext("2d");

    packetChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["TCP", "UDP", "ICMP"],
            datasets: [{
                label: "Protocol Count",
                data: [0, 0, 0],
                backgroundColor: ["#2196F3", "#4CAF50", "#FFC107"]
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Update stats display
function updateStats() {
    document.getElementById("stats").innerHTML = `
        <b>Total Packets:</b> ${packetId - 1}<br>
        <b>TCP:</b> ${protocolCount.TCP} |
        <b>UDP:</b> ${protocolCount.UDP} |
        <b>ICMP:</b> ${protocolCount.ICMP}
    `;
}

// Update chart
function updateGraph() {
    packetChart.data.datasets[0].data = [
        protocolCount.TCP,
        protocolCount.UDP,
        protocolCount.ICMP
    ];
    packetChart.update();
}

// Start Sniffer
function startSniffer() {
    if (!packetChart) createChart(); // Prevents errors

    setInterval(() => {
        let protocol = randomProtocol();
        let port = protocol === "ICMP" ? "-" : rand(20, 9000);

        let row = `
            <tr>
                <td>${packetId}</td>
                <td>${randomIP()}</td>
                <td>${randomIP()}</td>
                <td>${protocol}</td>
                <td>${port}</td>
            </tr>
        `;

        document.getElementById("packetTable").innerHTML += row;

        protocolCount[protocol]++;
        updateStats();
        updateGraph();

        packetId++;

    }, 1000);
}

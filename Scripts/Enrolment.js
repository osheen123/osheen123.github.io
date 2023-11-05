function getRandomNumber() {
    const random = Math.random();
    const randomNumber = Math.floor(random * 7) + 1;
    return (randomNumber + 7) * 1000;
  }

function showNotification() {
    const notification = document.getElementById('notification');
    const users = [
        "John Smith",
        "Maria Rodriguez",
        "Hiroshi Tanaka",
        "Anna Müller",
        "Mohammed Ali",
        "Elena Petrova",
        "Carlos Lopez",
        "Sakura Yamamoto",
        "Ahmed Khan",
        "Isabella Rossi",
        "Juan Martinez",
        "Yuki Sato",
        "Mikhail Ivanov",
        "Sophia Kim",
        "Rafael Silva",
        "Ling Chen",
        "Giovanni Ricci",
        "Julia Garcia",
        "Andres Fernandez",
        "Nadia Kowalski",
        "David Johnson",
        "Emilie Dupont",
        "Jose Gonzalez",
        "Anastasia Petrovna",
        "Mohamed Ahmed",
        "Elisa Bianchi",
        "Javier Hernandez",
        "Mai Nguyen",
        "Alexander Schmidt",
        "Olivia Smith",
        "Luis Fernandez",
        "Aisha Patel",
        "Sebastian Fischer",
        "Yasmine Abidi",
        "Ivan Petrov",
        "Sophie Martin",
        "Takashi Suzuki",
        "Eva Hernandez",
        "Khaled Al-Mansoori",
        "Nina Andersen",
        "Rajesh Kapoor",
        "Léa Dubois",
        "Samir Rahman",
        "Emily Wilson",
        "Viktor Orlov",
        "Sofia Costa",
        "Yusuf Kaya",
        "Miranda Brown",
        "Alejandro Ramirez",
        "Amara Choudhury",
        "Oscar Nilsson",
        "Amina El-Mahdi",
        "Gustavo Lima",
        "Mei Li",
        "Federico Bianco",
        "Lina Kovalenko",
        "Mateo Rodriguez",
        "Leila Souza",
        "Emil Jensen",
        "Hana Nakamura",
        "Sophia Hernandez",
        "Ali Khan",
        "Mia Andersson",
        "Ravi Patel",
        "Elena Sánchez",
        "Yusuf Al-Mansoori",
        "Lina Fischer",
        "Daniel López",
        "Isabel Silva",
        "Hiroshi Tanaka",
        "Katarina Petrovic",
        "Yassin El-Mahdi",
        "Amélie Dupuis",
        "Abdul Rahman",
        "Anna Kovács",
        "Lucas Oliveira",
        "Mila Ivanova",
        "Carlos Fernandez",
        "Leah Schmidt",
        "Omar Ahmed",
        "Emilie Martin",
        "Nikolai Petrov",
        "Layla Patel",
        "Andreas Schmidt",
        "Nadia Kowalczyk",
        "Rafael Soto",
        "Anna Smith",
        "David Garcia",
        "Aisha Abidi",
        "Ahmed Mohamed",
        "Jasmin Ali"
    ];

    const randomUser = users[Math.floor(Math.random() * users.length)];

    notification.innerText = `${randomUser} registered for the course`;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 2500);
}

function setupRandomNotifications() {
    setTimeout(() => {
        showNotification();
        setupRandomNotifications();
    }, getRandomNumber()); 
}

// Start the random notifications

setupRandomNotifications();
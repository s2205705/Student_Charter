const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const colleges = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit-signup', (req, res) => {
    const collegeName = req.body['college-name'];
    const leaderName = req.body['leader-name'];
    const leaderEmail = req.body['leader-email'];
    const contactType = req.body['contact-type'];
    const contactValue = req.body['contact-value'];
    const publicSupport = req.body['public-agreement'] !== undefined;

    const college = {
        name: collegeName,
        leader: leaderName,
        email: leaderEmail,
        contact: `${contactType}: ${contactValue}`,
        public: publicSupport
    };
    colleges.push(college);

    res.sendFile(path.join(__dirname, 'success.html'));
});

app.get('/signed_colleges', (req, res) => {
    const publicColleges = colleges.filter(c => c.public);
    res.render('signed_colleges', { colleges: publicColleges });
});

app.get('/download', (req, res) => {
    const filePath = path.join(__dirname, 'colleges.csv');
    const writer = fs.createWriteStream(filePath);
    writer.write('College Name,Leader Name,Leader Email,Contact\n');
    colleges.forEach(c => {
        writer.write(`${c.name},${c.leader},${c.email},${c.contact}\n`);
    });
    writer.end();
    res.download(filePath);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


import dotenv from 'dotenv';
import cors from "cors"
import express from 'express';
import bodyParser from 'body-parser';
import AuthRoutes from './routes/AuthRoutes.js';
import PostRoutes from './routes/PostRoutes.js';
const app = express();
const PORT = process.env.PORT || 8800;
dotenv.config();

app.use(cors({
  origin: ['http://localhost:3000', '/',],
  credentials: true,
}));

app.use(bodyParser.json());


app.use('/api/auth', AuthRoutes)
app.use('/api/post', PostRoutes)
app.use('/', (req, res) => {
  res.send(`
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 800px;
        margin: 50px auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #333;
      }
      p {
        margin-bottom: 10px;
      }
      a {
        color: #007bff;
        text-decoration: none;
      }
    </style>
    <div class="container">
      <h1>ToDo Live API Documentation</h1>
      <p>Welcome to the ToDo Live API!</p>
      <p>This API empowers you to efficiently manage your tasks, track your progress, and stay organized. Whether you're juggling personal errands, work assignments, or project deadlines, ToDo Live has got you covered.</p>
      <p>Start exploring the endpoints below to streamline your task management experience. Get ready to unleash your productivity like never before!</p>
      <p>The Documentation URL for all endpoints of ToDo: <a href="https://documenter.getpostman.com/view/30884834/2sA358f6jW" target="_blank">ToDo API Documentation</a></p>
      <h2>About Me</h2>
      <p>Hey there! 👋 I'm Satish Kumar, a passionate software developer and tech enthusiast dedicated to creating innovative solutions that make a difference. With a background in Information Technology and a love for problem-solving, I've embarked on a journey to build projects that streamline workflows, enhance productivity, and improve lives.</p>
      <h2>Professional Experience</h2>
      <ul>
        <li>Founding Team Member Tech at SFDE Technologies Private Limited</li>
        <li>Software Engineer L1 at Accubits</li>
      </ul>
      <h2>Get in Touch</h2>
      <p>I'm always open to collaboration and new opportunities. If you have a project idea, want to discuss technology trends, or simply chat about all things tech, feel free to reach out! You can connect with me on <a href="https://www.linkedin.com/in/satish0036kumar/" target="_blank">LinkedIn</a>, check out my code on <a href="https://github.com/satish0036/" target="_blank">GitHub</a>, or subscribe to my <a href="https://www.youtube.com/@CodeneticInsights/featured" target="_blank">YouTube</a> channel for tech tutorials and insights.</p>
      <h2>Projects</h2>
      <ul>
        <li> <a href="https://postarticle.netlify.app/" target="_blank">PostArticle </a> : - A platform for publishing and sharing articles.</li>
        <li> <a href="https://jobconnect1o.netlify.app/" target="_blank">JobConnect </a> : - A project aimed at connecting job seekers with opportunities.</li>
        <li> <a href="https://travelume.netlify.app/" target="_blank">Travelulu </a>: - A platform for finding hotels accross different cities UIOnly.</li>
      </ul>
      <p>Happy tasking!</p>
    </div>
  `);
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import verifyToken from "../verifyToken.js";
// Get the directory path of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Load content from JSON file
const contentFilePath = path.join(__dirname, '../content.json');
let contentData = JSON.parse(fs.readFileSync(contentFilePath, 'utf-8'));
// console.log(contentData)


// ********************************addWork start****************************************
export const addWork = (req, res) => {
    // Call the verifyToken middleware to authenticate the request
    verifyToken(req, res, () => {
        const {workDone, content, notificationTime, currentDate, targetDate, categories } = req.body;
        console.log(req.user.userId);//comes from token auth

        // Check if the authenticated user matches the userId in the request body
        if (!req.user.userId) {
            return res.status(403).json({ error: 'Unauthorized access' });
        }

        // Add new content
        const newContent = { userId:req.user.userId, contentId:Date.now(), workDone, content, notificationTime, currentDate, targetDate, categories };
        // console.log(newContent);
        contentData.push(newContent);
        fs.writeFileSync(contentFilePath, JSON.stringify(contentData));
        res.status(201).json({ message: 'Content added successfully' });
    });
};


// **********************************editWork start******************************************
export const editWork = (req, res) => {
    const parmsId = req.params.contentId;
    // Call the verifyToken middleware to authenticate the request
    verifyToken(req, res, () => {
        const { userId, contentId, workDone, content, notificationTime, currentDate, targetDate, categories } = req.body;//came from frontend
        console.log(req.user.userId);//came from token 
        // Check if the authenticated user matches the userId in the request body
        if (req.user.userId !== userId) {
            return res.status(403).json({ error: 'Unauthorized access' });
        }

        // Find the content to edit
        const index = contentData.findIndex(item => item.contentId === parseInt(parmsId));

        if (index === -1) {
            return res.status(404).json({ error: 'Content not found' });
        }
        // Update content
        contentData[index] = { userId, contentId, workDone, content, notificationTime, currentDate, targetDate, categories };
        fs.writeFileSync(contentFilePath, JSON.stringify(contentData));
        res.json({ message: 'Content updated successfully' });

    });
};


// **********************************deleteWork start******************************************
export const deleteWork = (req, res) => {
    const parmsId = req.params.contentId;
    // Call the verifyToken middleware to authenticate the request
    verifyToken(req, res, () => {
        console.log(req.user.userId);//came from token 
        // Check if the authenticated user matches the userId in the request body
        if (!req.user.userId) {
            return res.status(403).json({ error: 'Unauthorized access' });
        }

        // Find the content to edit
        const index = contentData.findIndex(item => item.contentId === parseInt(parmsId));

        if (index === -1) {
            return res.status(404).json({ error: 'Content not found' });
        }
        // delete content
        contentData.splice(index, index);
        fs.writeFileSync(contentFilePath, JSON.stringify(contentData));
        res.json({ message: 'Content deletated successfully' });

    });
};


// *************************************wrokOfTheDay start**************************
export const wrokOfTheDay = (req, res) => {
    const { targetDate } = req.body;
    // Call the verifyToken middleware to authenticate the request
    verifyToken(req, res, () => {
        // Check if the authenticated user is there
        if (!req.user.userId) {
            return res.status(403).json({ error: 'Unauthorized access' });
        }
        // Find the content who belongs to userId and targetDate
        let ans = []
        for (let i = 0; i < contentData.length; i++) {
            if (contentData[i].userId === req.user.userId && contentData[i].targetDate === targetDate) {
                ans.push(contentData[i])
            }
        }
        if (ans.length === 0) {
            return res.status(404).json({ message: 'No Task found' });
        }
        // return Task
        res.json(ans);
    });
};


// *************************************workStatus Start**************************************
export const workStatus = (req, res) => {
    const { startDate, endDate } = req.body;
    // Call the verifyToken middleware to authenticate the request
    verifyToken(req, res, () => {
        // Check if the authenticated user is there
        if (!req.user.userId) {
            return res.status(403).json({ error: 'Unauthorized access' });
        }
        // Counting the complete and notComplete Task
        const targetStartDate = new Date(startDate);
        const targetEndDate = new Date(endDate);
        let completed = 0
        let notCompleted = 0
        for (let i = 0; i < contentData.length; i++) {
            if (contentData[i].userId === req.user.userId) {
                const targetDate = new Date(contentData[i].targetDate);
                if (targetDate >= targetStartDate && targetDate <= targetEndDate) {
                    if (contentData[i].workDone === 1) {
                        completed += 1;
                    }
                    else {
                        notCompleted += 1;
                    }
                }
            }
        }
        // return Task
        res.json({ completed: completed, notCompleted: notCompleted });
    });
};
